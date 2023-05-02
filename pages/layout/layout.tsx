// import Footer from './footer'
// import Navbar from './navbar'
// import Sidebar from './sidebar'

// import Cookies from 'universal-cookie';
// import jwt from "jsonwebtoken";
// import { useEffect, useState } from 'react';
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { Akshar } from '@next/font/google'
// import { Kanit } from '@next/font/google'
// const akshar = Akshar({ subsets: ['latin'], weight: ['400', '700'] })
// const kanit = Kanit({ subsets: ['thai'], weight: ['400', '700'] })
// import { useTranslation } from 'react-i18next';
// export default function Layout({ children }: any) {
//     const cookies = new Cookies();
//     const { i18n } = useTranslation();
//     const [isEnglish, setIsEnglish] = useState(true)
//     const [decode, setDecode] = useState({
//         role: '',
//         username: ''
//     })
//     useEffect(() => {
//         let decode = jwt.decode(cookies.get('user')) as { role: string, username: string }
//         setDecode(decode)
//     }, [])
//     useEffect(() => {
//         setIsEnglish(i18n.language === 'en');
//     }, [i18n])
//     return (
//         <div className={`${isEnglish ? 'font-akshar' : 'font-kanit'} `}>
//             <div className='flex-col flex justify-between  h-screen w-screen overflow-auto '>
//                 <div className='flex w-full'>
//                     <Sidebar role={decode?.role} />
//                     <div className='flex-col  h-full bg-[#F8F7F6] w-full'>
//                         <Navbar role={decode?.role} name={decode?.username} />
//                         {children}
//                     </div>
//                 </div>
//                 {/* <div className='h-1/6 w-full '>
//                     <Footer />
//                 </div> */}
//             </div>
//         </div>

//     )
// }
// export async function getStaticProps({ locale }: any) {
//     return { props: { ...(await serverSideTranslations(locale, ["common"])), } }
// }

import Footer from './footer'
import Navbar from './navbar'
import Sidebar from './sidebar'

import Cookies from 'universal-cookie';
import jwt from "jsonwebtoken";
import { useEffect, useState } from 'react';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Akshar } from '@next/font/google'
import { Kanit } from '@next/font/google'
const akshar = Akshar({ subsets: ['latin'], weight: ['400', '700'] })
const kanit = Kanit({ subsets: ['thai'], weight: ['400', '700'] })
import { useTranslation } from 'react-i18next';
export default function Layout({ children }: any) {
    const cookies = new Cookies();
    const { i18n } = useTranslation();
    const [isEnglish , setIsEnglish] = useState(true)
    const [decode, setDecode] = useState({
        role: '',
        username: ''
    })
    useEffect(() => {
        let decode = jwt.decode(cookies.get('user')) as { role: string, username: string }
        setDecode(decode)
    }, [])
    useEffect(()=>{
        setIsEnglish(i18n.language === 'en');
    },[i18n])
    return (
        <div className={`${isEnglish ? 'font-akshar' : 'font-kanit'}`}>
            <div className='flex-col flex justify-between h-screen '>
                <div className=' flex'>
                    <Sidebar role={decode?.role} />
                    <div className='flex-col w-screen h-full bg-[#F8F7F6] '>
                        <Navbar role={decode?.role} name={decode?.username} />
                        {children}
                    </div>
                </div>
                <div className='h-1/6 w-full '>
                    {/* <Footer /> */}
                </div>
            </div>
        </div>
    )
}
export async function getStaticProps({ locale }: any) {
    return { props: { ...(await serverSideTranslations(locale, ["common"])), } }
}