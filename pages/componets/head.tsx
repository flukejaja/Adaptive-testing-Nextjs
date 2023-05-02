import WavesBackground from "./image/getimage"

export default function HeadHome() {
    return <>
        <div className="h-[25rem] drop-shadow-2xl w-full">
                <WavesBackground>
                    <div className=' flex items-center justify-center flex-col font-akshar w-full '>
                        <div className='text-xl md:text-3xl lg:text-5xl text-center text-white  whitespace-normal'>THE OPEN-SOURCE ONLINE</div>
                        <div className="text-2xl md:text-4xl lg:text-6xl  text-center text-white  whitespace-normal">ADAPTIVE TESTING PLATFORM</div>
                    </div>
                </WavesBackground>
        </div>
    </>
}