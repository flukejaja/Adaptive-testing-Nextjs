import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import Layout from '../layout/layout'
import type { NextPageWithLayout } from '../_app'
import { useState, useRef } from 'react'
import { Button, Input, Alert } from '@material-tailwind/react'
import Modaldelete from './Components/modalDelete'
const api = require('../api/example')
import Cookies from 'universal-cookie'
import Loading from '../loading'
import jwt from "jsonwebtoken";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import RequireAuthenticationAdmin from '../permission/RequireAuthAdmin'
interface statusCheck {
    status: boolean,
    no: number
}
const Editexam: NextPageWithLayout = () => {
    const router = useRouter()
    const [data, setData] = useState([]) as any
    const [subData, setSubData] = useState([]) as any
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false);
    const [dataDel, setDataDel] = useState({})
    const [loading, setLoading] = useState(true)
    const [modalCallback, setModalCallback] = useState(false)
    const [checkUpdate, setCheckUpdate] = useState<statusCheck>({ status: false, no: 0 })
    const { id } = router.query
    const cookie = new Cookies()
    const myMessage = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()
    useEffect(() => {
        if (id) getExample()
    }, [id])
    const getExample = async () => {
        let arr = await api.getParams(id, cookie.get('user'))
        arr.forEach((element: any) => {
            element.show = true
        });
        setData(arr)
        setSubData(arr)
        if (arr.length > 0) setLoading(false)
        if (arr.length === 0) setLoading(true)
    }
    useEffect(() => {
        const filter = subData.filter((x: any) => x.question.includes(text))
        setData(filter)
    }, [text])
    useEffect(() => {
        if (modalCallback) getExample()
    }, [modalCallback])
    const btnDelete = (items: any) => {
        setOpen(!open)
        setModalCallback(false)
        setDataDel({
            question: items.question,
            id: items.id,
        })
    }

    const editexample = (index: number, items: any) => {
        data[index].show = !items
        setData([...data])
        if (!items) {
            api.update(data[index])
            setCheckUpdate({
                status: true,
                no: data[index].sub_id
            })
            if (myMessage.current !== null) {
                myMessage.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    if (loading) {
        return <Loading />
    }
    const changeData = (index: number, e: any, subIndex?: number) => {
        if (subIndex !== undefined) {
            data[index].choice[subIndex].sub_answer = e.target.value
        } else {
            data[index].question = e.target.value
        }
        setData([...data])
    }

    return <div className='h-screen flex-col flex items-center space-y-6 overflow-auto scrollbar-hide text-white' >
        <div className='bg-gray-800 h-44 rounded-lg flex items-center justify-center w-full' ref={myMessage} >
            <p className='text-6xl font-akshar'>{id}</p>
        </div>
        <div className='h-24 w-full pl-20 pr-20' >
            <Input label="Search" onChange={(e) => setText(e.target.value)} />
        </div>
        {checkUpdate.status ? <Alert color="green" >แก้ไข No.{checkUpdate.no} สำเร็จ </Alert> : null}
        <div className='flex-col space-y-6 w-[65rem] pl-10 pr-10 max-w-full rounded-b-lg'>
            {
                data.map((item: any, index: number) => {
                    return (
                        <div className={`flex-col  w-full  rounded-l `} key={item.id}>
                            <div className="bg-gray-800  rounded-t-md  h-24  flex items-center justify-center cursor-pointer w-full group relative break-all">
                                <span className='hidden group-hover:block absolute z-10 bottom-24 left-4 bg-gray-dark h-8 rounded px-2 py-1 text-sm whitespace-nowrap bg-gray-700
                                 text-white pt-2'>NO.{item.sub_id}{" "}{item.question}</span>
                                {item.show ? <p className='break-all h-full rounded-lg flex items-center w-full text-xl pl-10 pr-20 disabled:bg-gray-800  placeholder:text-white 
                                focus:outline-none break-words'>No.{item.sub_id}{" "}{item.question}</p>
                                    : <input className='break-all  h-full rounded-lg bg-gray-600 w-full text-xl pl-10 pr-20 disabled:bg-gray-800  placeholder:text-white 
                                focus:outline-none break-words' type='text' disabled={item.show} placeholder={item.question}
                                        value={item.question} onChange={(e) => changeData(index, e)} />
                                }
                            </div>
                            <div className={`transition-all ease-in-out duration-300 delay-200 bg-gray-400 rounded-b-lg`}>
                                {
                                    item.choice.map((subItems: any, subIndex: number) => {
                                        return (
                                            <div key={subIndex} className={`h-12 bg-gray-400 flex items-center pl-4 justify-start border-b w-full`}>
                                                <input className='w-24 text-center bg-gray-400 placeholder:bg-gray-400 placeholder:text-white focus:outline-none' type='text' disabled={true}
                                                    value={subItems.choice}
                                                    placeholder={subItems.choice} />
                                                <input className='w-full break-all h-full pl-4 rounded-lg bg-gray-800 disabled:bg-gray-400 placeholder:text-white focus:outline-none' type='text' disabled={item.show}
                                                    value={subItems.sub_answer}
                                                    placeholder={subItems.sub_answer} onChange={(e) => changeData(index, e, subIndex)} />
                                            </div>
                                        )
                                    })
                                }
                                <label className='h-full flex w-full items-center text-xl pl-4'>
                                    {t('level')} : <input className=' bg-gray-400 h-10 text-center text-xl' disabled={true} value={item.question_level} />
                                </label>
                                <label className='h-full flex w-full items-center text-xl pl-4'>
                                    {t('answer')} : <input className=' bg-gray-400 h-10 text-center text-xl' disabled={true} value={item.answer} />
                                </label>
                                <Button color="gray" className='w-full font-kanit' id={item.show ? 'Edit' : 'Save'} onClick={(e) => editexample(index, item.show)}>{item.show ? t('edit') : t('saveas')}</Button>
                                <Button color="red" className='w-full font-kanit' onClick={() => btnDelete(item)}>{t('delete')}</Button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className='h-20'></div>
        <Modaldelete open={open} handler={setOpen} name={dataDel} callBack={setModalCallback} function={getExample} />
    </div>
}
Editexam.getLayout = function getLayout(page: ReactElement) {
    return (
            <RequireAuthenticationAdmin>
                <Layout>
                {page}
                </Layout>
            </RequireAuthenticationAdmin>
    )
}
export default Editexam
export async function getStaticPaths() {
    const ids = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const paths = ids.map((id) => ({ params: { id } }));
    return {
        paths: [
            ...paths.map((path) => ({ ...path, locale: 'en' })),
            ...paths.map((path) => ({ ...path })),
        ],
        fallback: false,
    };
}
export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    }
}