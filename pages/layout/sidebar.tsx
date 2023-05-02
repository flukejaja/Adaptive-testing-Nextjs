
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSearch, faPlusCircle, faSearchPlus, faFilePen } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Sidebar(props: any) {
    const { t } = useTranslation()
    const cookies = new Cookies();
    const [over, setOver] = useState(false);
    const [showSubtable, setShowSubtable] = useState(false);
    const [checkRole, setCheckRole] = useState(false);
    const [checkCookies, setCheckCookies] = useState(false)

    let exampleTable = [{
        name: "edit_example",
        options: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    }]
    useEffect(() => {
        if (over === false) setShowSubtable(false);
    }, [over])

    useEffect(() => {
        if (props.role === "user") {
            setCheckRole(false)
            setCheckCookies(true)
        }
        if (props.role === "admin") {
            setCheckRole(true)
            setCheckCookies(true)
        }
        if (cookies.get('user') === undefined && props.role === undefined) {
            setCheckRole(false)
            setCheckCookies(false)
        }
    }, [props.role])

    return (
        <div className="h-full w-[4%] px-5 bg-[#fffefe] flex flex-col space-y-3 hover:w-56 
        translate-all duration-150 z-[100]"
            onMouseOver={() => setOver(true)}
            onMouseOut={() => setOver(false)}>
            <div className="h-40"></div>
            <Link href="/">
                <div className=" transition ease-in-out  hover:translate-y-1 hover:scale-110 duration-200
                h-12  flex items-center justify-center text-xl w-full hover:bg-gray-600 text-black rounded-lg
                hover:drop-shadow-2xl bg-white
            space-x-3">
                    <FontAwesomeIcon className="text-2xl text-gray-700 " icon={faHome} />
                    {over && <p className="text-black  text-sm md:text-lg whitespace-nowrap">{t('home')}</p>}
                </div>
            </Link>
            {(checkCookies && !checkRole) && <Link href="/profile">
                <div className=" transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200
                h-12  flex items-center justify-center text-xl w-full hover:bg-gray-600 text-black rounded-lg
                hover:drop-shadow-2xl bg-white
            space-x-3">
                    <FontAwesomeIcon className="text-2xl text-gray-700 " icon={faUser} />
                    {over && <p className="text-black  text-sm md:text-lg whitespace-nowrap">{t('profile')}</p>}
                </div>
            </Link>
            }
            {!checkRole && <Link href="/searchprofile">
                <div className=" transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200
                h-12  flex items-center justify-center text-xl w-full hover:bg-gray-600 text-black rounded-lg
                hover:drop-shadow-2xl bg-white
            space-x-3">
                    <FontAwesomeIcon className="text-2xl text-gray-700 " icon={faSearch} />
                    {over && <p className="text-black  text-sm md:text-lg whitespace-nowrap">{t('research_profile')}</p>}
                </div>
            </Link>}
            {checkRole ? <>
                <Link href="/create">
                    <div className=" transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200
                h-12  flex items-center justify-center text-xl w-full hover:bg-gray-600 text-black rounded-lg
                hover:drop-shadow-2xl bg-white
            space-x-3">
                        <FontAwesomeIcon className="text-2xl text-gray-700 " icon={faPlusCircle} />
                        {over && <p className="text-black  text-sm md:text-lg whitespace-nowrap">{t('create')}</p>}
                    </div>
                </Link>
                <Link href="/adminsearch">
                    <div className=" transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200
                h-12  flex items-center justify-center text-xl w-full hover:bg-gray-600 text-black rounded-lg
                hover:drop-shadow-2xl bg-white
            space-x-3">
                        <FontAwesomeIcon className="text-2xl text-gray-700 " icon={faSearchPlus} />
                        {over && <p className="text-black  text-sm md:text-lg whitespace-nowrap">{t('research_profile')}</p>}
                    </div>
                </Link>
                <div className={`transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200
                 flex items-center justify-center text-xl w-full hover:bg-gray-600 text-black rounded-lg
                hover:drop-shadow-2xl bg-white space-x-3  `}>
                    {!over && <FontAwesomeIcon className="text-2xl text-gray-700 " icon={faFilePen} />}
                    {over && <div className="w-full rounded-br-lg cursor-pointer" >
                        {exampleTable.map((items: any, index: any) => {
                            return <div key={index} className="flex-col ">
                                <p className="h-12 flex items-center justify-center text-sm md:text-lg whitespace-nowrap" onClick={() => setShowSubtable(!showSubtable)}>
                                    <FontAwesomeIcon className="text-2xl text-gray-700 mr-2" icon={faFilePen} />
                                    {(t(`${items.name}`))}</p>
                                {<div className={`transition-all ease-in-out duration-300 delay-400 h-full ${showSubtable ? 'opacity-100' : 'opacity-0'}
                            ${showSubtable ? 'h-48' : 'h-0'}`}>{
                                        showSubtable && items.options.map((subItems: any, index: number) => {
                                            return <div key={index}>
                                                <Link href={`/editexam/${subItems}`}>
                                                    <div className={`text-sm md:text-lg font-akshar h-8 border border-t space-y-4 w-full flex justify-center items-center bg-gray-300 hover:bg-gray-500 ${subItems === "C2" ? 'rounded-br-lg' : ''}`} >
                                                        {subItems}
                                                    </div>
                                                </Link>
                                            </div>
                                        })
                                    }</div>
                                }
                            </div>
                        })}
                    </div>
                    }
                </div>
            </> : null}
        </div>)
}
// export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
//     props: {
//         ...(await serverSideTranslations(locale as string, ['common']))
//     }
// })