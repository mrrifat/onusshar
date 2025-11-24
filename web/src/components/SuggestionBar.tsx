import { Suggestion } from '@onusshar/dictionary'
import './SuggestionBar.css'

interface SuggestionBarProps {
  suggestions: Suggestion[]
  onSuggestionClick: (suggestion: Suggestion) => void
}

function SuggestionBar({ suggestions, onSuggestionClick }: SuggestionBarProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="suggestion-bar">
      <div className="suggestion-label">Suggestions:</div>
      <div className="suggestions">
        {suggestions.map((suggestion, index) => (
          <button
            key={`${suggestion.word}-${index}`}
            className="suggestion"
            onClick={() => onSuggestionClick(suggestion)}
            title={`Score: ${suggestion.score.toFixed(2)}`}
          >
            <span className="suggestion-number">{index + 1}</span>
            <span className="suggestion-word bengali">{suggestion.word}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SuggestionBar
