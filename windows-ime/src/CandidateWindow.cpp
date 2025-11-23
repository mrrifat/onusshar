#include "CandidateWindow.h"
#include <windowsx.h>

constexpr wchar_t CANDIDATE_WINDOW_CLASS[] = L"OnussharCandidateWindow";
constexpr int ITEM_HEIGHT = 24;
constexpr int WINDOW_WIDTH = 300;

CandidateWindow::CandidateWindow()
    : m_hwnd(nullptr)
    , m_selectedIndex(0)
    , m_isVisible(false)
{
}

CandidateWindow::~CandidateWindow()
{
    Destroy();
}

bool CandidateWindow::Create()
{
    if (m_hwnd != nullptr) {
        return true;
    }

    // Register window class
    WNDCLASSEXW wc = {0};
    wc.cbSize = sizeof(WNDCLASSEXW);
    wc.lpfnWndProc = WndProc;
    wc.hInstance = GetModuleHandle(nullptr);
    wc.hCursor = LoadCursor(nullptr, IDC_ARROW);
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
    wc.lpszClassName = CANDIDATE_WINDOW_CLASS;

    RegisterClassExW(&wc);

    // Create window
    m_hwnd = CreateWindowExW(
        WS_EX_TOPMOST | WS_EX_TOOLWINDOW | WS_EX_NOACTIVATE,
        CANDIDATE_WINDOW_CLASS,
        L"",
        WS_POPUP | WS_BORDER,
        0, 0, WINDOW_WIDTH, ITEM_HEIGHT,
        nullptr, nullptr, GetModuleHandle(nullptr), this);

    return m_hwnd != nullptr;
}

void CandidateWindow::Destroy()
{
    if (m_hwnd != nullptr) {
        DestroyWindow(m_hwnd);
        m_hwnd = nullptr;
    }
}

void CandidateWindow::ShowCandidates(const std::vector<std::wstring>& candidates)
{
    m_candidates = candidates;
    m_selectedIndex = 0;

    if (m_candidates.empty()) {
        Hide();
        return;
    }

    if (m_hwnd == nullptr && !Create()) {
        return;
    }

    // Resize window based on candidate count
    int height = static_cast<int>(m_candidates.size()) * ITEM_HEIGHT;
    SetWindowPos(m_hwnd, HWND_TOPMOST, 0, 0, WINDOW_WIDTH, height,
                SWP_NOMOVE | SWP_NOACTIVATE);

    ShowWindow(m_hwnd, SW_SHOWNOACTIVATE);
    InvalidateRect(m_hwnd, nullptr, TRUE);
    m_isVisible = true;
}

void CandidateWindow::Hide()
{
    if (m_hwnd != nullptr) {
        ShowWindow(m_hwnd, SW_HIDE);
        m_isVisible = false;
    }
}

void CandidateWindow::SetPosition(int x, int y)
{
    if (m_hwnd != nullptr) {
        SetWindowPos(m_hwnd, HWND_TOPMOST, x, y, 0, 0,
                    SWP_NOSIZE | SWP_NOACTIVATE);
    }
}

void CandidateWindow::SetSelection(int index)
{
    if (index >= 0 && index < static_cast<int>(m_candidates.size())) {
        m_selectedIndex = index;
        if (m_hwnd != nullptr) {
            InvalidateRect(m_hwnd, nullptr, TRUE);
        }
    }
}

std::wstring CandidateWindow::GetCandidate(int index) const
{
    if (index >= 0 && index < static_cast<int>(m_candidates.size())) {
        return m_candidates[index];
    }
    return std::wstring();
}

LRESULT CALLBACK CandidateWindow::WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
    CandidateWindow* pThis = nullptr;

    if (msg == WM_CREATE) {
        CREATESTRUCT* pcs = reinterpret_cast<CREATESTRUCT*>(lParam);
        pThis = reinterpret_cast<CandidateWindow*>(pcs->lpCreateParams);
        SetWindowLongPtr(hwnd, GWLP_USERDATA, reinterpret_cast<LONG_PTR>(pThis));
    } else {
        pThis = reinterpret_cast<CandidateWindow*>(GetWindowLongPtr(hwnd, GWLP_USERDATA));
    }

    if (pThis != nullptr) {
        switch (msg) {
            case WM_PAINT: {
                PAINTSTRUCT ps;
                HDC hdc = BeginPaint(hwnd, &ps);
                pThis->Paint(hdc);
                EndPaint(hwnd, &ps);
                return 0;
            }
        }
    }

    return DefWindowProc(hwnd, msg, wParam, lParam);
}

void CandidateWindow::Paint(HDC hdc)
{
    RECT clientRect;
    GetClientRect(m_hwnd, &clientRect);

    // Background
    FillRect(hdc, &clientRect, (HBRUSH)(COLOR_WINDOW + 1));

    // Draw candidates
    for (size_t i = 0; i < m_candidates.size(); ++i) {
        RECT itemRect = {0, static_cast<LONG>(i * ITEM_HEIGHT),
                        clientRect.right, static_cast<LONG>((i + 1) * ITEM_HEIGHT)};

        // Highlight selected item
        if (static_cast<int>(i) == m_selectedIndex) {
            HBRUSH hBrush = CreateSolidBrush(RGB(0, 120, 215));
            FillRect(hdc, &itemRect, hBrush);
            DeleteObject(hBrush);
            SetTextColor(hdc, RGB(255, 255, 255));
        } else {
            SetTextColor(hdc, RGB(0, 0, 0));
        }

        SetBkMode(hdc, TRANSPARENT);

        // Draw number and candidate
        std::wstring displayText = std::to_wstring(i + 1) + L". " + m_candidates[i];
        DrawTextW(hdc, displayText.c_str(), -1, &itemRect,
                 DT_LEFT | DT_VCENTER | DT_SINGLELINE | DT_NOPREFIX);
    }
}
