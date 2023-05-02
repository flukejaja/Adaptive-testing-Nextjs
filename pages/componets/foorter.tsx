import Link from "next/link"
import { Avatar } from "@material-tailwind/react"
import Image from "next/image"
import { useTranslation } from "next-i18next";
export default function Foorterhome() {
    const { t } = useTranslation()
    return (<div className='h-[40rem] w-full'>
        <h1 className="text-lg md:text-4xl mb-1 text-black">{t('team')}</h1>
        <div className="w-5/6 bg-black h-2 mb-6"></div>
        <div className="flex flex-wrap justify-center space-x-4 w-5/6 font-akshar">
            <div className="flex-col justify-center ">
                <div
                    style={{
                        width: 200,
                        height: 200,
                        position: "relative",
                    }} >
                    <Image
                        src='/im-491405.jpg'
                        alt="photo"
                        layout="fill"
                        className="rounded-full w-full"
                    />
        
                </div>
                <p className="text-2xl text-black text-center">Fluke jaja</p>
            </div>
            <div className="flex-col justify-center ">
                <div
                    style={{
                        width: 200,
                        height: 200,
                        position: "relative",
                    }}>
                    <Image
                        src='/VDA2OKJUXJDSRNL76H44LQFNWY.jpg'
                        alt="photo"
                        layout="fill"
                        className="rounded-full w-full"
                    />
                </div>
                <p className="text-2xl text-black text-center ">Grittin jaja</p>
            </div>
        </div>
    </div>
    )
}