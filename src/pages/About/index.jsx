import React from 'react';
import { Row } from 'antd';
import TextStyle from '../../components/TextStyle';
import styled from 'styled-components';
import Logotipo from '../../components/Logotipo' 

const LogoWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;

const Logo = styled.div`
   text-align: center;
   width: 50%;
   margin: 0 auto;   
`;

const About = () => {
   return(
      <div>
         <LogoWrapper>
            <Logotipo/>  
         </LogoWrapper>
         <Logo style={{marginBottom: "50px"}}>
            <Row style={{marginBottom: "20px", justifyContent: "center"}}>
               <TextStyle color="#262626" fontSize="14px">O <strong>CABIDEIRO</strong> é uma plataforma de armário compartilhado, onde pessoas podem alugar roupas, sapatos e acessórios diretamente de outras pessoas a um custo muito mais conveniente do que o de comprar, além de encontrar uma grande variedade de produtos para montar seus looks e garantias que só nós oferecemos.</TextStyle>
            </Row>
            <Row style={{marginBottom: "20px", justifyContent: "center"}}>
               <TextStyle color="#262626" fontSize="14px">Aqui no <strong>CABIDEIRO</strong> você pode além de alugar roupas para determinado evento, também colocar à disposição trajes para locação, tudo de forma simples e fácil. A negociação ocorre de cliente para cliente, nós só intermediamos o aluguel, trazendo mais segurança para ambos os lados.</TextStyle>
            </Row>
            <Row style={{marginBottom: "20px", justifyContent: "center"}}>
               <TextStyle color="#262626" fontSize="14px"><strong>CABIDEIRO</strong>, seu armário compartilhado como se fosse nosso!</TextStyle>
            </Row> 
         </Logo>         
      </div>
   )
}

export default About;