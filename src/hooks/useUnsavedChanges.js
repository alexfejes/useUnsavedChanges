import { useEffect } from 'react'

export function useUnsavedChanges(isDirty) {
  useEffect(() => {
    if (!isDirty) return // FIX: only warn with unsaved input

    function handleBeforeUnload(event) {
      event.preventDefault() // FIX: triggers leave-page prompt
      event.returnValue = '' // FIX: older browser support
    }

    window.addEventListener('beforeunload', handleBeforeUnload) // FIX: guard while dirty
    return () => window.removeEventListener('beforeunload', handleBeforeUnload) // FIX: cleanup on save/unmount
  }, [isDirty])
}
