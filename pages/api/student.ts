import axios from "axios"
import { url } from "./url"
const baseURL = `${url()}/student`

module.exports.getParams = async (body: any , cookies : string) => {
    const config = {
        headers: { Authorization: `Bearer ${cookies}`}
    }
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/${body}`,config).then((response) => {
            resolve(response.data.result)
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports.getStudent = async (name : any) => {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/search/${name}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports.updateHistory = async (body : any , cookies : string) => {
    const config = {
        headers: { Authorization: `Bearer ${cookies}`}
    }
    return new Promise((resolve, reject) => {
        axios.put(`${baseURL}/update/history`,body,config).then((response) => {
            resolve(response.data.result)
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports.updateProFile = async (body : any , cookies : string) => {
    const config = {
        headers: { Authorization: `Bearer ${cookies}`}
    }
    return new Promise((resolve, reject) => {
        axios.put(`${baseURL}/update/profile`,body,config).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports.getStudentUser = async (name : any) => {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/search/user/${name}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}
