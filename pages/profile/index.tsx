import { ReactElement, useEffect, useRef } from 'react'
import Layout from '../layout/layout'
import type { NextPageWithLayout } from '../_app'
import Image from "next/image"
import { Button, Select, Option, Alert } from '@material-tailwind/react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Cookie from 'universal-cookie'
import jwt from 'jsonwebtoken'
const api = require('../api/student')
const apiImg = require('../api/img')
import Loading from '../loading'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { User, Score } from '../../public/types';
const Chartprofile = dynamic(() => import('./Components/chart'), {
    ssr: false,
})
const Profile: NextPageWithLayout = () => {
    const router = useRouter()
    const cookies = new Cookie()
    const [input, setInput] = useState(true)
    const [data, setData] = useState<User>({
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
    });
    const [score, setScore] = useState<[Score]>([
        {
            level: '',
            score: 0,
        }
    ]);
    const [text, setText] = useState<String>('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [loading, setLoading] = useState(true)
    const [alertUploading, setAlertUploading] = useState(false)
    const [loadingApi, setLoadingApi] = useState(true)
    const { t } = useTranslation()
    useEffect(() => {
        !cookies.get('user') ? router.push('/') : getParamsData()
    }, [])
    useEffect(() => {
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
        setTel(data.tel)
        setText(data?.score.toString() ?? '')
    }, [data])
    const getParamsData = async () => {
        let name = cookies.get('user')
        let decode = jwt.decode(name) as { username: string }
        const data = await api.getParams(decode?.username, cookies.get('user'))
        let score = data?.history && data?.history.map((items: any) => ({ level: items.level, score: items.data?.at(-1).ability_measure }))
        setData(data)
        setScore(score)
        if (data) setLoading(false)
    }
    const btnSaveAs = async () => {
        setInput(!input)
        let scoreNew = score.length > 0 && score.find((x: any) => text == x.level) as any
        let obj = {
            id: data.id,
            name: data.name,
            first_name: firstName,
            last_name: lastName,
            email: email,
            tel: tel,
            level: scoreNew?.level,
            score: scoreNew?.score
        }
        await api.updateProFile(obj, cookies.get('user'))
    }
    const btnEdit = () => {
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
        setTel(data.tel)
        setInput(!input)
    }
    if (loading) return <Loading />
    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const uploadImg = async (e: any) => {
        setAlertUploading(true)
        setLoadingApi(true)
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append(data.id, file);
        const base64 = await convertBase64(file)
        if (await apiImg.uploadsImg({ image: base64, id: data.id }) === 200) {
            await getParamsData()
            setLoadingApi(false)
        }
    }
    const getImg = () => {
        return data?.image_url
    }
    return <div className='flex flex-col w-full pt-20 px-20 h-screen overflow-auto scrollbar-hide '>
        {alertUploading && <Alert className='mb-4' color={loadingApi ? 'amber' : 'green'}>{loadingApi ? 'กำลังโหลด...' : 'สำเร็จ'}</Alert>}
        <div className=' flex items-center border rounded-3xl bg-gray-200 drop-shadow-2xl w-fit md:w-full '>
            <div className='flex flex-wrap  items-center px-16 py-16 w-full   justify-between md:space-x-12 h-auto space-x-2 space-y-5 '>
                <div className=' h-full  flex-grow flex items-center justify-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] hover:visible '>
                    <div className=' h-44 w-44 bg-white flex items-center justify-center rounded-2xl text-black relative hover:cursor-pointer hover:opacity-80' >
                        {data.image_url ? <Image loader={() => getImg()} src={`${getImg()}`} alt='' fill className=' w-full h-full top-0 left-0 object-cover rounded-2xl bg-gray-200' />
                            : <Image src={`/person-png-icon-29.jpg`} alt='' fill className='w-full h-full top-0 left-0 object-cover rounded-2xl bg-gray-200' />}
                        <input type="file" id="my_file" accept="image/png, image/jpeg" className=' h-full opacity-0 cursor-pointer ' onChange={(e) => uploadImg(e)} />
                        <div className="absolute bottom-0 right-2 mb-2 ml-2 bg-gray-600 opacity-80 rounded-full w-8 h-8 flex items-center justify-center">
                            <FontAwesomeIcon icon={faCamera} />
                        </div>
                    </div>
                </div>
                <div className='flex-grow flex-col space-y-10 '>
                    <div className='flex w-full text-black items-center space-x-3' >
                        <label className='w-2/6'>{t('first_name')}</label>
                        <input type="text" className=' w-full h-14 flex items-center rounded-2xl pl-4 placeholder:text-white focus:outline-none
                       bg-gray-300 disabled:bg-white' disabled={input} placeholder="Firstname" name="first_name" onChange={(e) => setFirstName(e.target.value)}
                            value={firstName} />
                    </div>
                    <div className='flex w-full text-black items-center space-x-3' >
                        <label className='w-2/6'>{t('last_name')}</label>
                        <input type="text" className='w-full h-14 flex items-center rounded-2xl pl-4 placeholder:text-white focus:outline-none
                    bg-gray-300 disabled:bg-white' disabled={input} placeholder="Surname" name="last_name" onChange={(e) => setLastName(e.target.value)}
                            value={lastName} />
                    </div>
                    <div className='flex w-full text-black items-center space-x-3' >
                        <label className='w-2/6'>{t('email')}</label>
                        <input type="text" className=' w-full h-14 flex items-center rounded-2xl pl-4 placeholder:text-white focus:outline-none
                    bg-gray-300 disabled:bg-white' disabled={input} placeholder="email" name="email" onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                    </div>
                    <div className='flex w-full text-black items-center space-x-3' >
                        <label className='w-2/6'>{t('tel')}.</label>
                        <input type="tel" className=' w-full h-14 flex items-center rounded-2xl pl-4 placeholder:text-white focus:outline-none
                    bg-gray-300 disabled:bg-white' disabled={input} placeholder="tel." name="tel" onChange={(e) => setTel(e.target.value)}
                            value={tel} />
                    </div>
                </div>
                <div className='flex flex-grow justify-center items-center px-5'>
                    <div className='h-full w-fit px-2 py-2 rounded-lg space-y-2 border border-black'>
                        <p className='h-8 text-2xl text-black'>{t('score')} : {Number((typeof score == 'object' &&
                            score?.find((x) => x.level === text)?.score) ?? text).toFixed(2)}</p>
                        <Select variant="outlined" label={`${t('level')}`} disabled={input} onChange={(e) => setText(String(e))} >
                            {score && score.map((items, index: number) => {
                                return <Option className='font-kanit' value={items.level?.toString()} key={index}>{items.level}</Option>
                            })}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-10 space-x-2'>
            <Button color="gray" className='font-kanit' onClick={() => btnEdit()}>{t('edit')}</Button>
            {!input &&
                <Button color="gray" className='font-kanit' onClick={() => btnSaveAs()}>{t('saveas')}</Button>
            }
        </div>
        <div className=' my-16 flex-col h-auto w-[25rem] md:w-full '>
            <p className='text-3xl text-gray-500 drop-shadow-2xl '>{t('history')}</p>
            {data?.history && <>{
                data.history.map((item: any, index: number) => {
                    return <div key={index} className='flex flex-col w-full '>
                        <div className='h-16 bg-gray-400 mt-2 rounded-t-2xl  flex items-center justify-between px-10'>
                            <p className='text-2xl'>{item.level}</p>
                            <p></p>
                            <p className='text-2xl'>{t('complete')}</p>
                        </div>
                        <div className=' bg-gray-300 flex h-full items-center  rounded-b-2xl flex-wrap justify-center text-sm md:text-lg whitespace-nowrap py-5'>
                            <div className='w-[40rem] max-w-full  '>
                                <Chartprofile data={item.data} />
                            </div>
                            <div className='flex flex-col items-center space-y-5 w-1/4'>
                                <p className='bg-gray-400 w-fit px-5 h-8 flex items-center justify-center rounded-md  text-black'>{t('right')} : {item.data?.at(-1).r}</p>
                                <p className='bg-gray-400 w-fit px-5  h-8 flex items-center justify-center rounded-md  text-black'>{t('wrong')} : {item.data?.at(-1).no - item.data?.at(-1).r}</p>
                                <p className='bg-gray-400 w-fit px-5 h-8 flex items-center justify-center rounded-md  text-black'>{t('ability_measure')} : {item.data?.at(-1).ability_measure.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                })}

            </>}
        </div>
        <div className='h-96'></div>
    </div>
}

Profile.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Profile


export async function getStaticProps({ locale }: any) {
    return { props: { ...(await serverSideTranslations(locale, ["common"])), } }
}