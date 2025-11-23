import Cocoa

/**
 * Candidate window for showing Bengali suggestions
 */
class OnussharCandidateWindow: NSWindow {

    // MARK: - Properties

    private var candidates: [String] = []
    private var selectedIndex: Int = 0
    private var tableView: NSTableView!

    // Constants
    private let itemHeight: CGFloat = 24
    private let windowWidth: CGFloat = 300
    private let maxVisibleItems: Int = 9

    // MARK: - Initialization

    init() {
        let contentRect = NSRect(x: 0, y: 0, width: windowWidth, height: itemHeight)

        super.init(
            contentRect: contentRect,
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )

        setupWindow()
        setupTableView()
    }

    private func setupWindow() {
        isOpaque = false
        backgroundColor = NSColor.clear
        hasShadow = true
        level = .floating
        collectionBehavior = [.canJoinAllSpaces, .stationary]

        // Make window non-activating
        isReleasedWhenClosed = false
    }

    private func setupTableView() {
        // Create scroll view
        let scrollView = NSScrollView(frame: contentView!.bounds)
        scrollView.autoresizingMask = [.width, .height]
        scrollView.hasVerticalScroller = false
        scrollView.hasHorizontalScroller = false
        scrollView.borderType = .noBorder

        // Create table view
        tableView = NSTableView(frame: scrollView.bounds)
        tableView.headerView = nil
        tableView.rowHeight = itemHeight
        tableView.intercellSpacing = NSSize(width: 0, height: 0)
        tableView.selectionHighlightStyle = .regular
        tableView.backgroundColor = NSColor.controlBackgroundColor

        // Add column
        let column = NSTableColumn(identifier: NSUserInterfaceItemIdentifier("CandidateColumn"))
        column.width = windowWidth
        tableView.addTableColumn(column)

        // Set delegates
        tableView.dataSource = self
        tableView.delegate = self

        scrollView.documentView = tableView
        contentView?.addSubview(scrollView)
    }

    // MARK: - Public Methods

    func setCandidates(_ candidates: [String]) {
        self.candidates = candidates
        selectedIndex = 0

        // Resize window
        let visibleItems = min(candidates.count, maxVisibleItems)
        let newHeight = CGFloat(visibleItems) * itemHeight
        var frame = self.frame
        frame.size.height = newHeight
        setFrame(frame, display: true)

        // Reload table
        tableView.reloadData()
        if !candidates.isEmpty {
            tableView.selectRowIndexes(IndexSet(integer: 0), byExtendingSelection: false)
        }
    }

    func getCandidate(at index: Int) -> String? {
        guard index >= 0 && index < candidates.count else {
            return nil
        }
        return candidates[index]
    }

    func setSelection(_ index: Int) {
        guard index >= 0 && index < candidates.count else {
            return
        }
        selectedIndex = index
        tableView.selectRowIndexes(IndexSet(integer: index), byExtendingSelection: false)
        tableView.scrollRowToVisible(index)
    }
}

// MARK: - NSTableViewDataSource

extension OnussharCandidateWindow: NSTableViewDataSource {

    func numberOfRows(in tableView: NSTableView) -> Int {
        return candidates.count
    }
}

// MARK: - NSTableViewDelegate

extension OnussharCandidateWindow: NSTableViewDelegate {

    func tableView(_ tableView: NSTableView, viewFor tableColumn: NSTableColumn?, row: Int) -> NSView? {
        let identifier = NSUserInterfaceItemIdentifier("CandidateCell")

        var cellView = tableView.makeView(withIdentifier: identifier, owner: self) as? NSTableCellView

        if cellView == nil {
            cellView = NSTableCellView()
            cellView?.identifier = identifier

            let textField = NSTextField()
            textField.isBordered = false
            textField.drawsBackground = false
            textField.isEditable = false
            textField.isSelectable = false
            textField.font = NSFont.systemFont(ofSize: 14)

            cellView?.addSubview(textField)
            cellView?.textField = textField

            textField.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                textField.leadingAnchor.constraint(equalTo: cellView!.leadingAnchor, constant: 8),
                textField.trailingAnchor.constraint(equalTo: cellView!.trailingAnchor, constant: -8),
                textField.centerYAnchor.constraint(equalTo: cellView!.centerYAnchor)
            ])
        }

        if row < candidates.count {
            cellView?.textField?.stringValue = "\(row + 1). \(candidates[row])"
        }

        return cellView
    }

    func tableView(_ tableView: NSTableView, shouldSelectRow row: Int) -> Bool {
        return true
    }
}
