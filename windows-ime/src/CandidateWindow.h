#pragma once

#include "Common.h"
#include <vector>

/**
 * Candidate window for showing suggestions
 */
class CandidateWindow {
public:
    CandidateWindow();
    ~CandidateWindow();

    bool Create();
    void Destroy();

    void ShowCandidates(const std::vector<std::wstring>& candidates);
    void Hide();

    void SetPosition(int x, int y);
    void SetSelection(int index);
    int GetSelection() const { return m_selectedIndex; }

    std::wstring GetCandidate(int index) const;
    int GetCandidateCount() const { return static_cast<int>(m_candidates.size()); }

private:
    static LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam);
    void Paint(HDC hdc);

    HWND m_hwnd;
    std::vector<std::wstring> m_candidates;
    int m_selectedIndex;
    bool m_isVisible;
};
