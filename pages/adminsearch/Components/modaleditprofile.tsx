import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from "next/image";
const api = require("../../api/student.ts");
import Cookies from "universal-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export default function Modaleditprofile(props: any) {
  const [data, setData] = useState() as any;
  const cookie = new Cookies();
  const { t } = useTranslation()
  useEffect(() => {
    setData(props?.data);
  }, [props?.data]);
  const getImg = (e: string) => {
    return e;
  };

  const changeText = (e: string, key: string) => {
    data[key] = e;
    setData({ ...data });
  };

  const submit = async () => {
    let dataSend = {
      id:data.id,
      first_name : data.first_name,
      last_name : data.last_name,
      email:data.email,
      tel: data.tel
    }
    let wait = await api.updateProFile(dataSend, cookie.get("user"));
  
    
    if (wait.data?.message === "ok") {
      props.handler(!props.open);
      props.callBack(true);
    }
  };
  return (
    <Dialog open={props.open} handler={() => { }} size="xxl" >
      <DialogHeader className="bg-[#6B5C5C] flex justify-between">
        <div></div>
        <p className="text-white font-kanit ">{t('edit_profile')}</p>
        <div></div>
      </DialogHeader>
      <DialogBody divider className="bg-[#F8F7F6] font-kanit font-semibold">
        <div className="flex items-center pl-16 pt-16 mb-16  w-full justify-between space-x-12 h-80">
          <div className="h-full w-full flex items-center justify-center drop-shadow-2xl">
            <div className="h-44 w-48 bg-white flex items-center justify-center rounded-2xl text-black relative">
              {props.data?.image_url ? (
                <Image
                  loader={() => getImg(props.data?.image_url)}
                  src={`${getImg(props.data?.image_url)}`}
                  alt=""
                  layout="fill"
                  className="rounded-2xl"
                />
              ) : (
                <Image
                  src={`/person-png-icon-29.jpg`}
                  alt=""
                  layout="fill"
                  className="rounded-2xl"
                />
              )}
            </div>
          </div>
          <div className="w-full flex-col space-y-10 ">
           <div className="flex items-center space-x-5 relative">
           <label>{t('first_name')}</label>
            <input
              className="bg-white border-2 h-14 flex items-center rounded-2xl pl-4 w-3/4 outline-none absolute left-24"
              onChange={(e) => changeText(e.target.value, "first_name")}
              value={data?.first_name}
            />
           </div>
           <div className="flex items-center space-x-5 relative ">
           <label>{t('last_name')}</label>
           <input
              className="bg-white border-2  h-14 flex items-center rounded-2xl pl-4  w-3/4 outline-none absolute left-24"
              onChange={(e) => changeText(e.target.value, "last_name")}
              value={data?.last_name}
            />
           </div>
           <div className="flex items-center space-x-5 relative">
           <label>{t('email')}</label>
           <input
              className="bg-white border-2  h-14 flex items-center rounded-2xl pl-4  w-3/4 outline-none absolute left-24"
              onChange={(e) => changeText(e.target.value, "email")}
              value={data?.email}
            />
           </div>
            <div className="flex items-center space-x-5 relative">
            <label>{t('tel')}.</label>
            <input
              className="bg-white border-2  h-14 flex items-center rounded-2xl pl-4  w-3/4 outline-none absolute left-24"
              onChange={(e) => changeText(e.target.value, "tel")}
              value={data?.tel}
            />
            </div>
            
          </div>
          <div className="w-full"></div>
        </div>
      </DialogBody>
      <DialogFooter className="bg-gray-400 flex justify-center space-x-2">
        <Button color="red" onClick={() => props.handler(!props.open)}>
          <span className="font-kanit">{t('cancel')}</span>
        </Button>
        <Button color="green" onClick={() => submit()}>
          <span className="font-kanit">{t('ok')}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
