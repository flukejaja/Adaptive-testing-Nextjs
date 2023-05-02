import { useState } from "react"
const api = require('../api/auth')
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie';
import { encodeString } from "../../functions/encode";
import { Alert } from "@material-tailwind/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RequireAuthentication from "../permission/RequireAuthentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
function Login() {
    const cookies = new Cookies();
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [checkErr, setCheckErr] = useState(false)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    // const [mouseOverSet, setMouseOverSet] = useState(false);
    const { t } = useTranslation()
    const btnSubmit = async () => {
        setIsLoading(true)
        setCheckErr(true)
        let res = await api.login({ username: userName, password: passWord })
        if (res.data?.status === false) {
            setIsLoading(false)
        }
        if (res.data?.status === undefined) {
            Promise.resolve()
                .then(() => cookies.set('id', encodeString(res.data.user_id)))
                .then(() => cookies.set("user", res.data.data.token))
                .then(() => {
                    router.push('/')
                })
        }
    }
    return <div className="bg-cover w-full bg-[url('/bg/blob-scene-haikei.svg')] h-screen flex items-center justify-center flex-col relative">
        {checkErr && <Alert className="w-full md:w-[40rem] fixed inset-y-0 h-fit top-4 z-20" color={isLoading ? "amber" : "red"}>
            {isLoading ? 'กำลังโหลด...' : 'กรุณาเช็ค รหัสผ่าน หรือ ชื่อผู้ใช้ไม่ถูกต้อง'}
        </Alert>}
        <div className=" shadow-lg rounded-lg overflow-hidden relative h-fit py-2 w-[20rem] md:max-w-full md:w-[25rem] bg-white flex flex-col justify-center items-center">
            <div className="animate-spin blur-lg shadow-2xl  delay-300 absolute  bg-pink-800  w-[16rem] h-[40rem] " style={{ animationDuration: "5s" }}>
            </div>
            <div className="border text-black z-10 rounded-lg h-[20rem] w-[19rem]  md:max-w-full md:w-[24rem] bg-white flex flex-col justify-center items-center space-y-3">
                <p className="text-xl text-black text-center">{t("signin")}</p>
                <div className="space-x-2 relative w-full px-4">
                    <FontAwesomeIcon icon={faUser} className="w-3"/>
                    <label>{t("username")}</label>
                    <input type="text" className="font-akshar absolute h-[2rem] left-[90px] md:left-[120px] rounded-sm outline-none bg-white border border-black text-black pl-2"
                        onChange={(e) => setUserName(e.target.value)} value={userName} placeholder={`${t("username")}`} />
                </div>
                <span className="space-x-2 relative w-full px-4">
                    <FontAwesomeIcon icon={faKey} className="w-3"/>
                    <label >{t("password")}</label>
                    <input type="password" className="font-akshar absolute h-[2rem] left-[90px] md:left-[120px] rounded-sm outline-none bg-white border border-black text-black pl-2" placeholder={`${t("password")}`}
                        onChange={(e) => setPassWord(e.target.value)} value={passWord} />

                </span>
                <div className="h-14 flex items-center">
                    <button className="h-[2rem] rounded-lg w-fit px-5
                           border shadow-md ease-in-out duration-300 transition 
                           hover:shadow-blue-600" onClick={() => btnSubmit()}>{t("signin")}</button>
                </div>
                <div className="flex items-center">
                    <Link href={'/forgot'}>
                        <button className="h-[2rem] rounded-lg w-fit px-5
                           border shadow-md ease-in-out duration-300 transition 
                           hover:shadow-red-600" >{t("forgot_password")}</button>
                    </Link>
                </div>
            </div>
        </div>

    </div>
}
const authLogin = () => <RequireAuthentication><Login /></RequireAuthentication>
export default authLogin
export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    }
}