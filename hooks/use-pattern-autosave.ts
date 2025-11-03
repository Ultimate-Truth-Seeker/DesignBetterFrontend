"use client"

import { useCallback, useEffect, useRef } from "react"
import type { Pattern } from "@/types/pattern"

interface UsePatternAutosaveOptions {
  pattern: Partial<Pattern>
  isDirty: boolean
  onSave: () => Promise<void>
  onSaveSuccess?: (timestamp: Date) => void
  onSaveError?: (error: Error) => void
  interval?: number // milliseconds
}

export function usePatternAutosave({
  pattern,
  isDirty,
  onSave,
  onSaveSuccess,
  onSaveError,
  interval = 30000, // 30 seconds
}: UsePatternAutosaveOptions) {
  const intervalRef = useRef<NodeJS.Timeout>(null)
  const lastSaveRef = useRef<string>(null)

  const performSave = useCallback(async () => {
    if (!isDirty) return

    // Avoid duplicate saves for the same pattern state
    const currentPatternString = JSON.stringify(pattern)
    if (lastSaveRef.current === currentPatternString) return

    try {
      await onSave()
      lastSaveRef.current = currentPatternString
      onSaveSuccess?.(new Date())
    } catch (error) {
      onSaveError?.(error as Error)
    }
  }, [pattern, isDirty, onSave, onSaveSuccess, onSaveError])

  // Set up auto-save interval
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(performSave, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [performSave, interval])

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = "Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?"
        // Attempt to save before leaving
        performSave()
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [isDirty, performSave])

  return {
    saveNow: performSave,
  }
}
