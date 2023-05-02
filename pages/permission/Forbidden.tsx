
import Link from "next/link";
import Head from 'next/head'

function Forbidden() {
  const img = [
    {
      name: 'Homepage',
      path: '/'
    },
    {
      name: 'Login',
      path: '/login'
    },
  ]
  return (<div>
    <Head>
      <title>Adaptive testing</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/dw-1.png" />
    </Head>
    <div lang='en' className={'font-akshar'}>
      <div className="flex flex-col justify-center items-cetner h-screen text-white bg-white">
        <p className=" w-full text-center text-2xl text-black">403 Forbidden access to this resource on the server is denied!</p>
        <div className="flex justify-center items-center  h-[40rem] space-x-4">
          {
            img.map((sub_img: { name: string, path: string }, index: number) => {
              return <Link href={sub_img.path} key={index}>
                <p className="hover:bg-black hover:text-white w-fit px-2 py-2 rounded-lg text-black font-bold text-2xl  duration-100 hover:cursor-pointer hover:underline hover:text-4xl">{sub_img.name}</p>
              </Link>
            })
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default Forbidden;
