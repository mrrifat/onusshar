import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Made with ❤️ for the Bengali-speaking community | Open source under MIT License
        </p>
        <p className="footer-links">
          <a href="https://github.com/onusshar/onusshar" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' · '}
          <a href="https://github.com/onusshar/onusshar/issues" target="_blank" rel="noopener noreferrer">
            Report Issue
          </a>
          {' · '}
          <a href="https://github.com/onusshar/onusshar/blob/main/README.md" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
