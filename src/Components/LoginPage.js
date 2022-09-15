import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import AuthContext from "../Context/AuthContext.js"


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  const {setUser} = useContext(AuthContext)

 async function confirmarLogin(event) {
    event.preventDefault();
    const URL = "http://localhost:5000/";

    const promise = axios.post(URL, {
      email: email,
      password: password
    });
    promise.then((response) => {
      const { data } = response;
      //inseri este codigo aqui para salvar o token no localStorage e poder acessar a rota privada
     localStorage.setItem('token', data);
     console.log(data);
const { name, token} = data


setUser({name, token})
      navigate("/home");
    
    });
    promise.catch((err) => {
      alert("Falha ao fazer seu Login");
    });



  }

  return (
    <Container>
      <Logo>
        <h1>Imagem aqui</h1>
  
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
  margin-left: 20px;

  button {
    width: 303px;
    height: 45px;

    background: red;
    border-radius: 4.63636px;
    font-family: "Lexend Deca";
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
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    margin-left: 20px;
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
`;

const Frase = styled.div`
  margin-top: 11px;
  width: 150px;
  height: 17px;
  left: 85px;
  top: 553px;

  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 13.976px;
  line-height: 17px;
  text-align: center;
  text-decoration-line: underline;

  color: #ffffff;
`;

const Logo = styled.div`
  width: 147px;
height: 50px;


font-family: 'Saira Stencil One';
font-style: normal;
font-weight: 400;
font-size: 32px;
line-height: 50px;

color: #FFFFFF;
`;