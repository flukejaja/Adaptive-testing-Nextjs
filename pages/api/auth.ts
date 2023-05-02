import axios from "axios"
import { url } from "./url"
const baseURL = `${url()}/auth`


module.exports.register = async (body: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/register`, {
            username: body.username,
            password: body.password,
            tel: body.tel,
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.login = async (body: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/login`, {
            username: body.username,
            password: body.password,
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.forgot = async (body: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/forgot`, {
            name: body.username,
            email: body.email,
        }).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.resetPassword = async (body: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/resetpassword`, {
            username: body.username,
            password: body.password,
            hash:body.hash
        }).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}