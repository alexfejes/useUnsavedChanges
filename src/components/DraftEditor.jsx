import { useState } from 'react'
// FIX: import the guard hook
// import { useUnsavedChanges } from '../hooks/useUnsavedChanges.js'

const EMPTY_DRAFT = { title: '', body: '' }

/**
 * A simple post editor that keeps its draft in local state.
 *
 * BUG: Back, refresh, or any nav link reloads the page and the draft is
 * silently discarded. Uncomment the FIX lines to guard it.
 */
export default function DraftEditor() {
  const [draft, setDraft] = useState(EMPTY_DRAFT)
  const [saved, setSaved] = useState(EMPTY_DRAFT)

  // FIX: dirty = draft differs from last save
  const isDirty = draft.title !== saved.title || draft.body !== saved.body

  // BUG: nothing warns before leaving
  // FIX: warn before leaving while dirty
  // useUnsavedChanges(isDirty)

  const update = (field) => (event) =>
    setDraft((current) => ({ ...current, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setSaved(draft) // saving clears the dirty flag
  }

  return (
    <form className="editor" onSubmit={handleSubmit}>
      <h1>New post</h1>

      <label>
        Title
        <input value={draft.title} onChange={update('title')} placeholder="Post title" />
      </label>

      <label>
        Body
        <textarea
          value={draft.body}
          onChange={update('body')}
          rows={10}
          placeholder="Start writing, then try Back, refresh, or the Home link…"
        />
      </label>

      <div className="editor-footer">
        <span className={isDirty ? 'status dirty' : 'status'}>
          {isDirty ? 'Unsaved changes' : 'All changes saved'}
        </span>
        <button type="submit" disabled={!isDirty}>
          Save draft
        </button>
      </div>
    </form>
  )
}
