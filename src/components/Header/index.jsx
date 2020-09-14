import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import TextStyle from '../TextStyle';
import {setToken as dispatchToken} from '../../redux/TokenSlice';

const HeaderStyle = styled.div`
    height: 65px;
    background-color: #262626;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 109px;
`;

const Header = () => {
  const dispatch = useDispatch();

  const {token} = useSelector(state => state.token);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(dispatchToken(""));
  }

  return (
    <HeaderStyle>
      <a href="/"><TextStyle color="#ffcb00">Bem-vindo ao cabideiro</TextStyle></a>
      {token ? (
        <div>
          <a href="/about"><TextStyle>Quem somos</TextStyle></a>
          <a href="/profile"><TextStyle marginLeft="68px">Meu Perfil | </TextStyle></a>
          <a href="/" onClick={logout}><TextStyle>Sair</TextStyle></a>
        </div>
      ) : (
        <span>
            <a href="/about"><TextStyle>Quem somos</TextStyle></a>
            <a href="/login"><TextStyle marginLeft="68px">Entrar | </TextStyle></a>
            <a href="/login/register"><TextStyle>Criar conta</TextStyle></a>
          </span>
      )}
    </HeaderStyle>
  )
}

export default Header;