import axios from "axios"

const signIn = async (email, password) => {
    let res = await axios.post('http://192.168.212.135:8081/api/v1/login', { email, password })
    console.log(res.data);
    return res.data

}

const checkToken = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    //let response = await handleGetAllUser('ALL');
    //let response = await handleGetAllUserShop()
    // let response = await axios.get('http://192.168.1.6:8081/api/v1/admin/account')
    let response = await axios.get('http://192.168.212.135:8081/api/v1/account/info');
    console.log('Check token neeee:', response);
    return response.data
}

const addCart = async (token, id_product, quantity) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    console.log('Add Cart: ', token, id_product, quantity);
    let response = await axios.post(`http://192.168.212.135:8081/api/v1/product/${id_product}`, { quantity });
    console.log(response);
    return response.data
}

const getProduct = async () => {
    let response = await axios.get('http://192.168.212.135:8081/api/v1/product')
    return response.data
}
module.exports = {
    signIn, checkToken, addCart, getProduct
}