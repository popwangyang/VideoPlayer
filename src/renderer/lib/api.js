import axios from 'axios';

export const baseUrl = "http://127.0.0.1:8081";


const http = axios.create({
        baseURL: baseUrl,
    });



export const login = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"POST",
    data: params
    }).then(res => res);
};
//post请求
export const post = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"POST",
    data:params
}).then(res => res)};
//get请求
export const get = (url) => { return http({
    url:url,
    method:"GET",
}).then(res => res)};
//patch请求
export const patch = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"PATCH",
    data:JSON.stringify(params)
}).then(res => res)};

export const DELETE = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"DELETE",
    data:JSON.stringify([params])
}).then(res => res)};
//put请求
export const put = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"PUT",
    data:params
}).then(res => res)};
 
