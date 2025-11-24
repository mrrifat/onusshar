import { useState, useCallback } from 'react'
import { Transliterator } from '@onusshar/core'
import { createDefaultEngine, Suggestion } from '@onusshar/dictionary'
import './styles/App.css'
import Editor from './components/Editor'
import SuggestionBar from './components/SuggestionBar'
import Header from './components/Header'
import Footer from './components/Footer'

const transliterator = new Transliterator()
const suggestionEngine = createDefaultEngine({
  maxSuggestions: 9,
  enableAutocorrect: true,
  enableUserLearning: true,
})

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [cursorPosition, setCursorPosition] = useState(0)

  const handleInputChange = useCallback((value: string, position: number) => {
    setInput(value)
    setCursorPosition(position)

    // Convert to Bengali
    const bengali = transliterator.convert(value).text
    setOutput(bengali)

    // Get word at cursor for suggestions
    const words = value.slice(0, position).split(/\s+/)
    const currentWord = words[words.length - 1] || ''

    if (currentWord.length > 0) {
      const wordSuggestions = suggestionEngine.getSuggestions(currentWord)
      setSuggestions(wordSuggestions.slice(0, 9))
    } else {
      setSuggestions([])
    }
  }, [])

  const handleSuggestionClick = useCallback((suggestion: Suggestion) => {
    // Find the current word to replace
    const beforeCursor = input.slice(0, cursorPosition)
    const afterCursor = input.slice(cursorPosition)
    const words = beforeCursor.split(/\s+/)
    const currentWord = words[words.length - 1] || ''

    if (currentWord.length > 0) {
      // Replace the current word with suggestion
      const newBeforeCursor = beforeCursor.slice(0, -currentWord.length)
      const suggestionPhonetic = getSuggestionPhonetic(suggestion.word)
      const newInput = newBeforeCursor + suggestionPhonetic + afterCursor
      const newPosition = newBeforeCursor.length + suggestionPhonetic.length

      setInput(newInput)
      setCursorPosition(newPosition)

      // Convert to Bengali
      const bengali = transliterator.convert(newInput)
      setOutput(bengali)

      // Learn the word
      suggestionEngine.learnWord(suggestion.word)

      // Clear suggestions
      setSuggestions([])
    }
  }, [input, cursorPosition])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output)
  }, [output])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setSuggestions([])
    setCursorPosition(0)
  }, [])

  return (
    <div className="app">
      <Header />

      <main className="container">
        <div className="editor-section">
          <Editor
            input={input}
            output={output}
            onInputChange={handleInputChange}
            onCopy={handleCopy}
            onClear={handleClear}
          />

          {suggestions.length > 0 && (
            <SuggestionBar
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>

        <div className="help-section">
          <h2>Quick Guide</h2>
          <div className="examples">
            <div className="example">
              <code>ami</code> → <span className="bengali">আমি</span>
            </div>
            <div className="example">
              <code>tumi</code> → <span className="bengali">তুমি</span>
            </div>
            <div className="example">
              <code>bangla</code> → <span className="bengali">বাংলা</span>
            </div>
            <div className="example">
              <code>bhalobashi</code> → <span className="bengali">ভালোবাসি</span>
            </div>
          </div>

          <div className="tips">
            <h3>Tips:</h3>
            <ul>
              <li>Use capital letters for retroflexes: <code>T</code> → ট, <code>D</code> → ড, <code>R</code> → ড়</li>
              <li>Double letters for longer vowels: <code>ii</code> → ঈ, <code>uu</code> → ঊ</li>
              <li>Type <code>\</code> before English words to keep them unchanged</li>
              <li>Smart suggestions appear as you type</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Helper function to get phonetic representation from Bengali word
// This is a simple reverse lookup - in production, store phonetic with suggestions
function getSuggestionPhonetic(bengaliWord: string): string {
  // For now, return a placeholder
  // In production, the dictionary should include phonetic mappings
  return bengaliWord
}

export default App
