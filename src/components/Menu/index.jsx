import React from 'react';
import styled from 'styled-components';
import TextStyle from '../TextStyle';
import { Input, Button } from 'antd';

const MenuWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin: 0 240px;
`;

const InputWrapper = styled.div`
   margin: 0 240px;
   margin-top: 20px;
`;

const ButtonStyle = styled(Button)`
   color: #000000;
`;

const Menu = () => {
   return(
      <div>
         <MenuWrapper>
            <TextStyle color="#000000" strong>NOVIDADES</TextStyle>
            <TextStyle color="#000000" strong>MARCAS</TextStyle> 
            <TextStyle color="#000000" strong>FEMININO</TextStyle>
            <TextStyle color="#000000" strong>MASCULINO</TextStyle>            
            <ButtonStyle type="primary">PUBLIQUE UMA PEÇA</ButtonStyle>
         </MenuWrapper>
         <InputWrapper>
            <Input placeholder="O que você está procurando ?"></Input>
         </InputWrapper>
      </div>          
   )
}

export default Menu;