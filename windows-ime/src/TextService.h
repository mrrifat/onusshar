#pragma once

#include "Common.h"
#include <msctf.h>

class CompositionManager;
class CandidateWindow;
class KeyHandler;
class EngineProxy;

/**
 * Main Text Service implementation for Onusshar IME
 * Implements ITfTextInputProcessor and related TSF interfaces
 */
class TextService : public ITfTextInputProcessor,
                    public ITfThreadMgrEventSink,
                    public ITfTextEditSink {
public:
    TextService();
    ~TextService();

    // IUnknown
    STDMETHODIMP QueryInterface(REFIID riid, void** ppvObj) override;
    STDMETHODIMP_(ULONG) AddRef() override;
    STDMETHODIMP_(ULONG) Release() override;

    // ITfTextInputProcessor
    STDMETHODIMP Activate(ITfThreadMgr* pThreadMgr, TfClientId tfClientId) override;
    STDMETHODIMP Deactivate() override;

    // ITfThreadMgrEventSink
    STDMETHODIMP OnInitDocumentMgr(ITfDocumentMgr* pDocMgr) override;
    STDMETHODIMP OnUninitDocumentMgr(ITfDocumentMgr* pDocMgr) override;
    STDMETHODIMP OnSetFocus(ITfDocumentMgr* pDocMgrFocus,
                           ITfDocumentMgr* pDocMgrPrevFocus) override;
    STDMETHODIMP OnPushContext(ITfContext* pContext) override;
    STDMETHODIMP OnPopContext(ITfContext* pContext) override;

    // ITfTextEditSink
    STDMETHODIMP OnEndEdit(ITfContext* pContext, TfEditCookie ecReadOnly,
                          ITfEditRecord* pEditRecord) override;

    // Public methods
    ITfThreadMgr* GetThreadMgr() { return m_pThreadMgr; }
    TfClientId GetClientId() { return m_tfClientId; }

    void OnCompositionUpdated(const std::wstring& text);
    void OnCandidateSelected(int index);
    void CommitComposition();
    void CancelComposition();

private:
    bool InitializeEngine();
    void UninitializeEngine();

    LONG m_refCount;
    ITfThreadMgr* m_pThreadMgr;
    TfClientId m_tfClientId;

    std::unique_ptr<CompositionManager> m_pCompositionMgr;
    std::unique_ptr<CandidateWindow> m_pCandidateWnd;
    std::unique_ptr<KeyHandler> m_pKeyHandler;
    std::unique_ptr<EngineProxy> m_pEngineProxy;

    DWORD m_dwThreadMgrEventSinkCookie;
};
