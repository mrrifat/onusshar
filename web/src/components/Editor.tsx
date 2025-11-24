import { useRef, useEffect } from 'react'
import './Editor.css'

interface EditorProps {
  input: string
  output: string
  onInputChange: (value: string, cursorPosition: number) => void
  onCopy: () => void
  onClear: () => void
}

function Editor({ input, output, onInputChange, onCopy, onClear }: EditorProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const position = e.target.selectionStart || 0
    onInputChange(value, position)
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const position = e.currentTarget.selectionStart || 0
    onInputChange(input, position)
  }

  const handleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const position = e.currentTarget.selectionStart || 0
    onInputChange(input, position)
  }

  return (
    <div className="editor">
      <div className="editor-pane">
        <div className="editor-header">
          <label>Type in Roman letters</label>
        </div>
        <textarea
          ref={inputRef}
          className="editor-input"
          value={input}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onClick={handleClick}
          placeholder="Type here... e.g. ami bangla likhchi"
          spellCheck={false}
        />
      </div>

      <div className="editor-pane">
        <div className="editor-header">
          <label>Bengali output</label>
          <div className="editor-actions">
            <button onClick={onCopy} className="btn btn-secondary" title="Copy to clipboard">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
              </svg>
              Copy
            </button>
            <button onClick={onClear} className="btn btn-secondary" title="Clear all">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
              Clear
            </button>
          </div>
        </div>
        <textarea
          className="editor-output bengali"
          value={output}
          readOnly
          placeholder="Bengali text will appear here..."
        />
      </div>
    </div>
  )
}

export default Editor
