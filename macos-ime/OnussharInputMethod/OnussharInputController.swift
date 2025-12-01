import Cocoa
import InputMethodKit

/**
 * Main Input Method Controller for Onusshar
 * Handles text input events and manages composition
 */
@objc(OnussharInputController)
class OnussharInputController: IMKInputController {

    // MARK: - Properties

    private var compositionBuffer: String = ""
    private var candidateWindow: OnussharCandidateWindow?
    private var engineBridge: OnussharEngineBridge?

    // MARK: - Initialization

    override init!(server: IMKServer!, delegate: Any!, client inputClient: Any!) {
        super.init(server: server, delegate: delegate, client: inputClient)

        // Initialize engine bridge
        engineBridge = OnussharEngineBridge()

        // Initialize candidate window
        candidateWindow = OnussharCandidateWindow()
    }

    deinit {
        candidateWindow?.close()
    }

    // MARK: - Input Handling

    override func inputText(_ string: String!, client sender: Any!) -> Bool {
        guard let client = sender as? IMKTextInput else {
            return false
        }

        // Handle printable characters
        compositionBuffer += string

        // Convert using engine
        if let converted = engineBridge?.convert(compositionBuffer) {
            // Update composition
            updateComposition(converted, client: client)

            // Get and show suggestions
            if let suggestions = engineBridge?.getSuggestions(compositionBuffer, limit: 9) {
                showCandidates(suggestions)
            }
        }

        return true
    }

    override func handle(_ event: NSEvent!, client sender: Any!) -> Bool {
        guard let client = sender as? IMKTextInput,
              let event = event else {
            return false
        }

        // Only handle key down events
        guard event.type == .keyDown else {
            return false
        }

        let keyCode = event.keyCode
        let modifierFlags = event.modifierFlags
        let characters = event.characters ?? ""

        // Handle special keys
        switch keyCode {
        case 36: // Return
            return handleReturn(client: client)

        case 53: // Escape
            return handleEscape(client: client)

        case 51: // Delete/Backspace
            return handleBackspace(client: client)

        case 49: // Space
            return handleSpace(client: client)

        case 18...26: // Number keys 1-9
            if !modifierFlags.contains(.command) && !modifierFlags.contains(.control) {
                return handleCandidateSelection(Int(keyCode) - 18, client: client)
            }

        default:
            break
        }

        // Handle regular characters
        if !characters.isEmpty && !modifierFlags.contains(.command) {
            return inputText(characters, client: client)
        }

        return false
    }

    // MARK: - Special Key Handlers

    private func handleReturn(client: IMKTextInput) -> Bool {
        if !compositionBuffer.isEmpty {
            commitComposition(client: client)
            return true
        }
        return false
    }

    private func handleEscape(client: IMKTextInput) -> Bool {
        if !compositionBuffer.isEmpty {
            cancelComposition(client: client)
            return true
        }
        return false
    }

    private func handleBackspace(client: IMKTextInput) -> Bool {
        if !compositionBuffer.isEmpty {
            compositionBuffer = String(compositionBuffer.dropLast())

            if compositionBuffer.isEmpty {
                cancelComposition(client: client)
            } else {
                if let converted = engineBridge?.convert(compositionBuffer) {
                    updateComposition(converted, client: client)

                    if let suggestions = engineBridge?.getSuggestions(compositionBuffer, limit: 9) {
                        showCandidates(suggestions)
                    }
                }
            }
            return true
        }
        return false
    }

    private func handleSpace(client: IMKTextInput) -> Bool {
        if !compositionBuffer.isEmpty {
            commitComposition(client: client)
            // Insert space after committing
            client.insertText(" ", replacementRange: NSRange(location: NSNotFound, length: 0))
            return true
        }
        return false
    }

    private func handleCandidateSelection(_ index: Int, client: IMKTextInput) -> Bool {
        if !compositionBuffer.isEmpty {
            if let candidate = candidateWindow?.getCandidate(at: index) {
                // Insert selected candidate
                client.insertText(candidate, replacementRange: NSRange(location: NSNotFound, length: 0))
                compositionBuffer = ""
                hideCandidates()
                return true
            }
        }
        return false
    }

    // MARK: - Composition Management

    private func updateComposition(_ text: String, client: IMKTextInput) {
        // Get current composition range
        let range = NSRange(location: 0, length: compositionBuffer.count)

        // Update marked text
        let attributes: [NSAttributedString.Key: Any] = [
            .underlineStyle: NSUnderlineStyle.single.rawValue,
            .markedClauseSegment: 0
        ]

        let attributedString = NSAttributedString(string: text, attributes: attributes)
        client.setMarkedText(attributedString,
                            selectionRange: NSRange(location: text.count, length: 0),
                            replacementRange: range)
    }

    private func commitComposition(client: IMKTextInput) {
        if let converted = engineBridge?.convert(compositionBuffer) {
            client.insertText(converted, replacementRange: NSRange(location: NSNotFound, length: 0))
        }
        compositionBuffer = ""
        hideCandidates()
    }

    private func cancelComposition(client: IMKTextInput) {
        compositionBuffer = ""
        client.setMarkedText("",
                            selectionRange: NSRange(location: 0, length: 0),
                            replacementRange: NSRange(location: NSNotFound, length: 0))
        hideCandidates()
    }

    // MARK: - Candidate Window

    private func showCandidates(_ candidates: [String]) {
        guard !candidates.isEmpty else {
            hideCandidates()
            return
        }

        // Get cursor position using firstRect(forCharacterRange:actualRange:)
        if let client = client() as? IMKTextInput {
            var actualRange = NSRange()
            let cursorRect = client.firstRect(forCharacterRange: NSRange(location: 0, length: 0), actualRange: &actualRange)

            // Position candidate window below cursor
            var windowRect = cursorRect
            windowRect.origin.y -= candidateWindow?.frame.height ?? 0

            candidateWindow?.setCandidates(candidates)
            candidateWindow?.setFrame(windowRect, display: true)
            candidateWindow?.orderFront(nil)
        }
    }

    private func hideCandidates() {
        candidateWindow?.orderOut(nil)
    }

    // MARK: - IMKInputController Overrides

    override func activateServer(_ sender: Any!) {
        super.activateServer(sender)
        compositionBuffer = ""
    }

    override func deactivateServer(_ sender: Any!) {
        if let client = sender as? IMKTextInput {
            cancelComposition(client: client)
        }
        super.deactivateServer(sender)
    }

    override func commitComposition(_ sender: Any!) {
        if let client = sender as? IMKTextInput {
            commitComposition(client: client)
        }
    }

    override func cancelComposition() {
        if let client = client() as? IMKTextInput {
            cancelComposition(client: client)
        }
    }

    override func recognizedEvents(_ sender: Any!) -> Int {
        // Handle key down events
        return Int(NSEvent.EventTypeMask.keyDown.rawValue)
    }
}
