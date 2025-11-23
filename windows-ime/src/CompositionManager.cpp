#include "CompositionManager.h"
#include "TextService.h"

CompositionManager::CompositionManager(TextService* pTextService)
    : m_pTextService(pTextService)
    , m_pComposition(nullptr)
    , m_pContext(nullptr)
{
}

CompositionManager::~CompositionManager()
{
    EndComposition();
}

bool CompositionManager::StartComposition(ITfContext* pContext)
{
    if (m_pComposition != nullptr || pContext == nullptr) {
        return false;
    }

    ITfContextComposition* pContextComposition = nullptr;
    HRESULT hr = pContext->QueryInterface(IID_ITfContextComposition,
                                          (void**)&pContextComposition);
    if (FAILED(hr)) {
        return false;
    }

    ITfRange* pRange = nullptr;
    TfEditCookie ec;

    // Start composition at current selection
    hr = pContextComposition->StartComposition(ec, pRange, m_pTextService,
                                               &m_pComposition);

    SAFE_RELEASE(pRange);
    SAFE_RELEASE(pContextComposition);

    if (SUCCEEDED(hr)) {
        m_pContext = pContext;
        m_pContext->AddRef();
        return true;
    }

    return false;
}

bool CompositionManager::UpdateComposition(const std::wstring& text)
{
    if (m_pComposition == nullptr) {
        return false;
    }

    m_compositionString = text;

    ITfRange* pRange = nullptr;
    HRESULT hr = m_pComposition->GetRange(&pRange);
    if (FAILED(hr) || pRange == nullptr) {
        return false;
    }

    TfEditCookie ec;
    if (!GetEditSession(m_pContext, &ec)) {
        SAFE_RELEASE(pRange);
        return false;
    }

    // Set composition text
    hr = pRange->SetText(ec, 0, text.c_str(), static_cast<LONG>(text.length()));

    SAFE_RELEASE(pRange);
    return SUCCEEDED(hr);
}

bool CompositionManager::EndComposition()
{
    if (m_pComposition == nullptr) {
        return false;
    }

    TfEditCookie ec;
    if (GetEditSession(m_pContext, &ec)) {
        m_pComposition->EndComposition(ec);
    }

    SAFE_RELEASE(m_pComposition);
    SAFE_RELEASE(m_pContext);
    m_compositionString.clear();

    return true;
}

bool CompositionManager::CancelComposition()
{
    if (m_pComposition == nullptr) {
        return false;
    }

    // Clear composition string first
    UpdateComposition(L"");

    return EndComposition();
}

void CompositionManager::SetCompositionString(const std::wstring& text)
{
    m_compositionString = text;
    if (IsComposing()) {
        UpdateComposition(text);
    }
}

bool CompositionManager::GetEditSession(ITfContext* pContext, TfEditCookie* pec)
{
    if (pContext == nullptr || pec == nullptr) {
        return false;
    }

    // This is a simplified version - production code would use ITfEditSession
    // For now, we'll use a synchronous approach
    return false;
}
