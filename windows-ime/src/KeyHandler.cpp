#include "KeyHandler.h"
#include "TextService.h"

KeyHandler::KeyHandler(TextService* pTextService)
    : m_refCount(1)
    , m_pTextService(pTextService)
{
}

KeyHandler::~KeyHandler()
{
}

// IUnknown implementation
STDMETHODIMP KeyHandler::QueryInterface(REFIID riid, void** ppvObj)
{
    if (ppvObj == nullptr) {
        return E_INVALIDARG;
    }

    *ppvObj = nullptr;

    if (IsEqualIID(riid, IID_IUnknown) || IsEqualIID(riid, IID_ITfKeyEventSink)) {
        *ppvObj = (ITfKeyEventSink*)this;
    }

    if (*ppvObj) {
        AddRef();
        return S_OK;
    }

    return E_NOINTERFACE;
}

STDMETHODIMP_(ULONG) KeyHandler::AddRef()
{
    return ++m_refCount;
}

STDMETHODIMP_(ULONG) KeyHandler::Release()
{
    LONG count = --m_refCount;
    if (count == 0) {
        delete this;
    }
    return count;
}

// ITfKeyEventSink implementation
STDMETHODIMP KeyHandler::OnSetFocus(BOOL fForeground)
{
    return S_OK;
}

STDMETHODIMP KeyHandler::OnTestKeyDown(ITfContext* pContext, WPARAM wParam,
                                       LPARAM lParam, BOOL* pfEaten)
{
    if (pfEaten == nullptr) {
        return E_INVALIDARG;
    }

    // Eat alphanumeric keys and some special keys for composition
    *pfEaten = IsCompositionKey(wParam) ? TRUE : FALSE;

    return S_OK;
}

STDMETHODIMP KeyHandler::OnKeyDown(ITfContext* pContext, WPARAM wParam,
                                   LPARAM lParam, BOOL* pfEaten)
{
    if (pfEaten == nullptr) {
        return E_INVALIDARG;
    }

    *pfEaten = FALSE;

    // Handle composition keys
    if (IsCompositionKey(wParam)) {
        HandleCompositionKey(wParam);
        *pfEaten = TRUE;
        return S_OK;
    }

    // Handle control keys
    if (IsControlKey(wParam)) {
        switch (wParam) {
            case VK_RETURN:  // Enter - commit composition
                if (!m_compositionBuffer.empty()) {
                    m_pTextService->CommitComposition();
                    m_compositionBuffer.clear();
                    *pfEaten = TRUE;
                }
                break;

            case VK_ESCAPE:  // Escape - cancel composition
                if (!m_compositionBuffer.empty()) {
                    m_pTextService->CancelComposition();
                    m_compositionBuffer.clear();
                    *pfEaten = TRUE;
                }
                break;

            case VK_BACK:    // Backspace - delete last character
                if (!m_compositionBuffer.empty()) {
                    m_compositionBuffer.pop_back();
                    m_pTextService->OnCompositionUpdated(m_compositionBuffer);
                    *pfEaten = TRUE;
                }
                break;

            case VK_SPACE:   // Space - commit and insert space
                if (!m_compositionBuffer.empty()) {
                    m_pTextService->CommitComposition();
                    m_compositionBuffer.clear();
                }
                break;

            // Number keys 1-9 for candidate selection
            case '1': case '2': case '3': case '4': case '5':
            case '6': case '7': case '8': case '9':
                if (!m_compositionBuffer.empty()) {
                    int index = static_cast<int>(wParam - '1');
                    m_pTextService->OnCandidateSelected(index);
                    m_compositionBuffer.clear();
                    *pfEaten = TRUE;
                }
                break;
        }
    }

    return S_OK;
}

STDMETHODIMP KeyHandler::OnTestKeyUp(ITfContext* pContext, WPARAM wParam,
                                     LPARAM lParam, BOOL* pfEaten)
{
    if (pfEaten == nullptr) {
        return E_INVALIDARG;
    }

    *pfEaten = FALSE;
    return S_OK;
}

STDMETHODIMP KeyHandler::OnKeyUp(ITfContext* pContext, WPARAM wParam,
                                 LPARAM lParam, BOOL* pfEaten)
{
    if (pfEaten == nullptr) {
        return E_INVALIDARG;
    }

    *pfEaten = FALSE;
    return S_OK;
}

STDMETHODIMP KeyHandler::OnPreservedKey(ITfContext* pContext, REFGUID rguid, BOOL* pfEaten)
{
    if (pfEaten == nullptr) {
        return E_INVALIDARG;
    }

    *pfEaten = FALSE;
    return S_OK;
}

// Private methods
bool KeyHandler::IsCompositionKey(WPARAM wParam)
{
    // Check if key is alphanumeric or punctuation
    return (wParam >= 'A' && wParam <= 'Z') ||
           (wParam >= '0' && wParam <= '9') ||
           wParam == VK_OEM_PERIOD ||  // .
           wParam == VK_OEM_COMMA ||   // ,
           wParam == VK_OEM_MINUS ||   // -
           wParam == VK_OEM_PLUS ||    // +
           wParam == VK_OEM_1 ||       // ; :
           wParam == VK_OEM_2 ||       // / ?
           wParam == VK_OEM_3 ||       // ` ~
           wParam == VK_OEM_4 ||       // [ {
           wParam == VK_OEM_5 ||       // \ |
           wParam == VK_OEM_6 ||       // ] }
           wParam == VK_OEM_7;         // ' "
}

bool KeyHandler::IsControlKey(WPARAM wParam)
{
    return wParam == VK_RETURN ||
           wParam == VK_ESCAPE ||
           wParam == VK_BACK ||
           wParam == VK_SPACE ||
           wParam == VK_DELETE ||
           wParam == VK_LEFT ||
           wParam == VK_RIGHT ||
           wParam == VK_UP ||
           wParam == VK_DOWN ||
           (wParam >= '1' && wParam <= '9');
}

void KeyHandler::HandleCompositionKey(WPARAM wParam)
{
    // Convert virtual key to character
    BYTE keyState[256];
    GetKeyboardState(keyState);

    wchar_t ch[2] = {0};
    int result = ToUnicode(static_cast<UINT>(wParam), 0, keyState, ch, 2, 0);

    if (result > 0) {
        m_compositionBuffer += ch[0];
        m_pTextService->OnCompositionUpdated(m_compositionBuffer);
    }
}
