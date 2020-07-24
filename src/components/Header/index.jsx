import React from 'react';
import styled from 'styled-components';
import TextStyle from '../TextStyle';

const HeaderStyle = styled.div`
    height: 65px;
    background-color: #262626;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 109px;
`;

const Header = () => {
   return(
      <HeaderStyle>
        <TextStyle color="#ffcb00">Bem-vindo ao cabideiro</TextStyle>
        <div>
            <TextStyle>Quem somos</TextStyle>
            <TextStyle marginLeft="68px">Entrar | Criar conta</TextStyle>
        </div>        
      </HeaderStyle>
   )
}

export default Header;