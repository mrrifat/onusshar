#include "TextService.h"

TextService::TextService()
    : m_refCount(1)
    , m_pThreadMgr(nullptr)
    , m_tfClientId(TF_CLIENTID_NULL)
    , m_dwThreadMgrEventSinkCookie(TF_INVALID_COOKIE)
{
}

TextService::~TextService()
{
    if (m_pThreadMgr) {
        m_pThreadMgr->Release();
        m_pThreadMgr = nullptr;
    }
}

// IUnknown
STDMETHODIMP TextService::QueryInterface(REFIID riid, void** ppvObj)
{
    if (!ppvObj) return E_INVALIDARG;

    *ppvObj = nullptr;

    if (IsEqualIID(riid, IID_IUnknown) || IsEqualIID(riid, IID_ITfTextInputProcessor)) {
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
    return InterlockedIncrement(&m_refCount);
}

STDMETHODIMP_(ULONG) TextService::Release()
{
    LONG count = InterlockedDecrement(&m_refCount);
    if (count == 0) {
        delete this;
    }
    return count;
}

// ITfTextInputProcessor
STDMETHODIMP TextService::Activate(ITfThreadMgr* pThreadMgr, TfClientId tfClientId)
{
    if (!pThreadMgr) return E_INVALIDARG;

    m_pThreadMgr = pThreadMgr;
    m_pThreadMgr->AddRef();
    m_tfClientId = tfClientId;

    return S_OK;
}

STDMETHODIMP TextService::Deactivate()
{
    if (m_pThreadMgr) {
        m_pThreadMgr->Release();
        m_pThreadMgr = nullptr;
    }
    m_tfClientId = TF_CLIENTID_NULL;

    return S_OK;
}

// ITfThreadMgrEventSink
STDMETHODIMP TextService::OnInitDocumentMgr(ITfDocumentMgr* pDocMgr)
{
    return S_OK;
}

STDMETHODIMP TextService::OnUninitDocumentMgr(ITfDocumentMgr* pDocMgr)
{
    return S_OK;
}

STDMETHODIMP TextService::OnSetFocus(ITfDocumentMgr* pDocMgrFocus, ITfDocumentMgr* pDocMgrPrevFocus)
{
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

// ITfTextEditSink
STDMETHODIMP TextService::OnEndEdit(ITfContext* pContext, TfEditCookie ecReadOnly, ITfEditRecord* pEditRecord)
{
    return S_OK;
}

// Public methods - minimal stubs
void TextService::OnCompositionUpdated(const std::wstring& text) {}
void TextService::OnCandidateSelected(int index) {}
void TextService::CommitComposition() {}
void TextService::CancelComposition() {}

// Private methods
bool TextService::InitializeEngine() { return true; }
void TextService::UninitializeEngine() {}
