import { Button } from "@material-tailwind/react";
const api = require('../api/auth')
import { useState } from "react";
import { Alert } from "@material-tailwind/react";
import { useRouter } from 'next/router'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import RequireAuthentication from "../permission/RequireAuthentication";
function Register() {
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [check, setCheck] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation()
    const [textErr, setTextErr] = useState({
        text: '',
        status: true
    })
    const router = useRouter()
    const btnSignup = async () => {
        setIsLoading(true)
        const body = {
            username: userName,
            password: passWord,
            email: email,
            tel: tel,
            firstName: firstName,
            lastName: lastName,
        }
        api.register(body).then((res: any) => {
            if (res.data.status === true) {
                setIsLoading(false)
                setCheck(true)
                setTextErr({
                    text: 'สมัครสมาชิกสำเร็จ',
                    status: true
                })
                setTimeout(() => {
                    router.push('/auth/login')
                }, 500);
            }
            if (res.data.status === false) {
                setIsLoading(false)
                setCheck(true)
                setTextErr({
                    text: 'ชื่อผู้ใช้มีอยู่ในระบบ',
                    status: false
                })
            }
        })
    }
    const checkInput = () => {
        return userName.trim().length === 0 || passWord.trim().length === 0 || email.trim().length === 0
            || tel.trim().length === 0 || !validateEmail(email) || firstName.trim().length === 0 || lastName.trim().length === 0
            || tel.trim().length < 10
    }
    const rexTel = (e: string) => {
        const rexMatch = e.match(/^0\d{0,9}/g) as [string]
        return rexMatch ? setTel(rexMatch[0]) : setTel('')
    }
    const validateEmail = (email: string) => {
        if(email.length === 0) return true
        var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return  re.test(email);
    }
   
    return <div className="overflow-y-auto bg-cover w-full bg-[url('/bg/blob-scene-haikei.svg')] h-screen flex items-center justify-center flex-col relative space-y-2">
        {isLoading && <Alert color={'amber'} className="w-full mb-4 " >กำลังโหลด...</Alert>}
        {check && <Alert color={textErr.status ? 'green' : 'red'} className="w-full " >{textErr.text}</Alert>}
        <div className=" shadow-lg rounded-lg overflow-hidden relative h-fit py-2 w-[20rem] md:max-w-full md:w-[25rem] bg-white flex flex-col justify-center items-center">
            <div className="animate-spin blur-lg shadow-2xl  delay-300 absolute  bg-blue-800  w-[10rem] h-[40rem] " style={{ animationDuration: "5s" }}>
            </div>
            <div className="border text-black z-10 rounded-lg h-fit w-[19rem]  md:max-w-full md:w-[24rem] bg-white flex flex-col justify-center items-center space-y-3">
                <div className="my-4 w-full h-auto space-y-5 md:space-y-6  mx-4 text-md md:text-lg">
                    <p className="text-xl   text-black text-center">{t('signup')}</p>
                    <div className="flex ml-2 justify-start items-center space-x-3 relative">
                        <p className=" whitespace-nowrap text-black">{t('username')}</p>
                        <input type="text" className=" bg-white border border-black text-black absolute left-[90px] md:left-[120px]  pl-1 h-[2rem] font-akshar  rounded-sm outline-none" placeholder={`${t("username")}`}
                            onChange={(e) => setUserName(e.target.value)} value={userName} />
                    </div>
                    <div className="flex ml-2 justify-start items-center space-x-3 relative">
                        <p className="whitespace-nowrap text-black">{t('password')}</p>
                        <input type="password" className="bg-white border border-black text-black absolute left-[90px] md:left-[120px]  pl-1 h-[2rem] font-akshar   rounded-sm outline-none" placeholder={`${t("password")}`}
                            onChange={(e) => setPassWord(e.target.value)} value={passWord} />
                    </div>
                    <div className="flex ml-2 justify-start items-center space-x-3 relative">
                        <p className="whitespace-nowrap text-black">{t('first_name')}</p>
                        <input type="email" className={`bg-white border border-black text-black absolute left-[90px] md:left-[120px]  pl-1 h-[2rem] font-akshar   rounded-sm outline-none `} placeholder={`${t("first_name")}`}
                            onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    </div>
                    <div className="flex ml-2 justify-start items-center space-x-3 relative">
                        <p className="whitespace-nowrap text-black">{t('last_name')}</p>
                        <input type="email" className={`bg-white border border-black text-black absolute left-[90px] md:left-[120px]  pl-1 h-[2rem] font-akshar   rounded-sm outline-none $`} placeholder={`${t("last_name")}`}
                            onChange={(e) => setLastName(e.target.value)} value={lastName} />
                    </div>
                    <div className="flex ml-2 justify-start items-center space-x-3 relative">
                        <p className="whitespace-nowrap text-black">{t('email')}</p>
                        <input type="email" className={`bg-white border  text-black absolute left-[90px] md:left-[120px]  pl-1 h-[2rem] font-akshar   rounded-sm outline-none ${!validateEmail(email) ? 'border-red-600' : 'border-black'}`} placeholder={`${t("email")}`}
                            onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="flex ml-2 justify-start items-center space-x-3 relative">
                        <p className="whitespace-nowrap text-black">{t('tel')}.</p>
                        <input type="tel" className="bg-white border border-black text-black absolute left-[90px] md:left-[120px]  pl-1 h-[2rem] font-akshar   rounded-sm outline-none" placeholder={`${t("tel")}`}
                            onChange={(e) => rexTel(e.target.value)} value={tel} />
                    </div>
                    <div className="w-full text-center ">
                        <button className="h-[2rem] rounded-lg w-fit px-5
                           border shadow-md ease-in-out duration-300 transition 
                            disabled:shadow-pink-800 disabled:cursor-not-allowed
                           hover:shadow-blue-600" disabled={checkInput()}
                            onClick={() => btnSignup()}>{t("signup")}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
const authRegister = () => <RequireAuthentication><Register /></RequireAuthentication>
export default authRegister
export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    }
}