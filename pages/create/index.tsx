import { Button } from '@material-tailwind/react'
import { Select, Option } from "@material-tailwind/react";
import { ReactElement, useState } from 'react'
import Layout from '../layout/layout'
import type { NextPageWithLayout } from '../_app'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RequireAuthenticationAdmin from '../permission/RequireAuthAdmin';
import { useTranslation } from 'next-i18next';
const api = require('../api/example')

const Create: NextPageWithLayout = () => {
    const dataKey = [{
        no: 1,
        sub_id: "",
        question_level: 1,
        question: "",
        answer: "",
        level: "",
        status: false,
        choice: [
            {
                choice: "A",
                sub_answer: "",
    
            },
            {
                choice: "B",
                sub_answer: "",
    
            },
            {
                choice: "C",
                sub_answer: "",
    
            },
            {
                choice: "D",
                sub_answer: "",
    
            }
        ]
    }]
    const [data, setData] = useState(dataKey)
    const { t } = useTranslation()
    const btnAddQuestion = (element: string) => {
        if (element === '+' && data.length < 5) {
            data.push({
                no: data.length + 1,
                sub_id: "",
                question_level: 2,
                question: "",
                answer: "",
                level: "",
                status: false,
                choice: [{
                    choice: "A",
                    sub_answer: "",

                },
                {
                    choice: "B",
                    sub_answer: "",

                },
                {
                    choice: "C",
                    sub_answer: "",

                },
                {
                    choice: "D",
                    sub_answer: "",

                }]
            })
            setData([...data])
        }
        if (element === '-' && data.length > 1) {
            data.pop()
            setData([...data])
        }
    }
    const changeText = (element: any, index: number, subIndex?: number) => {
        if (subIndex !== undefined) {
            data[index].choice[subIndex].sub_answer = element.target.value
        } else {
            data[index].question = element.target.value
        }
        setData([...data])
    }
    const changeData = (index: number, e: any, key: string) => {
        if (key === 'question_level') data[index].question_level = Number(e)
        if (key === 'Level') data[index].level = e
        if (key === 'Answer') data[index].answer = e

    }
    const submit = async () => {
        data.forEach((x: any) =>
            x.status = x.answer == "" || x.question_level == "" || x.question == "" || x.level == "" ? true : false
        )
        if (data.every(x => x.status === false)) {
            let result = api.addExample(data)
            if (result) setData([])
        } else {
            setData([...data])
        }
    }
    return <>
        <div className='w-full flex-col pl-20 pr-20 overflow-auto h-screen space-y-6 scrollbar-hide relative text-white'>
            <button className='disabled:bg-red-600 bg-gray-400 outline-none text-black w-11 h-11 text-4xl rounded-full absolute inset-y-0  left-5 top-10 '
                disabled={data.length >= 5} onClick={() => btnAddQuestion('+')} color="gray">+</button>
            <button className='bg-gray-400 outline-none text-black w-11 h-11 text-4xl rounded-full absolute inset-y-0  left-5 top-20 '
                onClick={() => btnAddQuestion('-')} color="gray">-</button>
            {
                data.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className='text-2xl text-black '>No.{item.no}</p>
                            <div className={`h-[24rem] bg-gray-400 rounded-lg flex-col flex items-center max-h-full mb-4 ${item?.status == true ? 'border border-red-600' : ''}`}>
                                <div className='w-full h-14 flex pt-4 pl-4'>
                                    <p className='text-2xl mr-3 text-center pt-2'>{t('question')} :</p>
                                    <input type="text" className=" bg-white text-black w-5/6 h-full rounded-lg outline-none pl-4 " value={item.question}
                                        onChange={(e) => changeText(e, index)} />
                                </div>
                                <div className='w-full h-full flex'>
                                    <div className='flex-col w-full flex items-center justify-center space-y-6'>
                                        {item.choice.map((subItems, subIndex) => {
                                            return <div className='w-full h-12 flex items-center justify-center' key={subIndex}>
                                                <p className='h-full text-2xl w-24 text-center pt-2 mr-auto'>{subItems.choice} :</p>
                                                <input type="text" className='bg-white text-black  w-full h-full rounded-lg outline-none pl-4' value={subItems.sub_answer}
                                                    onChange={(e) => changeText(e, index, subIndex)} />
                                            </div>
                                        })
                                        }
                                    </div>
                                    <div className='flex-col w-full flex items-center justify-center space-y-8'>
                                        <div className='border px-2 rounded-lg bg-white py-2'>
                                            <label className='text-black'>{t('question_level')}</label>
                                            <Select label="เลือกเลเวลข้อสอบ" className='font-bold font-kanit' color='red' onChange={(e) => changeData(index, e, 'question_level')}>
                                                <Option className='font-kanit' value='1'>1</Option>
                                                <Option className='font-kanit' value='2'>2</Option>
                                                <Option className='font-kanit' value='3'>3</Option>
                                            </Select>
                                        </div>
                                        <div className='border px-2 rounded-lg bg-white py-2'>
                                            <label className='text-black'>{t('level')}</label>
                                            <Select label="เลเวล" className='font-bold font-kanit' onChange={(e) => changeData(index, e, 'Level')}>
                                                <Option className='font-kanit' value='A1'>A1</Option>
                                                <Option className='font-kanit' value='A2'>A2</Option>
                                                <Option className='font-kanit' value='B1'>B1</Option>
                                                <Option className='font-kanit' value='B2'>B2</Option>
                                                <Option className='font-kanit' value='C1'>C1</Option>
                                                <Option className='font-kanit' value='C2'>C2</Option>
                                            </Select>
                                        </div>
                                        <div className='border px-2 rounded-lg bg-white py-2'>
                                            <label className='text-black'>{t('answer')}</label>
                                            <Select label="คำตอบ" className='font-bold font-kanit' onChange={(e) => changeData(index, e, 'Answer')}>
                                                <Option className='font-kanit' value='A'>A</Option>
                                                <Option className='font-kanit' value='B'>B</Option>
                                                <Option className='font-kanit' value='C'>C</Option>
                                                <Option className='font-kanit' value='C'>D</Option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className='w-full h-14 mt-20 flex justify-center'>
                <button className='h-full w-14 bg-red-500 rounded-full ' onClick={() => submit()}>{t('send')}</button>
            </div>
        </div>
    </>
}
Create.getLayout = function getLayout(page: ReactElement) {
    return (
        <RequireAuthenticationAdmin>
            <Layout>
                {page}
            </Layout>
        </RequireAuthenticationAdmin>
    )
}

export async function getStaticProps({ locale }: any) {
    return { props: { ...(await serverSideTranslations(locale, ["common"])), } }
}

export default Create
