import React from 'react';
import Logotipo from '../../components/Logotipo' 
import styled from 'styled-components';
import TextStyle from '../../components/TextStyle';
import BackgroundLogin from '../../images/background-login.jpg';
import { Row, Col, Input, Button } from 'antd';

const Background = styled.div`
   background: url(${BackgroundLogin});
   background-size: contain;
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
   return(
      <Background src={BackgroundLogin}>
         <FormWrapper>
            <LogoWrapper>
               <Logotipo/>
               <TextStyle color="#262626" fontSize="16px">ENTRAR</TextStyle>                
            </LogoWrapper>
            <FormStyle>
               <Row gutter={[14, 14]}>
                  <Col span={24}>
                     <TextStyle color="#656668">E-mail</TextStyle>
                     <Input/>
                  </Col>                                 
               </Row>
               <Row gutter={[14, 14]}>
                  <Col span={24}>
                     <TextStyle color="#656668">Senha</TextStyle>
                     <Input/>
                     <TextStyle color="#656668" fontSize="10px">Esqueceu a sua senha? Clique aqui </TextStyle>
                  </Col>                                 
               </Row>
               <Row>
                  <Col span={24}>
                     <ButtonStyle type="primary" block>CONTINUAR</ButtonStyle>
                  </Col>
               </Row>               
            </FormStyle>
         </FormWrapper>         
      </Background>
   )
}

export default Login;