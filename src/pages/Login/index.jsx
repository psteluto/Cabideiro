import React, { useState } from 'react';
import LoginService from '../../services/Login'
import Logotipo from '../../components/Logotipo' 
import styled from 'styled-components';
import TextStyle from '../../components/TextStyle';
import BackgroundLogin from '../../images/background-login.jpg';
import { Row, Col, Input, Button } from 'antd';


const Background = styled.div`
   background: url(${BackgroundLogin});
   background-size: contain;
`;

const BackgroundImage = styled.img`
   opacity: 0.5;
`;

const FormWrapper = styled.div`
   background-color: #ffffff;
   width: 50%;
   margin: 0 auto;
`;

const LogoWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;

const FormStyle = styled.div`
   padding: 43px 115px 80px 115px;
`;

const ButtonStyle = styled(Button)`
   color: #000000;
   margin-top: 25px;
`;

const Login = () => {

   const [emailCpf, setEmailCpf] = useState("");
   const [password, setPassword] = useState("");

   const login = async () => {
      const res = await LoginService.login(emailCpf, password);

      localStorage.setItem('token', res.data.token); 

   if(emailCpf == "" || password){
      alert("E-mail / CPF e senha são obrigatórios")
   }else {
       
      }       
   }   

   return(
      <Background src={BackgroundImage}>
         <FormWrapper>
            <LogoWrapper>
               <Logotipo/>
               <TextStyle color="#262626" fontSize="16px">ENTRAR</TextStyle>                
            </LogoWrapper>
            <FormStyle>
               <Row gutter={[14, 14]}>
                  <Col span={24}>
                     <TextStyle color="#656668">E-mail / CPF</TextStyle>
                     <Input onChange={(e)=>setEmailCpf(e.target.value)}/>
                  </Col>                                 
               </Row>
               <Row gutter={[14, 14]}>
                  <Col span={24}>
                     <TextStyle color="#656668">Senha</TextStyle>
                     <Input onChange={(e)=>setPassword(e.target.value)}/>
                     <TextStyle color="#656668" fontSize="10px">Esqueceu a sua senha? Clique aqui </TextStyle>
                  </Col>                                 
               </Row>
               <Row>
                  <Col span={24}>
                     <ButtonStyle type="primary" block onClick={login}>CONTINUAR</ButtonStyle>
                  </Col>
               </Row>               
            </FormStyle>
         </FormWrapper>         
      </Background>
   )
}

export default Login;