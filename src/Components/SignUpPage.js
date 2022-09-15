import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();

  function confirmarInscricao(event) {
    event.preventDefault();
    const URL = "http://localhost:5000/sign-up";
    const promise = axios.post(URL, {
      name,
      email,
      password,
      confirmpassword,
    });
    promise.then((response) => {
      navigate("/");
    });
    promise.catch((err) => {
      alert("Falha ao fazer seu Cadastro");
    });
  }

  return (
    <>
      <Container>
        <Header>Imagem aqui</Header>
        <Formulario>
          <form onSubmit={confirmarInscricao}>
            <input
              type="text"
              value={name}
              placeholder="name"
              required
              onChange={(e) => setName(e.target.value)}
            />

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

            <input
              type="password"
              value={confirmpassword}
              placeholder="confirmpassword"
              
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <Botao>
              <button>Sign Up</button>
            </Botao>
          </form>
        </Formulario>
        <Link to={`/`}>
          <Frase>
            <p>Already have an account? Click here!</p>
          </Frase>
        </Link>
      </Container>
    </>
  );
}

const Header = styled.div`
width: 147px;
height: 50px;

font-family: 'Saira Stencil One';
font-style: normal;
font-weight: 400;
font-size: 32px;
line-height: 50px;

color: #FFFFFF;`;

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
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    border: none;
    color: white;
  }
`;
const Formulario = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 303px;
    height: 45px;
    margin-bottom: 16px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;

    padding-left: 11px;
  }
`;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: black
`;

const Frase = styled.div`
  margin-top: 11px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;

  color: #ffffff;
`;
