import React, {Component} from 'react';
import styled from 'styled-components';
import {Row, Col, Divider, Button, Collapse, Modal, Input, Alert} from 'antd';
import MaskedInput from 'antd-mask-input'
import Logotipo from '../../components/Logotipo'
import CreditCard from '../../components/CreditCard'
import TextStyle from '../../components/TextStyle';
import UserService from '../../services/User';
import ProductService from "../../services/Product";

const {Panel} = Collapse;

const LogoWrapper = styled.div`
   text-align: center;
`;

const RowDescriptionWrapper = styled.div`
   display: flex;
   flex-direction: column;
   margin-left: 240px;
`;

const RowDescriptionItem = styled.div`  
   margin-bottom: ${props => props.marginBottom || "0"};
   margin-top: ${props => props.marginTop || "0"};
   ${props => props.aling || "0"};
`;

const ResumeWrapper = styled.div`
   margin-left: 38px;
   margin-right: 240px;
`;

const ResumeRow = styled.div`
    display: flex;
    flex-direction: column;
    ${props => props.aling || "0"};
`;

const ImageWrapper = styled.div`
   width: 122px;
`;

const ImageStyle = styled.img`
   width: 100%;
   height: 100%;
`;

const ButtonStyle = styled(Button)`
   color: #000000;
`;

