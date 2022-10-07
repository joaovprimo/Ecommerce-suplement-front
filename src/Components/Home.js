import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import logo from "../images/logo.png";
import fundo from "../images/fundo.jpg";
import {getListProduct, selectProduct, getproductsSelecteds, getCartSelectedProduct, deleteCartSelected} from "./Axios/Axios";



export default function Home() {
    const [click, setClick] = useState(false)
    const [cartSelected, setCartSelected] = useState();
    const [prod, setProd] = useState("");
    const {arrProducts, setArrProducts,selected, setSelected, user, setUser, subtotal, setSubtotal} = useContext(AuthContext);
    const [boxUser, setBoxUser] = useState(false);
    
    console.log(subtotal)
const navigate = useNavigate();
console.log(user)
    
        if(!user){
            localStorage.removeItem('token');
        }
    useEffect(()=>{
        getListProduct().then((list)=>{
            setArrProducts(list.data);
        }).catch(()=> console.log("error"));
        getproductsSelecteds().then((elements)=>{
            setSelected(elements.data);
        }).catch(()=> console.log("error"));
        getCartSelectedProduct().then((list)=>{
            setCartSelected(list.data);
        }).catch(()=> console.log("error"));
    }, [])

    let sum = somaProdutos(selected)
    function hendleClick (prod) {
        selectProduct(prod).then((data)=>{
            setSelected(data.data);
            sum = somaProdutos(selected)
        }).catch((err) => {
            console.log(err)
            alert(err.response.data)
        });
        }
function handleDelete(selec){
    deleteCartSelected(selec).then((data)=>{
        console.log(data.data)
        setSelected(data.data);
        sum = somaProdutos(selected)
    }).catch((err)=>{
        console.log(err)
            alert(err.response)
    })
}
        
        function findProduct(e){
        e.preventDefault();
        const arrFind = arrProducts.filter(value=>
            value.description.indexOf(`${prod}`)>=0);
        console.log(arrFind);
        }

        function openUser (){
            setBoxUser(!boxUser);
        }

        function MakeLogout(){
            localStorage.removeItem('token');
            window.location.reload();
        }

        function MakeLogin(){
            navigate('/Login')
        }
        function finalziarPedido(){
            alert("Parabéns seu pedido foi realizado!");
            window.location.reload();
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
    <User onClick={openUser}>
        {boxUser ? (<>
        <ion-icon name="person-outline"></ion-icon>
        <BoxUser>
            {user ? <h1>Olá, {user.name}</h1> : <> </> }
        <Log onClick={MakeLogin}>Login</Log>
        <Log onClick={MakeLogout}>Logout</Log>
        <Log onClick={(() => setClick(!click))}>Seus produtos</Log>
        </BoxUser></>)
        : (<ion-icon name="person-outline"></ion-icon>)}</User>
    <Value><ion-icon onClick={(() =>setClick(true))} name="cart-outline"></ion-icon>
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
{click ? <Modal> 
            <Modal1>
                <Headerc>
            <p>Itens no meu carrinho</p>
            <ion-icon onClick={(() => setClick(false))} name="close-outline"></ion-icon>
            </Headerc>
           <MainCart> 
           {selected.map((selec, ind)=>
           <SelectedProduct key={ind} >
           <img src={selec.img} alt=""/>
           <Infos>
           <h4>R${(selec.value/100).toFixed(2)}</h4>
           <h5>{selec.name}</h5>
           </Infos>
           <ion-icon onClick={()=>handleDelete(selec)} name="close-outline"></ion-icon>
            </SelectedProduct>)}
            <Subtotal>
            <h1>Total = R$  
            {sum}</h1>
            <Button2 onClick={()=>finalziarPedido()}>
                Finalizar Compra
            </Button2>
            </Subtotal> 
            
                </MainCart>
            
            </Modal1>
            </Modal>:""}
</>
)
}

function somaProdutos(arr){
    let sum=0
    let total;
    console.log(arr);
    for (let i =0; i<arr.length;i++){
        sum =  sum + arr[i].value
    }
total = (sum/100).toFixed(2)
    return total;
}



const Infos = styled.div`
color:black;
display:flex;
flex-direction:column;
text-align:center;
h4{ 
font-size:16px;
font-weight:700;
color:green;
}
h5{
    margin-top:5px;
    font-size:15px;
    font-weight:700;
}
h6{
    font-size:12px;
    margin:5px 0;
}
`
const SelectedProduct = styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color:#f5f5f5;
width:195px;
height:100px;
border-radius:10px;
margin-bottom:15px;
margin-right:15px;

