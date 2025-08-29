// Global color configuration for easy theme testing
export const colorThemes = {
  default: {
    // Brand colors
    brand: {
      primary: "oklch(0.205 0 0)", // Black
      secondary: "oklch(0.97 0 0)", // Light gray
      accent: "oklch(0.646 0.222 41.116)", // Orange accent
    },
    // UI colors
    ui: {
      background: "oklch(1 0 0)", // White
      foreground: "oklch(0.145 0 0)", // Dark gray
      muted: "oklch(0.97 0 0)", // Light gray
      mutedForeground: "oklch(0.556 0 0)", // Medium gray
      border: "oklch(0.922 0 0)", // Light border
      input: "oklch(0.922 0 0)", // Input background
      ring: "oklch(0.708 0 0)", // Focus ring
    },
    // Status colors
    status: {
      success: "oklch(0.6 0.118 184.704)", // Green
      warning: "oklch(0.828 0.189 84.429)", // Yellow
      error: "oklch(0.577 0.245 27.325)", // Red
      info: "oklch(0.398 0.07 227.392)", // Blue
    },
  },
  // Alternative theme for testing
  purple: {
    brand: {
      primary: "oklch(0.4 0.2 270)", // Purple
      secondary: "oklch(0.95 0.02 270)", // Light purple
      accent: "oklch(0.6 0.15 320)", // Pink accent
    },
    ui: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      muted: "oklch(0.95 0.02 270)",
      mutedForeground: "oklch(0.556 0 0)",
      border: "oklch(0.9 0.02 270)",
      input: "oklch(0.9 0.02 270)",
      ring: "oklch(0.6 0.15 270)",
    },
    status: {
      success: "oklch(0.6 0.118 184.704)",
      warning: "oklch(0.828 0.189 84.429)",
      error: "oklch(0.577 0.245 27.325)",
      info: "oklch(0.5 0.15 270)",
    },
  },
} as const

export type ColorTheme = keyof typeof colorThemes
export const defaultTheme: ColorTheme = "default"

// Helper function to get current theme colors
export function getThemeColors(theme: ColorTheme = defaultTheme) {
  return colorThemes[theme]
}
