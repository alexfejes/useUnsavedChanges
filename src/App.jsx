import DraftEditor from './components/DraftEditor.jsx'
import './App.css'

// Plain links = full page loads, so Back/links/refresh all fire beforeunload
const view = new URLSearchParams(window.location.search).get('view') ?? 'home'

function App() {
  return (
    <>
      <nav className="nav">
        <a href="?view=home" className={view === 'home' ? 'active' : ''}>
          Home
        </a>
        <a href="?view=editor" className={view === 'editor' ? 'active' : ''}>
          Write a post
        </a>
        <a href="https://react.dev/">External link</a>
      </nav>

      <main>
        {view === 'editor' ? (
          <DraftEditor />
        ) : (
          <section className="home">
            <h1>useUnsavedChanges demo</h1>
            <p>
              Open <strong>Write a post</strong>, type something, then press Back, refresh, or
              click a link. Without the fix the draft is gone with no warning.
            </p>
          </section>
        )}
      </main>
    </>
  )
}

export default App
