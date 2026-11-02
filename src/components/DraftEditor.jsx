import { useState } from 'react'
// FIX 1: import the guard hook
// import { useUnsavedChanges } from '../hooks/useUnsavedChanges.js'

const EMPTY_DRAFT = { title: '', body: '' }

/**
 * A simple post editor that keeps its draft in local state.
 *
 * BUG: Back, refresh, or any nav link reloads the page and the draft is
 * silently discarded with no warning.
 * FIX 1-2 go here, FIX 3-9 go in hooks/useUnsavedChanges.js.
 */
export default function DraftEditor() {
  const [draft, setDraft] = useState(EMPTY_DRAFT)
  // eslint-disable-next-line no-unused-vars -- read once FIX 2 is typed
  const [saved, setSaved] = useState(EMPTY_DRAFT)

  // BUG: nothing warns before leaving
  // FIX 2: detect unsaved input, then turn on the warning
  // const isDirty = draft.title !== saved.title || draft.body !== saved.body
  // useUnsavedChanges(isDirty)

  const update = (field) => (event) =>
    setDraft((current) => ({ ...current, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setSaved(draft) // saving makes draft match saved
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
        <span className="status">Drafts are only kept until you leave the page</span>
        <button type="submit">Save draft</button>
      </div>
    </form>
  )
}
