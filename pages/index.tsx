import type { ReactElement } from 'react'
import HeadHome from './componets/head'
import Layout from './layout/layout'
import type { NextPageWithLayout } from './_app'
import Bodyhome from './componets/body'
import Foorterhome from './componets/foorter'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Page: NextPageWithLayout = () => {
  return <div className='overflow-y-auto scrollbar-hide h-screen w-full'>
    <div className='flex flex-col justify-center space-y-60'>
      <div className='h-auto'>
        <HeadHome />
      </div>
      <div className='flex flex-row '>
        <div className='basis-1/4'></div>
        <Bodyhome />
        <div></div>
      </div>
      <footer className='flex flex-row '>
        <div className='basis-1/4'></div>
        <Foorterhome />
        <div></div>
      </footer>
    </div>
  </div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>
      <Layout>
        {page}
      </Layout>
    </div>

  )
}

export default Page

export async function getStaticProps({ locale }: any) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])), } }
}