import type { ReactElement } from 'react'
import Layout from '../layout/layout'
import type { NextPageWithLayout } from '../_app'
import Link from 'next/link'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
const ListQuiz: NextPageWithLayout = () => {
    const { t } = useTranslation()
    let listDifficulty = [
        {
            list: 'easy_exam',
            level: ['A1', 'A2']
        },
        {
            list: 'normal_exam',
            level: ['B1', 'B2']
        },
        {
            list: 'hard_exam',
            level: ['C1', 'C2']
        }
    ]
    return <div className='flex-col space-y-8 flex  w-full h-screen overflow-auto text-white'>
        <div className='bg-[#8F8F8F] h-32 mt-16  mx-20 rounded-3xl flex-col'>
            <div className='flex items-center justify-center h-full'><p className='text-lg md:text-3xl '>{t('computing_science')}</p></div>
        </div>
        {listDifficulty.map((x, index: number) => {
            return <div className='flex justify-center items-center flex-col  space-y-4 ' key={index}>
                <div className='w-1/2'><p className='text-xl text-black'>{t(x.list)}</p></div>
                {
                    x.level.map((subData, index: number) =>
                        <Link href={`/quiz/${subData}`} className="w-1/2" key={index}>
                            <div className='w-full bg-[#8F8F8F] h-12 rounded-xl flex justify-between items-center pl-4 pr-4
                            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 hover:cursor-pointer '>
                                <p className='text-2xl font-akshar'>{subData}</p>
                                <p className='bg-black'></p>
                                <p className="text-lg"><label className='font-akshar'>20</label> {t('question')}</p>
                            </div>
                        </Link>)
                }
            </div>

        })}
    </div>
}
ListQuiz.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default ListQuiz

export async function getStaticProps({ locale }: any) {
    return { props: { ...(await serverSideTranslations(locale, ["common"])), } }
}