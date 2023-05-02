import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
const api = require('../../api/example')
export default function Modaldelete(props: any) {
  const handleOpen = () => props.handler(!props.open);
  const { t } = useTranslation()
  const submit = async () => {
    if(await api.delete(props.name?.id)){
      await props.function()
      await props.handler(!props.open)
    }
  }
  return <>
    <Dialog open={props.open} handler={handleOpen}>
      <DialogHeader className="flex justify-center">{t('delete')} !</DialogHeader>
      <DialogBody divider className="flex-col flex justify-center items-center">
        <p className="font-kanit font-semibold">{props.name?.question}</p>
        <p className="text-red-800 text-xl font-kanit">{t('Are_you_sure')} ?</p>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span className="font-kanit">{t('cancel')}</span>
        </Button>
        <Button variant="gradient" color="red" onClick={()=> submit()}>
          <span className="font-kanit">{t('ok')}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  </>

}
export async function getStaticProps({locale}: any) {
  return { 
      props: { 
          ...(await serverSideTranslations(locale, ["common"])), 
  } ,
}
}