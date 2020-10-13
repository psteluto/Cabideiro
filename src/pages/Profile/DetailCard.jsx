import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Input, Rate} from "antd";
import moment from 'moment';
import Card from '../../components/Card';
import ButtonStyle from "../../components/ButtonStyle";
import TextStyle from "../../components/TextStyle";

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
  margin: 5px 0;
`;

const DetailCard = ({image, status, name, color, owner, client, devolutionDate,
                      rentValue, paymentStatus, onClickProfile, onClickProduct,
                      onSendTrack, onSendEvaluation, hasReview}) => {

  const [trackOpt, setTrackOpt] = useState(false);
  const [evaluationOpt, setEvaluationOpt] = useState(false);

  rentValue = Number(rentValue);

  const daysLeft = moment(devolutionDate, 'DD/MM/YYYY').diff(moment(), "days");

  let userDescription = "";
  if (owner) userDescription = "Proprietário";
  if (client) userDescription = "Cliente";

  const userName = owner || client || "";

  const sendTrackOpt = () => {
    setTrackOpt(false)
    onSendTrack()
  }

  const sendEvaluation = () => {
    setEvaluationOpt(false)
    onSendEvaluation()
  }

  return (
    <Container>

      <Card
        imageUrl={image}
        name={`${name} - ${color}`}
        width={185}
        onClick={onClickProduct}
      />

      <TextWrapper>
        <StatusText>Status {status === 'Finalizado' ? status : (<span>{status}</span>)}</StatusText>
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

        {status === 'Enviado' && (
          <ProfileLink href="#">Acompanhar entrega</ProfileLink>
        )}
        {status === 'Em devolução' && (
          <ProfileLink href="#">Acompanhar devolução</ProfileLink>
        )}

        {(status === 'Entregue' || (paymentStatus && status === 'Em separação')) && (
          <span>
            <ButtonWrapper>
              <ButtonStyle
                onClick={() => setTrackOpt(true)}
                backColorButtom="background-color: #e73554"
                backHoverButton="#e73554"
                colorButton="#ffffff"
                color="#000000"
                width="100%"
              >
                {paymentStatus ? "PRODUTO ENVIADO" : "PRODUTO DEVOLVIDO"}
              </ButtonStyle>
            </ButtonWrapper>
            {trackOpt && (
              <span>
                <Input placeholder="Cód. Rastreio"/>
                <ButtonStyle
                  onClick={sendTrackOpt}
                  backColorButtom="background-color: #ffcb00"
                  width="100%"
                >
                    ENVIAR
                </ButtonStyle>
              </span>
            )}
          </span>
        )}

        {status === 'Devolvido' && !hasReview && (
          <span>
            <ButtonWrapper>
              <ButtonStyle
                onClick={() => setEvaluationOpt(true)}
                backColorButtom="background-color: #e73554"
                backHoverButton="#e73554"
                colorButton="#ffffff"
                color="#000000"
                width="100%"
              >
                {paymentStatus ? "AVALIE O LOCATÁRIO" : "AVALIE O LOCADOR E O PRODUTO"}
              </ButtonStyle>
            </ButtonWrapper>
            {evaluationOpt && (
              <span>
                <TextStyle color="#262626">Avaliação</TextStyle>
                <Input.TextArea
                  rows={3}
                />
                <Rate defaultValue={0}/>
                <ButtonStyle
                  onClick={sendEvaluation}
                  backColorButtom="background-color: #ffcb00"
                  width="100%"
                >
                    ENVIAR
                </ButtonStyle>
              </span>
            )}
          </span>
        )}
      </TextWrapper>
    </Container>
  );
};

DetailCard.propTypes = {
  image: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["Em aprovação", "Em separação", "Em devolução", "Enviado", "Entregue", "Finalizado", "Devolvido"]).isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  owner: PropTypes.string,
  client: PropTypes.string,
  devolutionDate: PropTypes.string.isRequired,
  rentValue: PropTypes.string.isRequired,
  paymentStatus: PropTypes.oneOf(["Aprovado"]),
  onClickProfile: PropTypes.func.isRequired,
  onClickProduct: PropTypes.func.isRequired,
  onSendTrack: PropTypes.func,
  onSendEvaluation: PropTypes.func,
  hasReview: PropTypes.bool
}

export default DetailCard;