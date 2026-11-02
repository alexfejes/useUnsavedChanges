import { useCallback, useEffect, useState } from 'react'
import DraftEditor from './components/DraftEditor.jsx'
import './App.css'

// Tiny history-based router so Back/Forward behave like a real SPA
const viewFromHistory = () => window.history.state?.view ?? 'home'

function App() {
  const [view, setView] = useState(viewFromHistory)
  // Guard registered by the active page, if it has unsaved work
  const [leaveGuard, setLeaveGuard] = useState(null)

  useEffect(() => {
    if (!window.history.state?.view) window.history.replaceState({ view: 'home' }, '')
    const handlePopState = () => setView(viewFromHistory())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback(
    (next) => (event) => {
      event.preventDefault()
      if (next === view) return
      // FIX: ask the page before leaving (no-op until the guard is wired in)
      if (leaveGuard && !leaveGuard()) return
      window.history.pushState({ view: next }, '')
      setView(next)
    },
    [view, leaveGuard],
  )

  return (
    <>
      <nav className="nav">
        <a href="#home" className={view === 'home' ? 'active' : ''} onClick={navigate('home')}>
          Home
        </a>
        <a href="#editor" className={view === 'editor' ? 'active' : ''} onClick={navigate('editor')}>
          Write a post
        </a>
        <a href="https://react.dev/">External link</a>
      </nav>

      <main>
        {view === 'home' ? (
          <section className="home">
            <h1>useUnsavedChanges demo</h1>
            <p>
              Open <strong>Write a post</strong>, type something, then press Back, refresh, or
              click a link. Without the fix the draft is gone with no warning.
            </p>
          </section>
        ) : (
          <DraftEditor onRegisterGuard={setLeaveGuard} />
        )}
      </main>
    </>
  )
}

export default App
