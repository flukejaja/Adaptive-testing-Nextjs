import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "@material-tailwind/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FC, ReactElement, ReactNode, useEffect, useState } from 'react'
import type { NextPage } from 'next'
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
import { appWithTranslation } from 'next-i18next'
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

import Head from 'next/head'
import React from 'react';
import { RecoilRoot } from 'recoil';
// import { Akshar } from '@next/font/google'
// const akshar = Akshar({ subsets: ['latin'], weight: ['400', '700'] })
// import { Kanit } from '@next/font/google'
// const kanit = Kanit({ weight: ['200']})
import { useTranslation } from 'react-i18next';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout ) =>{
  const getLayout = Component.getLayout ?? ((page) => page)
  const { i18n } = useTranslation();
  const [isEnglish , setIsEnglish ] = useState(true)
  useEffect(()=>{
    setIsEnglish(i18n.language === 'en')
  },[i18n])
  return getLayout(
    <main className={`${isEnglish ? 'font-akshar': 'font-kanit'}`}>
      <Head>
        <title>Adaptive testing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/dw-1.png" />
      </Head>
      <RecoilRoot>
        <ThemeProvider >
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </main>

  )
}

export default appWithTranslation(MyApp as FC);
