import React, {Component} from 'react';
import styled from 'styled-components';
import {Row, Col, Button, Collapse, Input, Alert} from 'antd';
import Logotipo from '../../components/Logotipo'
import Menu from '../../components/Menu';
import Details1 from '../../images/details-1.png';
import Details2 from '../../images/details-2.png';
import Details3 from '../../images/details-3.png';
import TextStyle from '../../components/TextStyle';
import ProductService from '../../services/Product';

const {Panel} = Collapse;

const LogoWrapper = styled.div`
   text-align: center;
`;

const ButtonStyle = styled(Button)`
   color: ${props => props.colorButton || "#000000"};
   border: #ffffff;
   &:hover {
      background: ${props => props.backHoverButton || "#ffcb00"};     
    } 
   ${props => props.backColorButtom || ""};
   margin-top: 15px;
   width: 240px;
   height: 30px;
`;

const ColImage = styled.div`
   margin-top: 64px;
   margin-bottom: 48px;
   margin-left: 170px;
   width: 360px;
   height: 500px;
`;

const ColImages = styled.div`
   width: 122px;
   height: 152px;
   margin-top: 64px;
   margin-left: 242px;
`;

const ColDescription = styled.div`
   width: 240px;
   margin-top: 64px;
   margin-left: 30px;
`;

const RowDescriptionItem = styled.div`  
   margin-bottom: ${props => props.marginBottom || "0"};
   ${props => props.aling || "0"};
`;

const ImageWrapper = styled.img`
   width: 100%;
   height: 100%;
`;


class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      showShipping: false,
      showProposal: false,
      shippingPrice: 0,
      zipCode: "",
      proposeValue: "",
      proposeDays: "",
      successMsg: ""
    }
  }

  componentDidMount() {
    this.getProduct();
  }

  changeField = (field, value) => {
    this.setState({[field]: value});
  }

  getProduct = async () => {
    const {match} = this.props;
    const res = await ProductService.getOne(match.params.id)
    this.setState({product: res.data})
  }

  clickRent = () => {
    const {match, history} = this.props;
    const {id} = match.params;

    history.push(`/product/${id}/checkout`);
  }

  calculateShipping = async () => {
    const {zipCode} = this.state;
    if (!zipCode) return;
    const res = await ProductService.calculateShipping(zipCode);
    this.setState({shippingPrice: res.data})
  }

  sendPropose = async () => {
    const {proposeValue, proposeDays} = this.state;
    if (!proposeValue || !proposeDays) return;
    await ProductService.sendPropose(proposeValue, proposeDays);
    this.setState({successMsg: "Proposta enviada com sucesso"});
  }

  render() {
    const {product, showShipping, showProposal, shippingPrice, successMsg} = this.state;

    return (
      <div>
        <LogoWrapper>
          <Logotipo/>
          <Menu/>
        </LogoWrapper>
        <Row>
          <Col span={4}>
            <ColImages>
              <RowDescriptionItem marginBottom="16px">
                {product.image_products && product.image_products[1] && product.image_products[1].image_url && (
                  <ImageWrapper src={product.image_products && product.image_products[1].image_url}></ImageWrapper>
                )}
              </RowDescriptionItem>
              <RowDescriptionItem marginBottom="16px">
                {product.image_products && product.image_products[2] && product.image_products[2].image_url && (
                  <ImageWrapper src={product.image_products && product.image_products[2].image_url}></ImageWrapper>
                )}
              </RowDescriptionItem>
              <RowDescriptionItem>
                {product.image_products && product.image_products[3] && product.image_products[3].image_url && (
                  <ImageWrapper src={product.image_products && product.image_products[3].image_url}></ImageWrapper>
                )}
              </RowDescriptionItem>
            </ColImages>
          </Col>
          <Col span={10}>
            <ColImage>
              <ImageWrapper src={product.image_products && product.image_products[0].image_url}></ImageWrapper>
            </ColImage>
          </Col>
          <Col span={10}>
            <ColDescription>
              <RowDescriptionItem aling="text-align: center">
                <RowDescriptionItem marginBottom="22px">
                  <TextStyle color="#262626" strong>{product.name}</TextStyle>
                </RowDescriptionItem>
                <RowDescriptionItem marginBottom="10px">
                  <TextStyle color="#e73554" strong>
                    R$ {Number(product.price).toFixed(2).replace('.',',')}
                  </TextStyle>
                </RowDescriptionItem>
                <RowDescriptionItem>
                  <TextStyle color="#000000">TAMANHO: </TextStyle>
                  <TextStyle color="#000000" strong>{product.size}</TextStyle>
                </RowDescriptionItem>
                <RowDescriptionItem>
                  <TextStyle color="#000000" marginBottom="24px">MARCA: </TextStyle>
                  <TextStyle color="#000000" marginBottom="24px" strong>{product.brand && product.brand.name}</TextStyle>
                </RowDescriptionItem>
              </RowDescriptionItem>
              <RowDescriptionItem>
                <ButtonStyle onClick={this.clickRent} type="primary">ALUGAR</ButtonStyle>
              </RowDescriptionItem>
              <RowDescriptionItem marginBottom="10px">
                <ButtonStyle type="primary" backColorButtom="background-color: #e73554" backHoverButton="#e73554"
                             colorButton="#ffffff" onClick={() => this.setState({showProposal: true})}>
                  FAZER PROPOSTA
                </ButtonStyle>
              </RowDescriptionItem>
              <RowDescriptionItem marginBottom="10px">
                {showProposal && (
                  <span>
                    <Input onChange={(e) => this.changeField('proposeValue', e.target.value)} placeholder="Valor"/>
                    <Input onChange={(e) => this.changeField('proposeDays', e.target.value)} placeholder="Qtd de Dias"/>
                    <ButtonStyle type="primary" backColorButtom="background-color: #e73554" backHoverButton="#e73554"
                                 colorButton="#ffffff" onClick={this.sendPropose}>
                      ENVIAR PROPOSTA
                    </ButtonStyle>
                  </span>
                )}
                {successMsg && (
                  <Row>
                    <Col span={24}>
                      <Alert message={successMsg} type="success" showIcon />
                    </Col>
                  </Row>
                )}
              </RowDescriptionItem>
              <RowDescriptionItem marginBottom="56px">
                <a href='#' onClick={() => this.setState({showShipping: true})}>
                  <TextStyle color="#1f89e5">Calcule o frete</TextStyle>
                </a>
                {showShipping && (
                  <span>
                    <Input onChange={(e) => this.changeField('zipCode', e.target.value)} placeholder="00000-000"/>
                    {!!shippingPrice && (
                      <TextStyle color="#e73554" strong>R$ {shippingPrice.toFixed(2).replace('.', ',')}</TextStyle>
                    )}
                    <ButtonStyle onClick={this.calculateShipping} type="primary">Calcular</ButtonStyle>
                  </span>
                )}
              </RowDescriptionItem>

              <RowDescriptionItem marginBottom="18px">
                <Collapse defaultActiveKey={['0']} ghost>
                  <Panel header="DETALHES">
                    <TextStyle color="#262626">{product.description}</TextStyle>
                  </Panel>
                </Collapse>

                <Collapse defaultActiveKey={['0']} ghost>
                  <Panel header="Mais Informações">
                    <TextStyle color="#262626">
                      Proprietário:&nbsp;
                      <a href="#">{product.user && product.user.name}&nbsp;</a>
                    </TextStyle>
                  </Panel>
                </Collapse>
              </RowDescriptionItem>
            </ColDescription>
          </Col>
        </Row>
      </div>
    )
  }

}

export default Details;