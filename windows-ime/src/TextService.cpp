#include "TextService.h"
#include "CompositionManager.h"
#include "CandidateWindow.h"
#include "KeyHandler.h"
#include "EngineProxy.h"

TextService::TextService()
    : m_refCount(1)
    , m_pThreadMgr(nullptr)
    , m_tfClientId(TF_CLIENTID_NULL)
    , m_dwThreadMgrEventSinkCookie(TF_INVALID_COOKIE)
{
}

TextService::~TextService()
{
    SAFE_RELEASE(m_pThreadMgr);
}

// IUnknown implementation
STDMETHODIMP TextService::QueryInterface(REFIID riid, void** ppvObj)
{
    if (ppvObj == nullptr) {
        return E_INVALIDARG;
    }

    *ppvObj = nullptr;

    if (IsEqualIID(riid, IID_IUnknown) ||
        IsEqualIID(riid, IID_ITfTextInputProcessor)) {
        *ppvObj = (ITfTextInputProcessor*)this;
    }
    else if (IsEqualIID(riid, IID_ITfThreadMgrEventSink)) {
        *ppvObj = (ITfThreadMgrEventSink*)this;
    }
    else if (IsEqualIID(riid, IID_ITfTextEditSink)) {
        *ppvObj = (ITfTextEditSink*)this;
    }

    if (*ppvObj) {
        AddRef();
        return S_OK;
    }

    return E_NOINTERFACE;
}

STDMETHODIMP_(ULONG) TextService::AddRef()
{
    return ++m_refCount;
}

STDMETHODIMP_(ULONG) TextService::Release()
{
    LONG count = --m_refCount;
    if (count == 0) {
        delete this;
    }
    return count;
}

// ITfTextInputProcessor implementation
STDMETHODIMP TextService::Activate(ITfThreadMgr* pThreadMgr, TfClientId tfClientId)
{
    if (pThreadMgr == nullptr) {
        return E_INVALIDARG;
    }

    m_pThreadMgr = pThreadMgr;
    m_pThreadMgr->AddRef();
    m_tfClientId = tfClientId;

    // Initialize components
    m_pCompositionMgr = std::make_unique<CompositionManager>(this);
    m_pCandidateWnd = std::make_unique<CandidateWindow>();
    m_pKeyHandler = std::make_unique<KeyHandler>(this);
    m_pEngineProxy = std::make_unique<EngineProxy>();

    // Initialize engine
    if (!InitializeEngine()) {
        return E_FAIL;
    }

    // Install thread manager event sink
    ITfSource* pSource = nullptr;
    if (SUCCEEDED(m_pThreadMgr->QueryInterface(IID_ITfSource, (void**)&pSource))) {
        pSource->AdviseSink(IID_ITfThreadMgrEventSink, (ITfThreadMgrEventSink*)this,
                           &m_dwThreadMgrEventSinkCookie);
        pSource->Release();
    }

    return S_OK;
}

STDMETHODIMP TextService::Deactivate()
{
    // Uninstall thread manager event sink
    if (m_dwThreadMgrEventSinkCookie != TF_INVALID_COOKIE) {
        ITfSource* pSource = nullptr;
        if (SUCCEEDED(m_pThreadMgr->QueryInterface(IID_ITfSource, (void**)&pSource))) {
            pSource->UnadviseSink(m_dwThreadMgrEventSinkCookie);
            pSource->Release();
        }
        m_dwThreadMgrEventSinkCookie = TF_INVALID_COOKIE;
    }

    // Uninitialize components
    UninitializeEngine();
    m_pEngineProxy.reset();
    m_pKeyHandler.reset();
    m_pCandidateWnd.reset();
    m_pCompositionMgr.reset();

    // Release thread manager
    SAFE_RELEASE(m_pThreadMgr);
    m_tfClientId = TF_CLIENTID_NULL;

    return S_OK;
}

// ITfThreadMgrEventSink implementation
STDMETHODIMP TextService::OnInitDocumentMgr(ITfDocumentMgr* pDocMgr)
{
    return S_OK;
}

STDMETHODIMP TextService::OnUninitDocumentMgr(ITfDocumentMgr* pDocMgr)
{
    return S_OK;
}

STDMETHODIMP TextService::OnSetFocus(ITfDocumentMgr* pDocMgrFocus,
                                     ITfDocumentMgr* pDocMgrPrevFocus)
{
    // Clear composition when focus changes
    if (m_pCompositionMgr) {
        m_pCompositionMgr->EndComposition();
    }

    return S_OK;
}

STDMETHODIMP TextService::OnPushContext(ITfContext* pContext)
{
    return S_OK;
}

STDMETHODIMP TextService::OnPopContext(ITfContext* pContext)
{
    return S_OK;
}

// ITfTextEditSink implementation
STDMETHODIMP TextService::OnEndEdit(ITfContext* pContext, TfEditCookie ecReadOnly,
                                    ITfEditRecord* pEditRecord)
{
    return S_OK;
}

// Public methods
void TextService::OnCompositionUpdated(const std::wstring& text)
{
    if (m_pCompositionMgr) {
        m_pCompositionMgr->UpdateComposition(text);
    }

    // Get suggestions from engine
    if (m_pEngineProxy && m_pCandidateWnd) {
        std::string utf8Input = WideToUtf8(text);
        std::vector<std::wstring> candidates = m_pEngineProxy->GetSuggestions(utf8Input, MAX_CANDIDATES);
        m_pCandidateWnd->ShowCandidates(candidates);
    }
}

void TextService::OnCandidateSelected(int index)
{
    if (m_pCandidateWnd) {
        std::wstring selected = m_pCandidateWnd->GetCandidate(index);
        if (!selected.empty() && m_pCompositionMgr) {
            m_pCompositionMgr->SetCompositionString(selected);
            CommitComposition();
        }
    }
}

void TextService::CommitComposition()
{
    if (m_pCompositionMgr) {
        m_pCompositionMgr->EndComposition();
    }
    if (m_pCandidateWnd) {
        m_pCandidateWnd->Hide();
    }
}

void TextService::CancelComposition()
{
    if (m_pCompositionMgr) {
        m_pCompositionMgr->CancelComposition();
    }
    if (m_pCandidateWnd) {
        m_pCandidateWnd->Hide();
    }
}

// Private methods
bool TextService::InitializeEngine()
{
    if (!m_pEngineProxy) {
        return false;
    }

    return m_pEngineProxy->Initialize();
}

void TextService::UninitializeEngine()
{
    if (m_pEngineProxy) {
        m_pEngineProxy->Uninitialize();
    }
}
