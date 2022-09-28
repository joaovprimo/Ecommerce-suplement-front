import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";
import AuthContext from "../Context/AuthContext.js"
import logo from "../images/logo.png";
import fundo from "../images/fundo.jpg";
import { singIn } from "./Axios/Axios"

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  const {setUser} = useContext(AuthContext)

 async function confirmarLogin(event) {
    event.preventDefault();
    let newObj={email, password}
    singIn(newObj).then((res) => {
      const { name, token} = res.data
      console.log(name, token)
     localStorage.setItem('token', token);
      setUser({name, token})
      navigate("/");
    
    }).catch((err) => {
     console.log(err)
     alert(err.response.data)
    });

  }

  return (
    <Container>
      <Logo>
        <img src={logo} alt=""/>
      </Logo>
      <Formulario>
        <form onSubmit={confirmarLogin}>
          <input
            type="email"
            value={email}
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="password"
            value={password}
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Botao>
            <button type="submit">Login</button>
          </Botao>
        </form>
      </Formulario>
      <Link to={`/sign-up`}>
        <Frase>
          <p>Don't have an account? Click here!</p>
        </Frase>
      </Link>
    </Container>
  );
}

const Botao = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;

  button {
    width: 303px;
    height: 45px;

    background: red;
    border-radius: 4.63636px;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    border: none;
    color: #ffffff;
  }
`;
const Formulario = styled.div`
margin-top:20px;
  form{
    display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  }
  input {
    width: 303px;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    padding-left: 11px;
    margin-bottom: 16px;
  }
`;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: black;
  box-sizing:border-box;
  background-image: url(${fundo});
  background-repeat:no-repeat;
  background-size:cover;
  background-attachment:scroll;
  overflow-y:scroll;
  font-family: 'Montserrat', sans-serif;
`;

const Frase = styled.div`
  margin-top: 11px;
  width: 150px;
  height: 17px;
  left: 85px;
  top: 553px;

  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13.976px;
  line-height: 17px;
  text-align: center;
  text-decoration-line: underline;

  color: #ffffff;
`;

const Logo = styled.div`
display:flex;
align-items:center;
justify-content:center;
width: auto;
  height:auto;
font-family: 'Saira Stencil One';
font-style: normal;
font-weight: 400;
font-size: 32px;
line-height: 50px;
color: #FFFFFF;
img{
  border-radius:50%;
  height:150px;
  width:auto;
}
`;