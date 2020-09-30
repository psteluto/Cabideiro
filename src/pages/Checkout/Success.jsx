import React from 'react';
import styled from 'styled-components';
import {CheckCircleTwoTone} from '@ant-design/icons';
import {Typography} from 'antd';
import ButtonStyle from "../../components/ButtonStyle";

const {Title} = Typography;

const Container = styled.div`
  text-align: center;
  margin: 50px 0;
`;

const SuccessMsg = styled(Title)`
  margin-top: 20px;
`;

const Success = ({history}) => {
  const goToProfile = () => {
    history.push("/profile")
  }
  return (
    <Container>
      <CheckCircleTwoTone style={{fontSize: 80}} twoToneColor="#52c41a"/>
      <SuccessMsg level={2}>Seu produto foi alugado com sucesso!</SuccessMsg>
      <ButtonStyle type="primary" block onClick={goToProfile}>Ir para Meu Perfil</ButtonStyle>
    </Container>
  );
}

export default Success;