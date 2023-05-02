import axios from "axios"
import { url } from "./url"
const baseURL = `${url()}/image`

module.exports.uploadsImg = async (body: any) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/img`,body).then((response) => {
            resolve(response.status)
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports.getImg = async (name: any) => {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/img/${''}`).then((response) => {
            resolve(response.data.result)
        }).catch((error) => {
            reject(error)
        })
    })
}
