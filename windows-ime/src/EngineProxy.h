#pragma once

#include "Common.h"
#include <string>
#include <vector>

/**
 * Proxy for communicating with the Onusshar core engine
 * Uses Node.js addon to call TypeScript transliterator
 */
class EngineProxy {
public:
    EngineProxy();
    ~EngineProxy();

    bool Initialize();
    void Uninitialize();

    // Convert Latin input to Bengali
    std::wstring Convert(const std::string& input);

    // Get suggestions for input
    std::vector<std::wstring> GetSuggestions(const std::string& input, int limit);

    // Update configuration
    void UpdateConfig(const std::string& mode, const std::string& digitFormat);

private:
    bool LoadEngine();
    void UnloadEngine();

    HMODULE m_hNodeModule;
    void* m_pBridgeInstance;
    bool m_isInitialized;
};
