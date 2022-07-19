import { YQ_TOKEN } from '../utils/const'

const request = (url, options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method: options.method,
            data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
            header: {
                // 'Content-Type': 'application/json; charset=UTF-8',
                'X-Auth-Token': YQ_TOKEN
            },
            success(request) {
                resolve(request.data)
            },
            fail(error) {
                reject(error)
            }
        })
    })
}

const get = (url, options = {}) => {
    return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
    return request(url, { method: 'POST', data: options })
}

const put = (url, options) => {
    return request(url, { method: 'PUT', data: options })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
    return request(url, { method: 'DELETE', data: options })
}

module.exports = {
    get,
    post,
    put,
    remove
}
