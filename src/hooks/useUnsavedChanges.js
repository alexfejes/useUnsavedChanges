import { useCallback, useEffect } from 'react'

const DEFAULT_MESSAGE = 'You have unsaved changes. Leave this page and lose them?'
const GUARD_KEY = '__unsavedGuard'

/**
 * Warns the user before unsaved work is thrown away.
 *
 * Covers three exits:
 *  - refresh / close tab / external link  -> native `beforeunload` prompt
 *  - browser Back / Forward button        -> `popstate` + confirm()
 *  - in-app links                         -> returned `confirmLeave()` guard
 *
 * @param {boolean} isDirty  true while there is unsaved input
 * @param {string} [message] text for the in-app confirm dialogs
 * @returns {() => boolean}  call before navigating; false means "stay"
 */
export function useUnsavedChanges(isDirty, message = DEFAULT_MESSAGE) {
  // FIX: block refresh, tab close, external links
  useEffect(() => {
    if (!isDirty) return

    const handleBeforeUnload = (event) => {
      event.preventDefault() // FIX: triggers native prompt
      event.returnValue = '' // FIX: legacy Chrome/Safari support
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  // FIX: intercept browser Back/Forward button
  useEffect(() => {
    if (!isDirty) return

    // FIX: sentinel entry absorbs first Back press
    const pushGuard = () =>
      window.history.pushState({ ...window.history.state, [GUARD_KEY]: true }, '')
    pushGuard()

    const handlePopState = () => {
      if (window.confirm(message)) {
        // FIX: user agreed, really go back
        window.removeEventListener('popstate', handlePopState)
        window.history.back()
      } else {
        // FIX: user cancelled, restore sentinel
        pushGuard()
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      // FIX: drop leftover sentinel once saved
      if (window.history.state?.[GUARD_KEY]) window.history.back()
    }
  }, [isDirty, message])

  // FIX: guard for in-app navigation
  return useCallback(
    () => !isDirty || window.confirm(message),
    [isDirty, message],
  )
}
