import axios from "axios";

const Base_URL= "http://localhost:5000/";

function createHeaders(){
    const auth = localStorage.getItem('token');
    const config = {
        headers:{
            Authorization: `Bearer ${auth}`
        }
    }
    return config;
}

function getListProduct(){
    const promise = axios.get(`${Base_URL}home`);
    return promise;
}

function selectProduct(item){
    const config = createHeaders();
const promise = axios.post(`${Base_URL}home`, item, config);
return promise;
}

function getCartSelectedProduct(){
    const promise = axios.get(`${Base_URL}cart`);
    return promise;
}

function deleteCartSelected(){
    const config = createHeaders();
    const promise = axios.post(`${Base_URL}delete`, config);
    return promise
}

export {getListProduct, selectProduct, getCartSelectedProduct, deleteCartSelected}