import { PrivateAxios } from "../../services/api/api"

const newCart=async(body)=>{
    let {data}=await PrivateAxios.post("/cart/create",body)
    return data?.data
}
const getUserCart=async(userId)=>{
    let {data}=await PrivateAxios.get(`/${userId}`)
    return data?.data
}
const updateCart=async(userId,data)=>{
    return await PrivateAxios.put(`/cart/update/${userId}`)
}
const deleteCart=async(userId)=>{
    return await PrivateAxios.delete(`/cart/remove/${userId}`)
}
export { newCart, getUserCart, updateCart, deleteCart };