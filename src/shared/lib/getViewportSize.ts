/** Visible viewport size (accounts for mobile browser chrome). */
export const getViewportSize = () => {
  const vv = window.visualViewport
  return {
    width: vv?.width ?? window.innerWidth,
    height: vv?.height ?? window.innerHeight,
  }
}
