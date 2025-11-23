#pragma once

#include <windows.h>
#include <msctf.h>
#include <string>
#include <vector>
#include <memory>

// GUID for Onusshar IME
// {8F9A2B3C-4D5E-6F7A-8B9C-0D1E2F3A4B5C}
static const GUID CLSID_OnussharTextService =
{ 0x8f9a2b3c, 0x4d5e, 0x6f7a, { 0x8b, 0x9c, 0x0d, 0x1e, 0x2f, 0x3a, 0x4b, 0x5c } };

// {9A0B3C4D-5E6F-7A8B-9C0D-1E2F3A4B5C6D}
static const GUID GUID_OnussharProfile =
{ 0x9a0b3c4d, 0x5e6f, 0x7a8b, { 0x9c, 0x0d, 0x1e, 0x2f, 0x3a, 0x4b, 0x5c, 0x6d } };

// Language ID for Bengali
constexpr LANGID LANGID_BENGALI = MAKELANGID(LANG_BENGALI, SUBLANG_DEFAULT);

// Constants
constexpr int MAX_COMPOSITION_LENGTH = 256;
constexpr int MAX_CANDIDATES = 9;

// Helper functions
std::wstring Utf8ToWide(const std::string& utf8);
std::string WideToUtf8(const std::wstring& wide);

// COM helper macros
#define SAFE_RELEASE(p) \
    do { \
        if ((p)) { \
            (p)->Release(); \
            (p) = nullptr; \
        } \
    } while (0)
