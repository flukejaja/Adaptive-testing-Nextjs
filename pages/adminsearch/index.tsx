import type { ReactElement } from "react";
import Layout from "../layout/layout";
import type { NextPageWithLayout } from "../_app";
import { Button, Input } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Modaleditprofile from "./Components/modaleditprofile";
import Image from "next/image";
import Cookies from "universal-cookie";
import Loading from "../loading";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import RequireAuthenticationAdmin from "../permission/RequireAuthAdmin";
const api = require("../api/student");
const Searchprofile: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]) as any;
  const [subData, setSubData] = useState([]) as any;
  const [loading, setLoading] = useState(true);
  const [callBack, setCallBack] = useState(false);
  const cookie = new Cookies();
  const { t } = useTranslation()
  useEffect(() => {
    getStudent("");
  }, []);
  useEffect(() => {
    if (callBack) {
      setLoading(true);
      getStudent("");
    }
  }, [callBack]);
  const getStudent = async (name: any) => {
    let data = await api.getStudent(name, cookie.get("user"));
    setData(data.result);
    if (data.message === "ok") setLoading(false);
  };
  const btnModal = (item: any) => {
    setOpen(!open);
    setSubData(item);
    setCallBack(false);
  };
  if (loading) {
    return <Loading />;
  }
  const getImg = (e: string) => {
    return e;
  };
  return (
    <div className="w-full flex-col overflow-auto  scrollbar-hide h-screen  overflow-y-auto ">
      <div className="">
        <div className="h-14 mt-20 ml-20 mr-20 ">
          <Input label="Search" onChange={(e) => getStudent(e.target.value)} />
        </div>
      </div>
      <div className="h-full flex-col drop-shadow-2xl ">
        {data.map((items: any, index: number) => {
          return (
            <div
              key={index}
              className="h-auto mt-10 ml-20 mr-20 grid grid-rows-2 grid-flow-col gap-5 border rounded-xl pt-2 pb-2 bg-gray-200"
            >
              <div className="row-span-2 flex justify-center">
                <div className="h-44 w-44 bg-white flex items-center justify-center rounded-2xl text-black relative ">
                  {items.image_url ? (
                    <Image
                      loader={() => getImg(items.image_url)}
                      src={`${getImg(items.image_url)}`}
                      alt=""
                      fill
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <Image
                      src={`/person-png-icon-29.jpg`}
                      alt=""
                     fill
                      className="w-full h-full object-cover rounded-2xl bg-gray-200"
                    />
                  )}
                </div>
              </div>
              <div className="col-span-2 bg-gray-300 pl-4  rounded-2xl flex justify-between pr-4 w-full">
                <p className="h-full flex items-center text-black">
                  {t('username')} : {items.name}
                </p>
                <p className="h-full flex items-center text-black">
                  {t('score')} : {Number(items.score).toFixed(2)}
                </p>
                <p className="h-full flex items-center text-black">
                  {t('level')} : {items.level}
                </p>
                <p className="h-full flex items-center text-black">
                  {t('email')} : {items.email}
                </p>
              </div>
              <div className="row-span-1 col-span-2 flex space-x-3">
                <Button color="blue" className="font-kanit" onClick={() => btnModal(items)}>
                  {t('edit_profile')}
                </Button>
                <div className="w-full row-span-1 col-span-1 bg-gray-300 pl-4  rounded-2xl flex  justify-between mr-2 pr-4">
                  <p className="flex items-center text-black">
                    {t('first_name')} : {items.first_name}
                  </p>
                  <p className="flex items-center text-black">
                    {t('last_name')} : {items.last_name}
                  </p>
                  <p className="flex items-center text-black">
                    {t('tel')} : {items.tel}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
        <div className="h-20"></div>
      </div>
      <Modaleditprofile
        open={open}
        handler={setOpen}
        data={subData}
        callBack={setCallBack}
      />
    </div>
  );
};
Searchprofile.getLayout = function getLayout(page: ReactElement) {
  return <RequireAuthenticationAdmin><Layout>{page}</Layout></RequireAuthenticationAdmin>
};
export default Searchprofile;
export async function getStaticProps({ locale }: any) {
  return { 
      props: { ...(await serverSideTranslations(locale, ["common"])), 
  } ,
}
}