#include "EngineProxy.h"
#include <windows.h>
#include <filesystem>

EngineProxy::EngineProxy()
    : m_hNodeModule(nullptr)
    , m_pBridgeInstance(nullptr)
    , m_isInitialized(false)
{
}

EngineProxy::~EngineProxy()
{
    Uninitialize();
}

bool EngineProxy::Initialize()
{
    if (m_isInitialized) {
        return true;
    }

    if (!LoadEngine()) {
        return false;
    }

    m_isInitialized = true;
    return true;
}

void EngineProxy::Uninitialize()
{
    if (!m_isInitialized) {
        return;
    }

    UnloadEngine();
    m_isInitialized = false;
}

std::wstring EngineProxy::Convert(const std::string& input)
{
    if (!m_isInitialized) {
        return Utf8ToWide(input);
    }

    // TODO: Call Node.js addon bridge
    // For now, return a placeholder conversion
    // In production, this would call the @onusshar/ime-bridge addon

    // Placeholder: Simple mapping for demonstration
    std::string result = input;
    // This would actually call: bridge->Convert(input)

    return Utf8ToWide(result);
}

std::vector<std::wstring> EngineProxy::GetSuggestions(const std::string& input, int limit)
{
    std::vector<std::wstring> suggestions;

    if (!m_isInitialized) {
        return suggestions;
    }

    // TODO: Call Node.js addon bridge
    // This would call: bridge->GetSuggestions(input, limit)

    // For now, return the converted text as the only suggestion
    std::wstring converted = Convert(input);
    if (!converted.empty()) {
        suggestions.push_back(converted);
    }

    return suggestions;
}

void EngineProxy::UpdateConfig(const std::string& mode, const std::string& digitFormat)
{
    if (!m_isInitialized) {
        return;
    }

    // TODO: Call Node.js addon bridge
    // This would call: bridge->UpdateConfig(mode, digitFormat)
}

bool EngineProxy::LoadEngine()
{
    // In production, this would load the Node.js addon (onusshar_ime_bridge.node)
    // and initialize the bridge instance

    // Get the DLL directory
    wchar_t dllPath[MAX_PATH];
    GetModuleFileNameW(nullptr, dllPath, MAX_PATH);
    std::filesystem::path enginePath = std::filesystem::path(dllPath).parent_path();
    enginePath /= L"onusshar_ime_bridge.node";

    // TODO: Load Node.js addon
    // m_hNodeModule = LoadLibraryW(enginePath.c_str());
    // if (!m_hNodeModule) {
    //     return false;
    // }

    // For MVP, we'll use a simpler approach
    // Phase 2.1 will integrate full Node.js addon support

    return true;
}

void EngineProxy::UnloadEngine()
{
    if (m_hNodeModule) {
        FreeLibrary(m_hNodeModule);
        m_hNodeModule = nullptr;
    }
    m_pBridgeInstance = nullptr;
}
