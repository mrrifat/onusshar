#include "Common.h"
#include "ClassFactory.h"
#include <olectl.h>

HINSTANCE g_hInstance = nullptr;
LONG g_serverLocks = 0;

// DLL Entry Point
BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved)
{
    switch (ul_reason_for_call) {
        case DLL_PROCESS_ATTACH:
            g_hInstance = hModule;
            DisableThreadLibraryCalls(hModule);
            break;

        case DLL_PROCESS_DETACH:
            break;
    }
    return TRUE;
}

// DLL Exports
STDAPI DllGetClassObject(REFCLSID rclsid, REFIID riid, void** ppvObj)
{
    if (ppvObj == nullptr) {
        return E_INVALIDARG;
    }

    *ppvObj = nullptr;

    if (!IsEqualCLSID(CLSID_OnussharTextService, rclsid)) {
        return CLASS_E_CLASSNOTAVAILABLE;
    }

    ClassFactory* pClassFactory = new ClassFactory();
    if (pClassFactory == nullptr) {
        return E_OUTOFMEMORY;
    }

    HRESULT hr = pClassFactory->QueryInterface(riid, ppvObj);
    pClassFactory->Release();

    return hr;
}

STDAPI DllCanUnloadNow()
{
    return (g_serverLocks == 0) ? S_OK : S_FALSE;
}

STDAPI DllRegisterServer()
{
    // Register COM server
    wchar_t szModule[MAX_PATH];
    GetModuleFileNameW(g_hInstance, szModule, MAX_PATH);

    // HKCR\CLSID\{CLSID}
    HKEY hKey = nullptr;
    wchar_t szCLSID[64];
    StringFromGUID2(CLSID_OnussharTextService, szCLSID, 64);

    std::wstring keyPath = L"CLSID\\";
    keyPath += szCLSID;

    LONG result = RegCreateKeyExW(HKEY_CLASSES_ROOT, keyPath.c_str(), 0, nullptr,
                                  REG_OPTION_NON_VOLATILE, KEY_WRITE, nullptr, &hKey, nullptr);
    if (result != ERROR_SUCCESS) {
        return SELFREG_E_CLASS;
    }

    // Set default value
    RegSetValueExW(hKey, nullptr, 0, REG_SZ, (BYTE*)L"Onusshar IME",
                  sizeof(L"Onusshar IME"));

    // InprocServer32
    HKEY hSubKey = nullptr;
    result = RegCreateKeyExW(hKey, L"InprocServer32", 0, nullptr,
                            REG_OPTION_NON_VOLATILE, KEY_WRITE, nullptr, &hSubKey, nullptr);
    if (result == ERROR_SUCCESS) {
        RegSetValueExW(hSubKey, nullptr, 0, REG_SZ, (BYTE*)szModule,
                      static_cast<DWORD>((wcslen(szModule) + 1) * sizeof(wchar_t)));
        RegSetValueExW(hSubKey, L"ThreadingModel", 0, REG_SZ, (BYTE*)L"Apartment",
                      sizeof(L"Apartment"));
        RegCloseKey(hSubKey);
    }

    RegCloseKey(hKey);

    // Register Text Service
    // TODO: Register with TSF using ITfInputProcessorProfiles

    return S_OK;
}

STDAPI DllUnregisterServer()
{
    // Unregister COM server
    wchar_t szCLSID[64];
    StringFromGUID2(CLSID_OnussharTextService, szCLSID, 64);

    std::wstring keyPath = L"CLSID\\";
    keyPath += szCLSID;

    // Delete InprocServer32
    std::wstring subKeyPath = keyPath + L"\\InprocServer32";
    RegDeleteKeyW(HKEY_CLASSES_ROOT, subKeyPath.c_str());

    // Delete CLSID
    RegDeleteKeyW(HKEY_CLASSES_ROOT, keyPath.c_str());

    // Unregister Text Service
    // TODO: Unregister from TSF

    return S_OK;
}
