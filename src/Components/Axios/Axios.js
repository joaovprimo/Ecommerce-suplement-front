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
    //const config = createHeaders();
    const promise = axios.get(`${Base_URL}home`);
    return promise;
}

export {getListProduct}