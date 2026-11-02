// FIX 3-9: type these in this file. FIX 1-2 live in components/DraftEditor.jsx

// FIX 3: import useEffect
// import { useEffect } from 'react'

// eslint-disable-next-line no-unused-vars -- used once FIX 4 is typed
export function useUnsavedChanges(isDirty) {
  // FIX 4: re-run whenever isDirty changes
  // useEffect(() => {
  //   // FIX 5: only warn with unsaved input
  //   if (!isDirty) return
  //
  //   // FIX 6: handler that shows leave-page prompt
  //   function handleBeforeUnload(event) {
  //     event.preventDefault() // triggers the prompt
  //     event.returnValue = '' // older browser support
  //   }
  //
  //   // FIX 7: start listening while dirty
  //   window.addEventListener('beforeunload', handleBeforeUnload)
  //
  //   // FIX 8: stop listening on save/unmount
  //   return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  // FIX 9: dependency array, re-run on isDirty
  // }, [isDirty])
}
