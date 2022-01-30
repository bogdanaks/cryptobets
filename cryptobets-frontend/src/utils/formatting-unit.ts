import Big from 'bignumber.js'

export const formattingUnitToValue = (uint: string, decimals: number): string => {
  return new Big(uint).div(new Big(10).pow(decimals)).toString()
}

export const formattingValueToUnit = (value: number, decimals: number): string => {
  return new Big(value).div(new Big(10).pow(-decimals)).toFixed()
}

export const decimalsFixedValue = (value: string, decimals: number): string => {
  return new Big(value).toFixed(decimals).toString()
}
