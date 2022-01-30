export const formattingAddress = (address: string) => {
  const first = address.slice(0, 5)
  const last = address.slice(-4)
  return `${first}...${last}`
}
