import Foundation
import JavaScriptCore

/**
 * Bridge to @onusshar/core TypeScript engine
 * Uses JavaScriptCore to execute TypeScript code
 */
class OnussharEngineBridge {

    // MARK: - Properties

    private var jsContext: JSContext?
    private var transliterator: JSValue?

    // MARK: - Initialization

    init() {
        setupJSContext()
        loadEngine()
    }

    // MARK: - Setup

    private func setupJSContext() {
        jsContext = JSContext()

        // Set up exception handler
        jsContext?.exceptionHandler = { context, exception in
            if let error = exception {
                print("JS Error: \(error)")
            }
        }

        // Add console.log for debugging
        let console: @convention(block) (String) -> Void = { message in
            print("JS: \(message)")
        }
        jsContext?.setObject(console, forKeyedSubscript: "console_log" as NSString)
        jsContext?.evaluateScript("var console = { log: function(msg) { console_log(msg); } };")
    }

    private func loadEngine() {
        // In production, this would load the bundled @onusshar/core JavaScript
        // For now, we'll create a simple inline implementation

        let engineCode = """
        var Transliterator = (function() {
            function Transliterator() {
                // Simple phonetic mappings (subset for demo)
                this.mappings = {
                    'a': 'আ', 'i': 'ই', 'u': 'উ', 'e': 'এ', 'o': 'ও',
                    'k': 'ক', 'kh': 'খ', 'g': 'গ', 'gh': 'ঘ',
                    'c': 'চ', 'ch': 'ছ', 'j': 'জ', 'jh': 'ঝ',
                    't': 'ত', 'th': 'থ', 'd': 'দ', 'dh': 'ধ', 'n': 'ন',
                    'p': 'প', 'ph': 'ফ', 'b': 'ব', 'bh': 'ভ', 'm': 'ম',
                    'r': 'র', 'l': 'ল', 's': 'স', 'sh': 'শ', 'h': 'হ',
                    'y': 'য়', 'ng': 'ঙ',
                    'T': 'ট', 'Th': 'ঠ', 'D': 'ড', 'Dh': 'ঢ', 'N': 'ণ'
                };
            }

            Transliterator.prototype.convert = function(input) {
                if (!input) return '';

                var result = '';
                var i = 0;

                while (i < input.length) {
                    var found = false;

                    // Try 2-character combinations first
                    if (i + 1 < input.length) {
                        var twoChar = input.substring(i, i + 2);
                        if (this.mappings[twoChar]) {
                            result += this.mappings[twoChar];
                            i += 2;
                            found = true;
                        }
                    }

                    // Try single character
                    if (!found) {
                        var oneChar = input[i];
                        if (this.mappings[oneChar]) {
                            result += this.mappings[oneChar];
                        } else {
                            result += oneChar;
                        }
                        i++;
                    }
                }

                return result;
            };

            Transliterator.prototype.getSuggestions = function(input, limit) {
                // For now, just return the converted text
                var converted = this.convert(input);
                return converted ? [converted] : [];
            };

            return Transliterator;
        })();

        var transliterator = new Transliterator();
        """

        jsContext?.evaluateScript(engineCode)
        transliterator = jsContext?.objectForKeyedSubscript("transliterator")
    }

    // MARK: - Public API

    /// Convert Latin input to Bengali
    func convert(_ input: String) -> String? {
        guard let convert = transliterator?.objectForKeyedSubscript("convert"),
              let result = convert.call(withArguments: [input]) else {
            return nil
        }

        return result.toString()
    }

    /// Get suggestions for input
    func getSuggestions(_ input: String, limit: Int) -> [String]? {
        guard let getSuggestions = transliterator?.objectForKeyedSubscript("getSuggestions"),
              let result = getSuggestions.call(withArguments: [input, limit]) else {
            return nil
        }

        return result.toArray() as? [String]
    }

    /// Update engine configuration
    func updateConfig(mode: String, digitFormat: String) {
        // TODO: Implement configuration updates
    }
}
