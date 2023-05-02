import { ReactElement, useEffect, useState, useRef } from 'react'
import Layout from '../layout/layout'
import type { NextPageWithLayout } from '../_app'
import { Input } from '@material-tailwind/react'
import Image from 'next/image'
const api = require('../api/student')
import Loading from '../loading'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { User } from '../../public/types'

const Searchprofile: NextPageWithLayout = () => {
    const [data, setData] = useState<[User]>([{
        authId: '',
        email: '',
        first_name: '',
        history: [],
        id: '',
        image_url: '',
        last_name: '',
        level: '',
        name: '',
        score: 0,
        sub_id: '',
        tel: '',
    }])
    const [loading, setLoading] = useState(true)
    const { t, i18n } = useTranslation()
    useEffect(() => {
        getStudent('')
    }, [])
    const getStudent = async (name: any) => {
        let getData = await api.getStudentUser(name)
        setData(getData.result)
        if (getData.message === "ok") setLoading(false)
    }
    if (loading) {
        return <Loading />
    }
    return <div className='w-full overflow-auto h-screen scrollbar-hide px-5 py-5'>
        <div className='h-14'>
            <div className='mt-20 mx-20 '>
                <Input label="Search" onChange={(e) => getStudent(e.target.value)} />
            </div>
        </div>
        <div className={`w-[20rem] sm:w-full mx-20 sm:mx-auto gap-x-10  grid md:grid-cols-1 lg:grid-cols-2  xl:grid-cols-2 2xl:grid-cols-3  gap-5 justify-center   drop-shadow-2xl items-center`}>
            {data.map((result: any) => {
                return <div key={result.id} className='space-x-5 justify-self-center h-auto flex  w-[30rem] px-5 border rounded-xl py-2 bg-gray-200 justify-center'>
                    <div className="flex justify-center">
                        <div className='h-44 w-24 duration-300 md:w-44 bg-white flex items-center justify-center rounded-2xl text-black relative '>
                            {result.image_url ? <Image loader={() => result.image_url} src={`${result.image_url}`} alt=''
                                fill
                                className="w-full h-full top-0 left-0 object-cover rounded-2xl"
                            />
                                : <Image src={`/person-png-icon-29.jpg`} alt=''
                                    fill
                                    className="w-full h-full top-0 left-0 object-cover rounded-2xl"
                                />}
                        </div>
                    </div>
                    <div className="  bg-gray-300 rounded-2xl flex flex-col justify-between px-4 w-[20rem]  whitespace-nowrap">
                        <p className={`h-full flex items-center text-black`}>{t('username')} :
                            <label className={`${i18n.language !== 'en' && 'font-akshar'} pl-2`}>
                                {result.name}
                            </label>
                        </p>
                        <p className='h-full flex items-center text-black'>{t('level')} :
                            <label className={`${i18n.language !== 'en' && 'font-akshar'} pl-2`}>
                                {result.level}
                            </label>
                        </p>
                        <p className='h-full flex items-center text-black'>{t('score')} : {Number(result.score).toFixed(2)}</p>
                        <p className='h-full flex items-center text-black'>{t('email')} :
                            <label className={`${i18n.language !== 'en' && 'font-akshar'} pl-2`}>
                                {result.email}
                            </label>
                        </p>
                    </div>
                </div>
            })}
        </div>
    </div>
}
Searchprofile.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Searchprofile

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    }
}