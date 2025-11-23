#include "ClassFactory.h"
#include "TextService.h"

extern LONG g_serverLocks;

ClassFactory::ClassFactory()
    : m_refCount(1)
{
}

ClassFactory::~ClassFactory()
{
}

// IUnknown implementation
STDMETHODIMP ClassFactory::QueryInterface(REFIID riid, void** ppvObj)
{
    if (ppvObj == nullptr) {
        return E_INVALIDARG;
    }

    *ppvObj = nullptr;

    if (IsEqualIID(riid, IID_IUnknown) || IsEqualIID(riid, IID_IClassFactory)) {
        *ppvObj = (IClassFactory*)this;
    }

    if (*ppvObj) {
        AddRef();
        return S_OK;
    }

    return E_NOINTERFACE;
}

STDMETHODIMP_(ULONG) ClassFactory::AddRef()
{
    return ++m_refCount;
}

STDMETHODIMP_(ULONG) ClassFactory::Release()
{
    LONG count = --m_refCount;
    if (count == 0) {
        delete this;
    }
    return count;
}

// IClassFactory implementation
STDMETHODIMP ClassFactory::CreateInstance(IUnknown* pUnkOuter, REFIID riid, void** ppvObj)
{
    if (ppvObj == nullptr) {
        return E_INVALIDARG;
    }

    *ppvObj = nullptr;

    if (pUnkOuter != nullptr) {
        return CLASS_E_NOAGGREGATION;
    }

    TextService* pTextService = new TextService();
    if (pTextService == nullptr) {
        return E_OUTOFMEMORY;
    }

    HRESULT hr = pTextService->QueryInterface(riid, ppvObj);
    pTextService->Release();

    return hr;
}

STDMETHODIMP ClassFactory::LockServer(BOOL fLock)
{
    if (fLock) {
        InterlockedIncrement(&g_serverLocks);
    } else {
        InterlockedDecrement(&g_serverLocks);
    }
    return S_OK;
}
