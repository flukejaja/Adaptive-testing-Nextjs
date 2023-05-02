import { Button } from '@material-tailwind/react'
import { ReactElement } from 'react'
import Layout from '../layout/layout'
import type { NextPageWithLayout } from '../_app'
import { useState, useEffect } from 'react'
import ModalSubmit from './Components/modalSubmit'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import Loading from '../loading'
import { decodeString } from '../../functions/encode'
const api = require('../api/example')
const apiStudents = require('../api/student')
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from "next-i18next";

const Quiz: NextPageWithLayout = () => {
    const cookie = new Cookies()
    const router = useRouter()
    const { level } = router.query
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({}) as any[];
    const [ar, setAr] = useState([]) as any[];
    const [arrHistory, setHistory] = useState([]) as any[];
    const [loading, setLoading] = useState(true)
    const [showResults, setShowResults] = useState(false)
    const { t } = useTranslation()
    useEffect(() => {
            if(!cookie.get('user')){
                router.push('/')
            }
            else{
                getExample()
                setAr([])
            } 
    }, [])
    
    const getExample = async () => {
        let datasend = {
            id: "",
            no: 1,
            question_level: 2,
            answer: "0",
            h: 0,
            r: 0,
            level: level
        }
        let response = await api.getExample(datasend, cookie.get('user'))
        setData(response[0]);
        if (response.length > 0 && response[0].id !== "") setLoading(false)
    }
    const postExample = async (ans: string) => {
        setLoading(true)
        let post = {
            id: data.id,
            question: data.question,
            no: data.no,
            question_level: data.question_level,
            answer: ans,
            h: data.h,
            r: data.r,
            level: level
        }
        let getApiData = await api.getExample(post, cookie.get('user'))
        if (getApiData) {
            setData(getApiData[0])
            arrHistory.push(data);
            setHistory([...arrHistory])
            setLoading(false)
        }
    }
    useEffect(() => {
        if (data?.standard_error) {
            ar.push({
                no: arrHistory[arrHistory.length - 1].no,
                quiz: arrHistory[arrHistory.length - 1].question,
                standard_error: data?.standard_error,
                ability_measure: data?.ability_measure,
                r: data?.r,
                quiz_level: Math.round(arrHistory[arrHistory.length - 1].question_level),
                w: (data?.no - data?.r) - 1,
            })
            setAr(ar)
        }
        setShowResults(data?.exam_result > 1 || arrHistory?.length === 20)
    }, [data])
    const btnsubmit = async () => {
        let decode = jwt.decode(cookie.get('user')) as { username: string }
        let decodeId = decodeString(cookie.get('id'))
        let student = {
            id: decodeId,
            name: decode.username,
            data: [
                {
                    level: data.level,
                    data: ar
                }
            ]
        }
        await apiStudents.updateHistory(student, cookie.get('user'))
    }
    if (loading) return <Loading />
    return <>
        <div className={` flex-col space-y-8 flex  w-full overflow-auto scrollbar-hide pt-20 h-screen ${!data ? 'animate-pulse' : ''}`}>
            {data?.no <= 20 && data?.exam_result <= 1 ? <div className="space-y-8 ">
                <div className='w-full flex justify-start '>
                    <p className='text-2xl w-full ml-5 text-black'>ข้อ.{data.no}{data?.answer}</p>
                </div>
                <div className='bg-[#8F8F8F] h-44 ml-4 mr-4 rounded-3xl flex-col break-all'>
                    <div className='flex justify-center items-center h-full'>
                        <p className='text-sm md:text-lg mx-5 break-all text-white'>{data.question}</p>
                    </div>
                </div>
                {data.choice.map((subItems: any, index: number) => {
                    return <div key={index} className={`flex justify-center items-center text-white`}>
                        <button className='bg-[#8F8F8F] h-16 rounded-3xl  w-1/2 flex justify-between items-center pl-4 pr-4
            transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 space-x-2'
                            onClick={() => postExample(subItems.choice)} disabled={data.no === 21}>
                            <p className='text-xs sm:text-sm md:text-lg'>{subItems.choice}</p>
                            <p className='text-xs sm:text-sm  md:text-lg'>{subItems.sub_answer}</p>
                            <p></p>
                        </button>
                    </div>
                })
                }
                <div className='w-full flex justify-center '>
                    <p className='text-lg md:text-xl text-black'>เลเวลข้อสอบ {Math.floor(data.question_level)}</p>
                </div>
            </div> : <></>
            }
            <div className='h-12 flex justify-center flex-col'>
                {
                    showResults && <div className='flex justify-center font-kanit'>
                        {data?.exam_result === 3 ?
                            <div className='flex justify-center flex-col'>
                                <p className='text-black text-xl md:text-4xl mb-4'>คุณสอบไม่ผ่าน กรุณาสอบใหม่</p>
                                <Button color='red' className='font-kanit' onClick={() => { router.push('/listquiz') }}> ลองใหม่! </Button>
                            </div>
                            : <Button color='green' className='font-kanit' onClick={() => { setOpen(!open), btnsubmit() }} > ส่งคำตอบ </Button>
                        }

                    </div>
                }
                {/* <Button color='green' onClick={() => { setOpen(!open), btnsubmit() }}> ส่งคำตอบ </Button> */}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-4 w-full justify-center items-center '>
                    {
                (showResults && data?.exam_result < 3) &&
                    ar.map((items: any, index: number) => {
                        return  <div key={index} className='text-white text-md h-fit w-fit px-5 py-5 flex-col flex items-center bg-gray-600 justify-self-center rounded-lg ml-4 mr-4'>
                                    <p>No : {items.no}</p>
                                    <p>{t('question')} : {items.quiz}</p>
                                    <p>{t('right')} : {items.r}</p>
                                    <p>{t('wrong')} : {+items.no - +items.r}</p>
                                </div>
                         })
                    }
            </div>
            <div className='h-98'></div>
            <ModalSubmit open={open} handler={setOpen} score={data?.ability_measure} />
        </div>
    </>
}
Quiz.getLayout = function getLayout(page: ReactElement) {
    return (
        <div className='h-auto w-auto bg-[#D9D9D9]'>
            <Layout>
                {page}
            </Layout>
        </div>
    )
}
export async function getStaticPaths() {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const paths = levels.map((level) => ({ params: { level } }));
    return {
      paths: [
      ...paths.map((path) => ({ ...path, locale: 'en' })),
      ...paths.map((path) => ({ ...path})),
    ],
      fallback: false,
    };
  }

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return { 
        props: { 
            ...(await serverSideTranslations(locale as any, ["common"])), 
    } ,
};
  }

export default Quiz