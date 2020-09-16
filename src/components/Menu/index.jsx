import React from 'react';
import styled from 'styled-components';
import TextStyle from '../TextStyle';
import {Input, Button} from 'antd';
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const newPost = () => {
    if (localStorage.getItem("token")) {
      history.push('/profile')
    } else {
      history.push('/login')
    }
  }

  return (
    <div>
      <MenuWrapper>
        <Link to="/catalog" replace>
          <TextStyle color="#000000" strong>NOVIDADES</TextStyle>
        </Link>
        <Link to="/catalog" replace>
          <TextStyle color="#000000" strong>FEMININO</TextStyle>
        </Link>
        <Link to="/catalog" replace>
          <TextStyle color="#000000" strong>MASCULINO</TextStyle>
        </Link>
        <Link to="/catalog" replace>
          <TextStyle color="#000000" strong>ACESSÓRIOS</TextStyle>
        </Link>
        <ButtonStyle onClick={newPost} type="primary">
          PUBLIQUE UMA PEÇA
        </ButtonStyle>
      </MenuWrapper>
    </div>
  )
}

export default Menu;