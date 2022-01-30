export interface RpcError extends Error {
  code: number
  message: string
}
