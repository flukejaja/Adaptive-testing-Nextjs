import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from "react"
const api = require('../api/auth')
import { Alert, Button } from "@material-tailwind/react";
import { decodeString, encodeString } from "../../functions/encode"
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RequireAuthentication from '../permission/RequireAuthentication';
type OtpTuple = [number, number, number, number, number, number];
function Forgot() {
    const [page, setPage] = useState(1)
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [checkOtp, setCheckOtp] = useState<OtpTuple>([1, 2, 3, 4, 5, 6])
    const [otp, setOtp] = useState('')
    const inputRefs = useRef([]) as any
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [alCheckEmail, setAlCheckEmail] = useState(false)
    const { t } = useTranslation()
    let dataUser = { username: username, email: email }
    const summit = async (index: number) => {
        let getotp = await api.forgot(dataUser)
        if (getotp.otp) {
            setOtp(getotp.otp)
            setAlCheckEmail(false)
            setPage(index)
        } else {
            setAlCheckEmail(true)
        }
    }
    const handleInputChange = (event: any, index: number) => {
        const { value } = event.target;
        const nextIndex = index + 1;
        if (value.length === 1 && nextIndex < inputRefs.current.length) {
            inputRefs.current[nextIndex].focus();
        }
        checkOtp[index] = value
        setCheckOtp([...checkOtp])
    };

    const summitRestPassword = async (pw: string) => {
        if (pw === checkPassword) {
            let body = {
                username: username,
                password: password,
                hash: encodeString('hiwkao')
            }
            let dataresponse = await api.resetPassword(body)
            if (dataresponse.message === "ok") {
                router.push('/auth/login')
            }
        }
    }
    useEffect(() => {
        if (otp) {
            if (checkOtp.join('') === decodeString(otp)) setPage(3)
        }
    }, [checkOtp])
    return <div className=" space-y-2 bg-cover w-full bg-[url('/bg/blob-scene-haikei.svg')] h-screen flex items-center justify-center flex-col relative">
        {alCheckEmail && <Alert color="red" >กรุณาเช็ค ชื่อผู้ใช้ หรือ อีเมล ...</Alert>}
        <div className=" shadow-lg rounded-lg overflow-hidden relative h-fit py-2 w-[20rem] md:max-w-full md:w-[25rem] bg-white flex flex-col justify-center items-center">
            <div className="animate-spin blur-lg shadow-2xl  delay-300 absolute  bg-red-800  w-[10rem] h-[40rem] " style={{ animationDuration: "5s" }}>
            </div>
            <div className=" text-black z-10 rounded-lg h-[20rem] w-[19rem]  md:max-w-full md:w-[24rem] bg-white flex flex-col justify-center items-center space-y-3">
                {page === 1 ? <div className=" h-full rounded-lg flex flex-col justify-center w-full">
                    <div className="h-14 mt-2">
                        <p className=" text-black text-center">{t('forgot_password')}</p>
                    </div>
                    <div className="space-x-5 px-4 relative flex justify-start items-center  ">
                        <p >{t('username')}</p>
                        <input type="text" className="absolute h-[2rem] left-[90px] md:left-[120px] bg-white border border-black text-black font-akshar pl-2  rounded-md outline-none" placeholder={`${t("username")}`}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="h-14"></div>
                    <div className="space-x-5 px-4 relative">
                        <label >{t('email')}</label>
                        <input type="text" className="absolute h-[2rem] left-[90px] md:left-[120px] bg-white border border-black text-black font-akshar pl-2  rounded-md outline-none" placeholder={`${t("email")}`}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="h-14"></div>
                    <div className=" w-full flex justify-center">
                        <button className="h-[2rem] rounded-lg w-fit px-5
                           border shadow-md ease-in-out duration-300 transition 
                            disabled:shadow-pink-800 disabled:cursor-not-allowed
                           hover:shadow-blue-600"
                            onClick={() => summit(2)}>{t('send')}</button>
                    </div>
                </div> : <></>
                }
                {
                    page === 2 ? <div className="relative h-full  rounded-lg flex flex-col justify-center ">
                        <div className="h-14"></div>
                        <p className="text-center mb-10 text-2xl">OTP</p>
                        <div className="text-white font-akshar  pl-14 pr-14 space-x-5 flex justify-center items-center">
                            {[1, 2, 3, 4, 5, 6].map((_, index) => {
                                return <div key={index} className="flex justify-start h-full">
                                    <input type="text" className="w-6 h-6 md:w-10 md:h-10 outline-none text-center rounded-md  bg-white border border-black text-black font-akshar" maxLength={1}
                                        pattern="\d"
                                        onChange={(event) => handleInputChange(event, index)}
                                        ref={(input) => (inputRefs.current[index] = input)} />
                                </div>
                            })}
                        </div>
                        <div className="h-14"></div>
                        <div className="h-14"></div>
                        <p className='text-2xl text-center'>{t('please_check_your_email')}</p>
                    </div> : <></>}
                {page === 3 ? <div className="relative h-full rounded-lg flex flex-col justify-center w-full">
                    <div className="h-14"></div>
                    <div className=" space-x-5 relative px-4">
                        <label >{t('new_password')}</label>
                        <input type="password" className="bg-white border border-black text-black font-akshar absolute h-[2rem] left-[90px] md:left-[120px] pl-2 rounded-md outline-none"
                            placeholder="New password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="h-14"></div>
                    <div className=" space-x-5 relative px-4">
                        <label className='whitespace-nowrap' >{t('confirm_password')}</label>
                        <input type="password" className={`bg-white border  text-black font-akshar absolute h-[2rem] left-[90px] md:left-[120px] pl-2 rounded-md outline-none ${password !== checkPassword ? 'border-4 border-red-600' : 'border-black'} `}
                            placeholder="Confirm" onChange={(e) => setCheckPassword(e.target.value)} />
                    </div>
                    <div className="h-14"></div>
                    <div className=" w-full flex justify-center">
                        <button className="h-[2rem] rounded-lg w-fit px-5
                           border shadow-md ease-in-out duration-300 transition 
                            disabled:shadow-pink-800 disabled:cursor-not-allowed
                           hover:shadow-blue-600"
                            onClick={() => summitRestPassword(password)} disabled={password !== checkPassword || password.length < 1}>{t('send')}</button>
                    </div>
                </div> : <></>}
            </div>
        </div>
    </div>
}
const authForgot = () => <RequireAuthentication><Forgot /></RequireAuthentication>
export default authForgot
export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    }
}