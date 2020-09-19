import React, {Component} from 'react';
import {Button, Card, Checkbox, Col, Input, List, Row, Select, Upload} from "antd";
import ListImage1 from "../../images/image1.jpg";
import ListImage2 from "../../images/image2.jpg";
import ListImage3 from "../../images/image3.jpg";
import TextStyle from "../../components/TextStyle";
import ImgCrop from "antd-img-crop";
import styled from "styled-components";

const {TextArea} = Input;
const {Option, OptGroup} = Select;
const {Meta} = Card;

const ItensWrapper = styled.div`
   padding: 16px ${props => props.paddingRight || "0"} 0 0;
`;

const ButtonWrapper = styled.div`
   display: flex;
`;

const ButtonStyle = styled(Button)`
   color: ${props => props.colorButton || "#000000"};
   border: #ffffff;
   &:hover { 
      background: ${props => props.backHoverButton || "#ffcb00"}; 
      color: ${props => props.color || "#ffffff"};   
    } 
   ${props => props.backColorButtom || ""};
   margin-top: 15px;
   width: ${props => props.width || "185px"};
   height: 30px;
   margin-right: ${props => props.marginRight || "0"};
   font-size: 12px;   
`;

const CardWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

class MyCloset extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col span={10}>
          <CardWrapper>
            <ButtonStyle backColorButtom="background-color: #e73554" backHoverButton="#e73554"
                         colorButton="#ffffff" color="#000000">+ Nova Peça</ButtonStyle>
            <List style={{marginTop: 20}}>
              <Card style={{width: 185, marginBottom: 16}} cover={<img src={ListImage1}/>}>
                <Meta style={{fontSize: "12px"}} description="Blusa Floral"/>
              </Card>
              <Card hoverable style={{width: 185, marginBottom: 16}} cover={<img src={ListImage2}/>}>
                <Meta style={{fontSize: "12px"}} description="Calça Básica"/>
              </Card>
              <Card hoverable style={{width: 185, marginBottom: 16}} cover={<img src={ListImage3}/>}>
                <Meta style={{fontSize: "12px"}} description="Blusa Chiffon"/>
              </Card>
            </List>
          </CardWrapper>
        </Col>
        <Col span={14}>
          <TextStyle color="#262626">Nome</TextStyle>
          <Input/>
          <Row>
            <Col span={8}>
              <ItensWrapper paddingRight="16px">
                <TextStyle color="#262626">Valor</TextStyle>
                <Input placeholder="R$"/>
              </ItensWrapper>
            </Col>
            <Col span={8}>
              <ItensWrapper paddingRight="16px">
                <TextStyle color="#262626">Tamanho</TextStyle>
                <Input/>
              </ItensWrapper>
            </Col>
            <Col span={8}>
              <ItensWrapper>
                <TextStyle color="#262626">Cor</TextStyle>
                <Input/>
              </ItensWrapper>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <ItensWrapper paddingRight="16px">
                <TextStyle color="#262626">Marca</TextStyle>
                <Input/>
              </ItensWrapper>
            </Col>
            <Col span={12}>
              <ItensWrapper>
                <TextStyle color="#262626">Tempo Máximo de Locação</TextStyle>
                <Input/>
              </ItensWrapper>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <ItensWrapper paddingRight="16px">
                <TextStyle color="#262626">Gênero da Peça</TextStyle>
                <Select style={{width: "100%"}}>
                  <Option value="1">Feminino</Option>
                  <Option value="2">Masculino</Option>
                  <Option value="3">Unissex</Option>
                </Select>
              </ItensWrapper>
            </Col>
            <Col span={12}>
              <ItensWrapper>
                <TextStyle color="#262626">Categoria da Peça</TextStyle>
                <Select style={{width: "100%"}}>
                  <OptGroup label="Roupas">
                    <Option value="1">Vestidos</Option>
                    <Option value="2">Saias</Option>
                    <Option value="3">Blusas</Option>
                  </OptGroup>
                  <OptGroup label="Acessórios">
                    <Option value="4">Brinco</Option>
                    <Option value="5">Colar</Option>
                    <Option value="6">Anel</Option>
                    <Option value="7">Cinto</Option>
                    <Option value="8">Bolsa</Option>
                  </OptGroup>
                  <OptGroup label="Calçados">
                    <Option value="9">Scarpin</Option>
                    <Option value="10">Botas</Option>
                    <Option value="11">Peep Tue</Option>
                    <Option value="12">Sandálias</Option>
                    <Option value="13">Tênis</Option>
                  </OptGroup>
                </Select>
              </ItensWrapper>
            </Col>
          </Row>
          <ItensWrapper>
            <Checkbox style={{fontSize: "12px"}}>Aceita proposta de valor</Checkbox>
          </ItensWrapper>
          <ItensWrapper>
            <Checkbox style={{fontSize: "12px"}}>Aceita proposta no tempo de locação</Checkbox>
          </ItensWrapper>
          <ItensWrapper>
            <TextStyle color="#262626">Descrição</TextStyle>
            <TextArea rows={3}/>
          </ItensWrapper>
          <ItensWrapper>
            <List style={{padding: "7px 0 7px 0"}}>
              <ImgCrop>
                <Upload listType="picture-card">+ Upload</Upload>
              </ImgCrop>
            </List>
          </ItensWrapper>
          <ButtonWrapper>
            <ButtonStyle backColorButtom="background-color: #ffcb00" marginRight="5px" width="50%">SALVAR
              ALTERAÇÕES</ButtonStyle>
            <ButtonStyle backColorButtom="background-color: #e73554" backHoverButton="#e73554"
                         colorButton="#ffffff" color="#000000" width="50%">REMOVER DO CLOSET</ButtonStyle>
          </ButtonWrapper>
        </Col>
      </Row>
    );
  }
}

export default MyCloset;