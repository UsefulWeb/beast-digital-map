/**
 * Map UI palette — muted watercolor + gold accents from board art.
 * Keep SVG fills (location-next, visit-marker) in sync with `accent`.
 */
export const palette = {
  path: '#d2982f',
  /** Next/paw SVG overlays — brighter than path so they read on map washes */
  accent: '#ffd24a',
  /** Visited location on path */
  markerVisited: '#4f7a3c',
  /** Path start */
  markerStart: '#a44b35',
  /** Path end / current */
  markerEnd: '#1f7388',
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
