export function addIsMetamaskConnected(toggle: boolean): void {
  if (window) {
    window.localStorage.setItem('metaMaskConnected', String(toggle))
  }
}

export function getIsMetamaskConnected(): boolean {
  if (window) {
    const value = window.localStorage.getItem('metaMaskConnected')
    return value === 'true'
  }

  return false
}
