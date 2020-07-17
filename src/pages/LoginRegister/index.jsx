import React from 'react';
import Logotipo from '../../components/Logotipo' 
import styled from 'styled-components';
import TextStyle from '../../components/TextStyle';
import { Row, Col, Input, Button } from 'antd';

const Background = styled.div`
   background-color: #979797;
`;

const FormWrapper = styled.div`
   background-color: #ffffff;
   width: 70%;
   margin: 0 auto;
`;

const LogoWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;

const FormStyle = styled.div`
   margin: 0px 160px;
`;

const ButtonStyle = styled(Button)`
   color: #000000;
`;

const LoginRegister = () => {
   return(
      <Background>
         <FormWrapper>
            <LogoWrapper>
               <Logotipo/>
               <TextStyle color="#262626" fontSize="16px">CRIAR CONTA</TextStyle>                
            </LogoWrapper>
            <FormStyle>
               <Row gutter={[14, 14]}>
                  <Col span={24}>
                     <TextStyle color="#656668">Nome completo</TextStyle>
                     <Input/>
                  </Col>
                  <Col span={24}>
                     <TextStyle color="#656668">E-mail</TextStyle>
                     <Input/>
                  </Col>
                  <Col span={8}>
                     <TextStyle color="#656668">CPF</TextStyle>
                     <Input placeholder="000.000.000-00"/>
                  </Col>
                  <Col span={8}>
                     <TextStyle color="#656668">Celular</TextStyle>
                     <Input placeholder="(00) 00000-0000"/>
                  </Col>
                  <Col span={8}>
                     <TextStyle color="#656668">Telefone alternativo</TextStyle>
                     <Input placeholder="(00) 00000-0000"/>
                  </Col>
                  <Col span={12}>
                     <TextStyle color="#656668">Senha</TextStyle>
                     <Input/>
                  </Col>
                  <Col span={12}>
                     <TextStyle color="#656668">Confirmar Senha</TextStyle>
                     <Input/>
                  </Col>
                  <Col span={12}>
                     <TextStyle color="#656668">CEP</TextStyle>
                     <Input/>
                  </Col>               
               </Row>
               <Row>
                  <Col span={12} offset={12}>
                     <ButtonStyle type="primary" block>CONTINUAR</ButtonStyle>
                  </Col>
               </Row>
               <Row>
                  <Col span={12} offset={12}>
                  <TextStyle color="#656668" fontSize="10px">Ao cadastrar-se, você concorda com nossos termos e condições de uso.</TextStyle>
                  </Col>
               </Row>
            </FormStyle>
         </FormWrapper>         
      </Background>
   )
}

export default LoginRegister;