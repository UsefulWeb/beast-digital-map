/**
 * Map UI palette — pulled from board watercolor washes
 * (clay roofs, moss/olive forest, water teal, ochre paths).
 * Keep SVG fills (location-next, visit-marker) in sync with `accent`.
 */
export const palette = {
  /** Path stroke — ochre from map dirt/path washes */
  path: '#c4922e',
  /** Next/paw SVG overlays — brighter than path so they read on map washes */
  accent: '#ffd24a',
  /** Visited location — moss/olive from forest greens */
  markerVisited: '#5d7d3a',
  /** Path start — terracotta / clay red from settlements */
  markerStart: '#9a4a36',
  /** Path end / current — water teal from Drenched Lands */
  markerEnd: '#0c6e84',
  hover: '#ffa92c',
  ink: '#111111',
} as const

export type PaletteColor = keyof typeof palette

/** CSS custom properties mirrored from `palette`. */
export const paletteCss = `
  :root {
    --color-path: ${palette.path};
    --color-accent: ${palette.accent};
    --color-marker-visited: ${palette.markerVisited};
    --color-marker-start: ${palette.markerStart};
    --color-marker-end: ${palette.markerEnd};
    --color-hover: ${palette.hover};
    --color-ink: ${palette.ink};

    --color-marker-visited-fill: color-mix(
      in srgb,
      var(--color-marker-visited) 59%,
      transparent
    );
    --color-marker-start-fill: color-mix(
      in srgb,
      var(--color-marker-start) 59%,
      transparent
    );
    --color-marker-end-fill: color-mix(
      in srgb,
      var(--color-marker-end) 59%,
      transparent
    );
  }
`
