import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Button} from "antd";
import moment from 'moment';
import Card from '../../components/Card';

const Container = styled.div`
  margin-right: 20px;
  margin-bottom: 30px;
  display: flex;
`;

const TextWrapper = styled.div`
  padding: 0 10px 0 15px;
  color: #262626;
  font-size: 12px;
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

const DetailCard = ({image, status, name, color, owner, client, devolutionDate, rentValue, paymentStatus, onClickProfile, onClickProduct}) => {
  rentValue = Number(rentValue);

  const daysLeft = moment(devolutionDate, 'DD/MM/YYYY').diff(moment(), "days");

  let userDescription = "";
  if (owner) userDescription = "Proprietário";
  if (client) userDescription = "Cliente";

  const userName = owner || client || "";

  return (
    <Container>

      <Card
        imageUrl={image}
        name={`${name} - ${color}`}
        width={185}
        onClick={onClickProduct}
      />

      <TextWrapper>
        <StatusText>Status {status === 'FINISHED' ? status : (<span>{status}</span>)}</StatusText>
        {userDescription && (
          <span>
            <p>
              {userDescription}:&nbsp;
              <ProfileLink onClick={onClickProfile} href="#">{userName}</ProfileLink>
            </p>
          </span>
        )}
        <p>
          Data de Devolução: <ContrastText>{devolutionDate}</ContrastText>&nbsp;
          {daysLeft >= 0 && <DaysLeftText>(Faltam {daysLeft} dias)</DaysLeftText>}
        </p>
        <p>Valor de Aluguel: <ContrastText>R$ {rentValue.toFixed(2).replace('.', ',')}</ContrastText></p>
        
        {paymentStatus && (
          <p>Resgate: {paymentStatus}</p>
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
  status: PropTypes.oneOf(["Em aprovação"]).isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  owner: PropTypes.string,
  client: PropTypes.string,
  devolutionDate: PropTypes.string.isRequired,
  rentValue: PropTypes.string.isRequired,
  paymentStatus: PropTypes.oneOf(["Aprovado"]),
  onClickProfile: PropTypes.func.isRequired,
  onClickProduct: PropTypes.func.isRequired
}

export default DetailCard;