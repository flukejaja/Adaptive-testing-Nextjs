import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function Navbar(props: { name: string, role: string }) {
    const cookie = new Cookies()
    const router = useRouter()
    const { asPath } = useRouter();
    const [check, setCheck] = useState(true)
    const { t } = useTranslation();
    const btnSignOut = async () => {
        try {
            await Promise.all([
                cookie.remove('user'),
                cookie.remove('id')
            ]);
            router.push('/');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    const { locale, locales } = useRouter() as any
    useEffect(() => {
        typeof props.role === "string" ? setCheck(false) : setCheck(true)
    }, [props.role])

    return (<div className="h-20 w-full bg-[#ffffff] flex justify-around px-10 ">
        <div className={`md:flex h-full  items-center flex-grow text-3xl pl-4 text-black hidden `}>
            <Link href={'/'}>
                <p className="font-akshar uppercase text-sm md:text-xl lg:text-2xl ">Adaptive testing</p>
            </Link>
        </div>
        <div className="flex h-full items-center flex-grow "></div>
        <div className="flex h-full flex-grow  justify-center items-center space-x-2 md:space-x-5 ">
            <p className="h-14 flex items-center text-black font-kanit font-bold text-sm md:text-base">{props.name ? props.name : ''}</p>
            <div className="bg-gray-300 flex rounded-md h-6  items-center ">
                {
                    locales.map((l: any, index: number) => {
                        return <p key={index} className={`flex items-center justify-center font-akshar
                        transition h-8 w-8 delay-150 hover:duration-150 ease-in-out  text-center rounded-md 
                        ${l === locale ? ' text-black bg-pink-400 shadow-lg shadow-pink-300/50' : 'text-blue-800'}`}>
                            <Link href={`${asPath}`} locale={l}>
                                {l.toUpperCase()}
                            </Link>
                        </p>
                    })
                }
            </div>

            {check ? <>
                <Link href='/login'>
                    <div className="h-14 flex items-center text-xs md:text-base w-fit">
                        <button className="h-[2rem] text-black rounded-lg  px-5 whitespace-nowrap
                        border shadow-md ease-in-out duration-300 transition 
                        hover:shadow-red-600">{t("signin")}</button>
                    </div>
                </Link>
                <Link href='/register'>
                    <div className="h-14 flex items-center md:text-base text-xs w-fit">
                        <button className="h-[2rem] text-black rounded-lg  px-5 whitespace-nowrap
                        border shadow-md ease-in-out duration-300 transition 
                        hover:shadow-red-600">{t("signup")}</button>
                    </div>
                </Link>
            </>
                :
                <div className="h-14 flex items-center md:text-base text-xs w-fit">
                    <button className="h-[2rem] text-black rounded-lg px-5 whitespace-nowrap
                        border shadow-md ease-in-out duration-300 transition 
                        hover:shadow-red-600" onClick={() => btnSignOut()}>{t("signout")}</button>
                </div>
            }
        </div>
    </div >)
}
