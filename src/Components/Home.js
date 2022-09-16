import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import logo from "../images/logo.png";
import fundo from "../images/fundo.jpg";
import {getListProduct, selectProduct, getproductsSelecteds} from "./Axios/Axios";


export default function Home() {

    const [prod, setProd] = useState("");
    const {arrProducts, setArrProducts,selected, setSelected} = useContext(AuthContext);

    useEffect(()=>{
        getListProduct().then((list)=>{
            setArrProducts(list.data);
        }).catch(()=> console.log("error"));
        getproductsSelecteds().then((elements)=>{
            setSelected(elements.data);
        }).catch(()=> console.log("error"));
    }, [])

    function hendleClick (prod) {
        selectProduct(prod).then((data)=>{
            setSelected(data.data);
        }).catch(()=>console.log("erro"));
        }

        function findProduct(e){
        e.preventDefault();
        const arrFind = arrProducts.filter(value=>
            value.description.indexOf(`${prod}`)>=0);
        console.log(arrFind);
        }

return(
<>
<Header>
    <img src={logo} alt=""/>
    <Searchfor onSubmit={findProduct}>
    <But><ion-icon name="search-outline"></ion-icon></But>
    <Search type="text" value={prod} name='produ' onChange={e=> setProd(e.target.value)}/>
    </Searchfor>
    <Icons>
    <ion-icon name="person-outline"></ion-icon>
    <Value><ion-icon name="cart-outline"></ion-icon>
    <Number><h1>{selected.length}</h1></Number>
    </Value>
    </Icons>
    </Header>
    <Container>
  <List>
  {arrProducts.map((prod, ind)=><Product key={ind} >
        <img src={prod.img} alt="" onClick={()=>hendleClick(prod)}/> 
        <h2>R${(prod.value/100).toFixed(2)}</h2>
        <h1>{prod.name}</h1>
        <h3>{prod.description}</h3>
        <Button onClick={()=>hendleClick(prod)}>Comprar</Button>
       </Product>)}
  </List>
</Container>
</>
)
}



const Container = styled.div`
position:absolute;
padding-top:1650px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url(${fundo});
  background-repeat:no-repeat;
  background-size:cover;
  background-attachment:scroll;
  overflow-y:scroll;
  font-family: 'Montserrat', sans-serif;
`;

const Header = styled.div`
position:relative;
top:0;
right:0;
width:100vw;
height:130px;
display:flex;
justify-content:space-between;
align-items:center;
background-color:black;
z-index:2;
box-sizing:border-box;
img{
    margin-left:15px;
    width:150px;
    height:130px;}

`
const Search = styled.input`
font-size:21px;
padding:20px;
width:80%;
height:60px;
background-color:white;
border-style:none;
font-family: 'Montserrat', sans-serif;
font-weight:600;
`
const Searchfor = styled.form`
display:flex;
align-items:center;
width:400px;
height:80px;
border-radius:50px;
border-style:none;
border-color:white;
background-color:white;
input{
    border-style:none;
border-color:white;
width:auto;
}
`
const But = styled.button`
border-style:none;
background-color:rgba(0,0,0,0);
ion-icon{
    margin-left: 15px;;
    font-size:35px;
}
`


const Icons = styled.div`
display:flex;
margin-right:20px;
ion-icon{
    width:50px;
    height:50px;
    margin-left:15px;
    margin-right:15px;
    color:white;
}
`
const List = styled.div`
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const Product = styled.div`
width:50vw;
height:500px;
background-color:white;
margin-bottom:30px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
box-sizing:border-box;
border-radius:10px;


img{
    width:200px;
    height:200px;
    border-radius:5px;
    margin-top:5px;
}

h1{
font-size:21px;
font-weight:700;
margin:15px 0;
width:auto;
text-align:center;
}
h2{
    font-size:25px;
font-weight:600;
margin:10px 0;
width:auto;
text-align:center;
}
h3{
    font-size:20px;
    margin:5px 0;
    margin-bottom:15px;
    text-align:center;
}

`
 const Button = styled.button`
   margin-top:15px;
width:120px;
height:50px;
border-radius:5px;
border-style:none;
background-color:red;
font-size:20px;
font-weight:bold;
 &:hover {
    background-color:rgba(0,0,0,0);
    color:red;
    box-shadow:inset 0 0 0 3px red;}
 `
const Value = styled.div`
ion-icon{
    position:relative;
}

`
const Number = styled.div`
display:flex;
align-items:center;
justify-content:center;
background-color:white;
color:red;
font-size:20px;
width:23px;
height:23px;
border-radius:50%;
position:absolute;
top:30px;
right:25px;
font-family: 'Montserrat', sans-serif;
font-weight:bold;
`