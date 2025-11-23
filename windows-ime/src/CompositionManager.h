#pragma once

#include "Common.h"
#include <msctf.h>

class TextService;

/**
 * Manages composition string and range
 */
class CompositionManager {
public:
    explicit CompositionManager(TextService* pTextService);
    ~CompositionManager();

    bool StartComposition(ITfContext* pContext);
    bool UpdateComposition(const std::wstring& text);
    bool EndComposition();
    bool CancelComposition();

    void SetCompositionString(const std::wstring& text);
    std::wstring GetCompositionString() const { return m_compositionString; }

    bool IsComposing() const { return m_pComposition != nullptr; }

private:
    bool GetEditSession(ITfContext* pContext, TfEditCookie* pec);

    TextService* m_pTextService;
    ITfComposition* m_pComposition;
    ITfContext* m_pContext;
    std::wstring m_compositionString;
};
