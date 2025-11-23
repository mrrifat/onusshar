#pragma once

#include "Common.h"
#include <msctf.h>

class TextService;

/**
 * Handles keyboard events for the IME
 * Implements ITfKeyEventSink
 */
class KeyHandler : public ITfKeyEventSink {
public:
    explicit KeyHandler(TextService* pTextService);
    ~KeyHandler();

    // IUnknown
    STDMETHODIMP QueryInterface(REFIID riid, void** ppvObj) override;
    STDMETHODIMP_(ULONG) AddRef() override;
    STDMETHODIMP_(ULONG) Release() override;

    // ITfKeyEventSink
    STDMETHODIMP OnSetFocus(BOOL fForeground) override;
    STDMETHODIMP OnTestKeyDown(ITfContext* pContext, WPARAM wParam, LPARAM lParam,
                               BOOL* pfEaten) override;
    STDMETHODIMP OnKeyDown(ITfContext* pContext, WPARAM wParam, LPARAM lParam,
                          BOOL* pfEaten) override;
    STDMETHODIMP OnTestKeyUp(ITfContext* pContext, WPARAM wParam, LPARAM lParam,
                            BOOL* pfEaten) override;
    STDMETHODIMP OnKeyUp(ITfContext* pContext, WPARAM wParam, LPARAM lParam,
                        BOOL* pfEaten) override;
    STDMETHODIMP OnPreservedKey(ITfContext* pContext, REFGUID rguid, BOOL* pfEaten) override;

private:
    bool IsCompositionKey(WPARAM wParam);
    bool IsControlKey(WPARAM wParam);
    void HandleCompositionKey(WPARAM wParam);

    LONG m_refCount;
    TextService* m_pTextService;
    std::wstring m_compositionBuffer;
};
