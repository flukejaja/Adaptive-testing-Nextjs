import { Fragment, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useRouter } from 'next/router'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from "next-i18next";
export default function ModalSubmit(props: any) {
    const {t} = useTranslation()
    const router = useRouter()
    const handleOpen = () => {
        props.handler(!props.open);
        router.push('/')
    }
    return (
        <Fragment>
            <Dialog open={props.open} handler={()=>{}}>
                <DialogHeader className="bg-[#6B5C5C] flex justify-between">
                    <div></div>
                    <p className="text-white font-kanit">{t('score')}</p>
                    <div></div>
                </DialogHeader>
                <DialogBody divider className="bg-[#F8F7F6]">
                    <p className="font-kanit font-bold">{t('score')} : {props.score}</p>
                </DialogBody>
                <DialogFooter className="bg-gray-400 flex justify-between">
                    <div></div>
                    <Button color="red" onClick={()=> handleOpen()}>
                        <span className="font-kanit">{t('ok')}</span>
                    </Button>
                    <div></div>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}
export const getStaticProps: GetStaticProps = async ({locale}) => {
    return { 
        props: { 
            ...(await serverSideTranslations(locale as any, ["common"])), 
    } ,
};
  }