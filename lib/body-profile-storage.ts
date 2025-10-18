import type { BodyProfile } from "@/types/body-measurement"

const STORAGE_KEY = "designbetter_body_profiles"

export class BodyProfileStorage {
  static getProfiles(): BodyProfile[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error loading body profiles:", error)
      return []
    }
  }

  static saveProfile(profile: BodyProfile): void {
    if (typeof window === "undefined") return

    try {
      const profiles = this.getProfiles()
      const existingIndex = profiles.findIndex((p) => p.id === profile.id)

      if (existingIndex >= 0) {
        profiles[existingIndex] = profile
      } else {
        profiles.push(profile)
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
    } catch (error) {
      console.error("Error saving body profile:", error)
    }
  }

  static deleteProfile(id: string): void {
    if (typeof window === "undefined") return

    try {
      const profiles = this.getProfiles().filter((p) => p.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
    } catch (error) {
      console.error("Error deleting body profile:", error)
    }
  }

  static getProfile(id: string): BodyProfile | null {
    return this.getProfiles().find((p) => p.id === id) || null
  }
}