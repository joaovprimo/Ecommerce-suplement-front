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

function getproductsSelecteds(){
    const config = createHeaders();
    const promise = axios.get(`${Base_URL}home/selecteds`, config);
    return promise;
}


export {getListProduct, selectProduct,getproductsSelecteds}