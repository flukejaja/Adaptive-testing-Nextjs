import axios from "axios"
import { url } from "./url"
const baseURL = `${url()}/example`

module.exports.getExample = async (body: any, cookies: string) => {
    const config = {
        headers: { Authorization: `Bearer ${cookies}` }
    }
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/get`, body, config).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports.getParams = async (level: string, cookies: string) => {
    const config = {
        headers: { Authorization: `Bearer ${cookies}` }
    }
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/get/${level}`, config).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}


module.exports.addExample = async (data: any) => {
    // const config = {
    //     headers: { Authorization: `Bearer ${cookies}`}
    // }
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/add`, data).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}


module.exports.delete = async (id: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/remove/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}


module.exports.update = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios.put(`${baseURL}/update`, data).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}