const ButtonPayment = styled(Button)`
    width: 50%;
    
    &:hover {
        background-color: ${props => props.backHoverButton || "#ea3251"};
      }
    &:hover {
        color: ${props => props.backHoverButton || "#ffffff"};
    }
    &:hover {
        border: ${props => props.backHoverButton || "#ffffff"};
    } 
    ${props => props.backColorButtom || ""};
`;

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        zipcode: "",
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        number: "",
        complement: ""
      },
      coupon: "",
      discount: 0,
      modalAddress: false,
      product: {},
      shippingPrice: 0,
      modalErrorMsg: "",
      couponErrorMsg: "",
      couponSuccessMsg: ""
    }
  }

  componentDidMount() {
    this.getAddress();
    this.getProduct();
  }

  changeFields = (field, value) => {
    const fields = {
      ...this.state.fields,
      [field]: value
    }
    this.setState({fields})
  }

  getProduct = async () => {
    const {match} = this.props;
    const res = await ProductService.getOne(match.params.id);
    this.setState({product: res.data});
  }

  getAddress = async () => {
    const res = await UserService.getAddress();
    const {
      zipcode, state, city, neighborhood,
      street, number, complement
    } = res.data;

    this.setState({
      fields: {
        zipcode, state, city, neighborhood,
        street, number, complement
      }
    });

    await this.calculateShipping();
  }

  saveAddress = async () => {
    const {fields} = this.state;
    if (this.validateForm(fields)) {
      await UserService.updateAddress(fields);
      this.setState({modalAddress: false});
      await this.calculateShipping();
      this.setState({modalErrorMsg: ""});
    }
  }

  calculateShipping = async () => {
    const {fields} = this.state;
    const res = await ProductService.calculateShipping(fields.zipcode);
    this.setState({shippingPrice: res.data})
  }

  validateForm = (fields) => {
    const {zipcode, state, city, neighborhood, street, number, complement} = fields;

    let msg = "";
    if (!zipcode) msg += "Campo 'CEP' é obrigatório\n";
    if (!state) msg += "Campo 'Estado' é obrigatório\n";
    if (!city) msg += "Campo 'Cidade' é obrigatório\n";
    if (!neighborhood) msg += "Campo 'Bairro' é obrigatório\n";
    if (!street) msg += "Campo 'Rua' é obrigatório\n";
    if (!number) msg += "Campo 'Número' é obrigatório\n";
    if (!complement) msg += "Campo 'Complemento' é obrigatório\n";

    if (msg) {
      this.setState({modalErrorMsg: msg});
      return false;
    }

    return true;
  }

  sendCoupon = async () => {
    const {coupon} = this.state;
    try {
      const res = await ProductService.validateCoupon(coupon);
      this.setState({couponSuccessMsg: "Cupom aplicado com sucesso!", discount: res.data})
    } catch (e) {
      this.setState({couponErrorMsg: "Cupom inválido"})
    }
  }

  registerOrder = async () => {
    const {product} = this.state;
    const {history} = this.props;

    await ProductService.registerOrder(product.id, product.user.id);
    history.push("/success")
  }

  render() {
    const {modalAddress, fields, product, shippingPrice, discount, modalErrorMsg, couponErrorMsg, couponSuccessMsg} = this.state;

    const price = Number(product.price);
    const discountPrice = price * (discount/100);
    const totalPrice = price - discountPrice + shippingPrice;

    return (
      <div>
        <LogoWrapper>
          <Logotipo/>
        </LogoWrapper>
        <Row>
          <Col span={14}>
            <RowDescriptionWrapper>
              <RowDescriptionItem marginBottom="16px">
                <TextStyle color="#262626" fontSize="14px" strong>ENDEREÇO</TextStyle>
              </RowDescriptionItem>
              <TextStyle color="#262626">
                {fields.street}, {fields.number} - {fields.neighborhood}, {fields.city} - {fields.state}, {fields.zipcode}
              </TextStyle>
              <RowDescriptionItem marginTop="16px" aling="text-align: end">
                <a onClick={() => this.setState({modalAddress: true})}>
                  <TextStyle color="#262626" strong underline>Editar endereço</TextStyle>
                </a>
                <Divider/>
              </RowDescriptionItem>
              <RowDescriptionItem marginBottom="16px">
                <TextStyle color="#262626" fontSize="14px" strong>OPÇÕES DE ENTREGA</TextStyle>
              </RowDescriptionItem>
              <TextStyle color="#262626">SEDEX</TextStyle>
              <TextStyle color="#262626" strong>R$ 11,00</TextStyle>
              <TextStyle color="#262626">Previsto até 17/06/2020</TextStyle>
              <RowDescriptionItem marginTop="16px" aling="text-align: end">
                <TextStyle color="#262626" strong underline>Editar opção de entrega</TextStyle>
                <Divider/>
              </RowDescriptionItem>
              <RowDescriptionItem>
                <Collapse defaultActiveKey={['1']} ghost>
                  <Panel header="CUPONS, VALES OU CARTÕES PRESENTE">
                    <Input
                      onChange={(e) => this.setState({coupon: e.target.value})}
                      style={{marginBottom: 8}} placeholder="Código"
                    />
                    <ButtonStyle type="primary" onClick={this.sendCoupon}>Aplicar</ButtonStyle>
                    {couponErrorMsg && (
                      <Alert
                        style={{whiteSpace: 'pre'}}
                        message={couponErrorMsg}
                        type="error"
                        showIcon
                      />
                    )}
                    {couponSuccessMsg && (
                      <Alert
                        style={{whiteSpace: 'pre'}}
                        message={couponSuccessMsg}
                        type="success"
                        showIcon
                      />
                    )}
                  </Panel>
                </Collapse>
                <Divider/>
              </RowDescriptionItem>
              <RowDescriptionItem marginBottom="16px">
                <TextStyle color="#262626" fontSize="14px" strong>FORMAS DE PAGAMENTO</TextStyle>
              </RowDescriptionItem>
              <RowDescriptionItem>
                <Row>
                  <ButtonPayment type="primary" backColorButtom="background-color: #ea3251">CARTÃO</ButtonPayment>
                  <ButtonPayment>BOLETO</ButtonPayment>
                </Row>
                <CreditCard/>
              </RowDescriptionItem>
            </RowDescriptionWrapper>
          </Col>
          <Col span={10}>
            <ResumeWrapper>
              <TextStyle color="#262626" strong>RESUMO DO PEDIDO</TextStyle>
              <Divider/>
              <Row>
                <Col span={12}>
                  <ResumeRow>
                    <ImageWrapper>
                      <ImageStyle src={product.image_products && product.image_products[0].image_url}/>
                    </ImageWrapper>
                  </ResumeRow>
                </Col>
                <Col span={12}>
                  <ResumeRow aling="text-align: center">
                    <TextStyle color="#262626" strong>{product.name} - {product.color}</TextStyle>
                    <TextStyle color="#e73554" fontSize="13px" marginTop="22px" strong>
                      R$ {price.toFixed(2).replace('.', ',')}
                    </TextStyle>
                    <TextStyle color="#000000" fontSize="10px" marginTop="13px">TAMANHO: {product.size}</TextStyle>
                    <TextStyle color="#000000" fontSize="10px">MARCA: {product.brand && product.brand.name}</TextStyle>
                  </ResumeRow>
                </Col>
                <Divider/>
              </Row>
              <Row>
                <Col span={12}>
                  <ResumeRow>
                    <TextStyle color="#262626" fontSize="10px">SUBTOTAL:</TextStyle>
                    {discount ? (<TextStyle color="#262626" fontSize="10px" marginTop="8px">DESCONTO:</TextStyle>) : null}
                    <TextStyle color="#262626" fontSize="10px" marginTop="8px">FRETE:</TextStyle>
                  </ResumeRow>
                </Col>
                <Col span={12}>
                  <ResumeRow aling="margin-top: -15px" aling="text-align: end">
                    <TextStyle color="#262626" fontSize="10px" strong>
                      R$ {price.toFixed(2).replace('.', ',')}
                    </TextStyle>
                    {discount ? (
                      <TextStyle color="#262626" fontSize="10px" strong>
                        R$ {discountPrice.toFixed(2).replace('.', ',')}
                      </TextStyle>
                    ) : null}
                    <TextStyle color="#262626" fontSize="10px" marginTop="8px" strong>
                      R$ {shippingPrice.toFixed(2).replace('.', ',')}
                    </TextStyle>
                  </ResumeRow>
                </Col>
                <Divider/>
              </Row>
              <Row>
                <TextStyle color="#262626">TOTAL: R$</TextStyle>
                <TextStyle color="#262626" marginLeft="3px" marginBottom="16px" strong>
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </TextStyle>
              </Row>
              <Row>
                <ButtonStyle type="primary" block onClick={this.registerOrder}>FINALIZAR ALUGUEL</ButtonStyle>
              </Row>
            </ResumeWrapper>
          </Col>
        </Row>

        <Modal
          visible={modalAddress}
          title="Alterar Endereço"
          onCancel={() => this.setState({modalAddress: false})}
          footer={[
            <Button key="back" onClick={() => this.setState({modalAddress: false})}>Voltar</Button>,
            <ButtonStyle type="primary" onClick={this.saveAddress}>Alterar</ButtonStyle>
          ]}
        >
          <Row gutter={[14, 14]}>
            <Col span={12}>
              <TextStyle color="#656668">CEP</TextStyle>
              <MaskedInput
                mask="11111-111"
                value={fields.zipcode}
                onChange={(e) => this.changeFields('zipcode', e.target.value)}
                placeholder="00000-000"
              />
            </Col>
            <Col span={12}>
              <TextStyle color="#656668">Estado</TextStyle>
              <Input
                value={fields.state}
                onChange={(e) => this.changeFields('state', e.target.value)}
              />
            </Col>
            <Col span={12}>
              <TextStyle color="#656668">Cidade</TextStyle>
              <Input
                value={fields.city}
                onChange={(e) => this.changeFields('city', e.target.value)}
              />
            </Col>
            <Col span={12}>
              <TextStyle color="#656668">Bairro</TextStyle>
              <Input
                value={fields.neighborhood}
                onChange={(e) => this.changeFields('neighborhood', e.target.value)}
              />
            </Col>
            <Col span={24}>
              <TextStyle color="#656668">Rua / Avenida</TextStyle>
              <Input
                value={fields.street}
                onChange={(e) => this.changeFields('street', e.target.value)}
              />
            </Col>
            <Col span={12}>
              <TextStyle color="#656668">Número</TextStyle>
              <Input
                value={fields.number}
                onChange={(e) => this.changeFields('number', e.target.value)}
              />
            </Col>
            <Col span={12}>
              <TextStyle color="#656668">Complemento</TextStyle>
              <Input
                value={fields.complement}
                onChange={(e) => this.changeFields('complement', e.target.value)}
              />
            </Col>
          </Row>
          {modalErrorMsg && (
            <Row>
              <Col span={24}>
                <Alert
                  style={{whiteSpace: 'pre'}}
                  message={modalErrorMsg}
                  type="error"
                  showIcon
                />
              </Col>
            </Row>
          )}
        </Modal>
      </div>
    )
  }
}

export default Checkout;