img{
    margin-left:15px;
    width: 60px;
    height: 60px;
}
ion-icon{
    font-size:15px;
    margin-bottom:90px;
    margin-right:10px;
    color:black;
}

`
const Subtotal = styled.div`
background-color:#f5f5f5;
width:195px;
height:100px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
border-radius:5px;
h1{
    color:green;
    font-size:20px;
font-weight:700;
}
`

const Modal = styled.div`
 width: 100vw;
  height: 240vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  display: flex;
  justify-content: end;

  
`
const Modal1 = styled.div`
width: 60vw;
height: 122vh;
display: flex;
align-items: center;
flex-direction: column;
padding-top:10px;

border-radius: 5px;
background: rgba(255, 255, 255);
p{
    color: red;
    font-weight: 800;
    font-size: 30px;
}
`
const Button2 = styled.button`
margin-top:10px;
   margin-bottom:10px;
width:100px;
height:40px;
border-radius:5px;
border-style:none;
background-color:red;
font-size:10px;
font-weight:bold;
font-family: 'Montserrat', sans-serif;
color:white;
 &:hover {
    background-color:rgba(0,0,0,0);
    color:red;
    box-shadow:inset 0 0 0 3px red;}
 `
const MainCart = styled.div`
padding-top: 15px;
`

const Headerc = styled.div`
display: flex;
width:150px;
p{
    font-size:20px;
    text-align: center;
}
`

const Container = styled.div`
position: absolute;
padding-top:1030px;
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
  overflow-x:none;
  font-family: 'Montserrat', sans-serif;
`;

const Header = styled.div`
position:relative;
top:0;
right:0;
width:100vw;
height:90px;
display:flex;
justify-content:space-between;
align-items:center;
background-color:black;
z-index:2;
box-sizing:border-box;
overflow-x:unset;
img{
    margin-left:5px;
    width:80px;
    height:80px;}

`
const Search = styled.input`
font-size:15px;
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
width:40%;
height:45px;
border-radius:50px;
border-style:none;
border-color:white;
background-color:white;
input{
    border-style:none;
border-color:white;
width:90px;
height:30px;
}
`
const But = styled.button`
border-style:none;
background-color:rgba(0,0,0,0);
display: flex;
    justify-content: center;
ion-icon{
    margin-left: 5px;;
    font-size:25px;
}
`


const Icons = styled.div`
display:flex;
margin-right:10px;

ion-icon{
    width:35px;
    height:35px;
    margin-left:5px;
    margin-right:10px;
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
width:60vw;
height:300px;
background-color:white;
margin-bottom:30px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
border-radius:10px;
img{
    width:100px;
    height:100px;
    border-radius:5px;
    margin-top:20px;
}

h1{
font-size:18px;
font-weight:700;
margin:10px 0;
width:auto;
text-align:center;
}
h2{
    font-size:18px;
font-weight:600;
margin:10px 0;
margin-top:15px;
width:auto;
text-align:center;
}
h3{
    font-size:15px;
    margin:5px 0;
    margin-bottom:15px;
    text-align:center;
}

`
 const Button = styled.button`
   margin-bottom:10px;
width:100px;
height:50px;
border-radius:5px;
border-style:none;
background-color:red;
font-size:18px;
font-weight:bold;
font-family: 'Montserrat', sans-serif;
color:white;
 &:hover {
    background-color:rgba(0,0,0,0);
    color:red;
    box-shadow:inset 0 0 0 3px red;}
 `
const Value = styled.div`
    margin-right: 10px
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
font-size:15px;
width:18px;
height:18px;
border-radius:50%;
position:absolute;
top:15px;
right:20px;
font-family: 'Montserrat', sans-serif;
font-weight:bold;
`
const User = styled.div`
`
const BoxUser = styled.div`
width:130px;
height:100px;
background-color:white;
position:absolute;
bottom:-80px;
right:45px;
border-radius:10px;
display:flex;
flex-direction:column;
justify-content:space-evenly;
align-items:center;
h1{
    font-family: 'Montserrat', sans-serif;
    color:red;
    font-weight:bold;
    font-size:12px;
}
`
const Log = styled.div`
background-color:black;
width:70%;
height:20px;
border-radius:5px;
color:white;
display:flex;
align-items:center;
justify-content:center;
font-family: 'Montserrat', sans-serif;
font-weight:bold;
font-size:10px;
`