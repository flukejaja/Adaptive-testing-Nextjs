import Link from "next/link"
import { useTranslation } from "next-i18next";
export default function Bodyhome() {
  const { t } = useTranslation()
  return (<div className='h-60 w-full'>
    <h1 className="text-lg md:text-4xl text-black">{t('examination')}</h1>
    <div className="w-5/6 bg-black h-2 mb-4 "></div>
    <div className="bg-gray-400 w-5/6 h-[8rem] md:h-[12rem] rounded-xl relative  flex items-center shadow-xl shadow-red-500/50
    hover:shadow-2xl hover:shadow-black duration-500">
      <p className="text-lg whitespace-nowrap md:text-2xl text-black pl-4 text-center w-full bg-white rounded-xl h-full flex items-center justify-center">{t('computing_science')}</p>
      <Link href='/listquiz' className="h-full w-[10rem] rounded-r-xl
      hover:w-[40%] px-2 transition-all flex justify-center delay-100 items-center bg-gray-400 text-xs sm:text-base md:hover:text-2xl duration-300">
        <p className="text-black">{t('take_the_exam')}</p>
      </Link>
      </div>
    </div>
    )
}
