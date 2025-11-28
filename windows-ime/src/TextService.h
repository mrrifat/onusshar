#pragma once

#include "Common.h"
#include <msctf.h>

/**
 * Main Text Service implementation for Onusshar IME
 * Implements ITfTextInputProcessor and related TSF interfaces
 * Minimal version for initial build
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

    // Public methods - stubs for minimal version
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
    DWORD m_dwThreadMgrEventSinkCookie;
};
