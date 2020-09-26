import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Button, Image} from "antd";
import moment from 'moment';

const Container = styled.div`
  margin-right: 20px;
  margin-bottom: 30px;
  display: flex;
`;

const TextWrapper = styled.div`
  padding: 0 10px 0 15px;
  color: #262626;
  font-size: 16px;
  p {
    margin: 4px 0;
  }
`;

const StatusText = styled.p`
  font-weight: 900;
  text-align: center;
  span {
    color: #ee365f;
  }
`;

const NameText = styled.p`
  text-transform: uppercase;
`;

const ProfileLink = styled.a`  
  font-size: 12px;
  color: #1666c0;
`

const DaysLeftText = styled.span`
  font-size: 12px;
`;

const ContrastText = styled.span`
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const RentButton = styled(Button)`
  width: 232px;
  height: 40px;
  background-color: #e73554;
`;

const DetailCard = ({image, status, name, color, owner, client, devolutionDate, rentValue, paymentStatus, onClickProfile}) => {
  rentValue = Number(rentValue);

  const daysLeft = moment(devolutionDate).diff(moment(), "days");

  let statusDescription = ""
  switch (status) {
    case "APPROVED":
      statusDescription = "Aprovado"
      break;
    case "SEPARATION":
      statusDescription = "Em Separação";
      break;
    case "FINISHED":
      statusDescription = "Finalizado";
      break;
  }

  let paymentStatusDescription = "";
  switch (paymentStatus) {
    case "AVAILABLE":
      paymentStatusDescription = "Disponível";
      break;
    case "PROCESS":
      paymentStatusDescription = "Em Andamento";
      break;
  }

  let userDescription = "";
  if (owner) userDescription = "Proprietário";
  if (client) userDescription = "Cliente";

  const userName = owner || client || "";

  return (
    <Container>
      <Image width={185} src={image}/>
      <TextWrapper>
        <StatusText>Status {status === 'FINISHED' ? statusDescription : (<span>{statusDescription}</span>)}</StatusText>
        <NameText>{name} - {color}</NameText>
        {userDescription && (
          <span>
            <p>
              {userDescription}: {userName}&nbsp;
              <ProfileLink onClick={onClickProfile} href="#">Visitar Perfil</ProfileLink>
            </p>
          </span>
        )}
        <p>
          Data de Devolução: <ContrastText>{moment(devolutionDate).format('DD/MM/YYYY')}</ContrastText>&nbsp;
          {daysLeft >= 0 && <DaysLeftText>(Falta {daysLeft} dias)</DaysLeftText>}
        </p>
        <p>Valor de Aluguel: <ContrastText>R$ {rentValue.toFixed(2).replace('.', ',')}</ContrastText></p>

        {paymentStatusDescription && (
          <p>Resgate: {paymentStatusDescription}</p>
        )}

        {!paymentStatus && status === 'FINISHED' && (
          <ButtonWrapper><RentButton type="primary">ALUGAR NOVAMENTO</RentButton></ButtonWrapper>
        )}
      </TextWrapper>
    </Container>
  );
};

DetailCard.propTypes = {
  image: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["APPROVED", "SEPARATION", "FINISHED"]).isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  owner: PropTypes.string,
  client: PropTypes.string,
  devolutionDate: PropTypes.string.isRequired,
  rentValue: PropTypes.string.isRequired,
  paymentStatus: PropTypes.oneOf(["AVAILABLE", "PROCESS"]),
  onClickProfile: PropTypes.func.isRequired
}

export default DetailCard;