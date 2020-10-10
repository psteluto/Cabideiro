import React from 'react';
import styled from 'styled-components';
import {Row, Col, Checkbox, Input} from 'antd';
import MaskedInput from 'antd-mask-input'
import ImageCard from '../../images/card.png'
import TextStyle from '../TextStyle';

const ImageStyle = styled.img`
    margin-top: 18px;
    width: 100%;
    height: 35%;
`;

const NumbersRow = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
`;

const CreditCard = () => {
  return (
    <div>
      <Row>
        <Col span={10}>
          <ImageStyle src={ImageCard}/>
        </Col>
        <Col span={14}>
          <NumbersRow>
            <TextStyle color="#656668" marginTop="18px">Número do cartão</TextStyle>
            <MaskedInput
              mask="1111 1111 1111 1111"
              style={{width: '100%', marginTop: '8px', marginBottom: '16px'}}
            />
            <TextStyle color="#656668">Nome impresso no cartão</TextStyle>
            <Input style={{width: '100%', marginTop: '8px', marginBottom: '16px'}}></Input>
          </NumbersRow>
          <Row>
            <Col status={12}>
              <NumbersRow>
                <TextStyle color="#656668">Validade</TextStyle>
                <MaskedInput
                  mask="11/11"
                  style={{width: '121px', marginTop: '8px', marginBottom: '16px'}}
                />
              </NumbersRow>
            </Col>
            <Col status={12}>
              <NumbersRow>
                <TextStyle color="#656668" marginLeft="14px">CVV</TextStyle>
                <MaskedInput
                  mask="111"
                  style={{width: '121px', marginLeft: '14px', marginTop: '8px', marginBottom: '16px'}}
                />
              </NumbersRow>
            </Col>
            <Checkbox style={{marginLeft: '16px', marginBottom: '84px'}}>
              <TextStyle color="#656668">Salvar esse cartão para compras futuras</TextStyle>
            </Checkbox>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CreditCard;