import '/styles/globals.scss'
import type { AppProps } from 'next/app'
import Web3Wrapper from '@hooks/Web3Wrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Wrapper>
      <Component {...pageProps} />
    </Web3Wrapper>
  )
}

export default MyApp
