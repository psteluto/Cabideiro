import React, {Component} from 'react';
import styled from 'styled-components';
import Logotipo from '../../components/Logotipo'
import CreditCard from '../../components/CreditCard'
import TextStyle from '../../components/TextStyle';
import Details1 from '../../images/details-1.png';
import {Row, Col, Divider, Button, Collapse, Modal, Input} from 'antd';

const { Panel } = Collapse;

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
   height: 152px;
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
         modalAddress: false
      }
   }

   changeFields = (field, value) => {
      const fields = {
         ...this.state.fields,
         [field]: value
      }
      this.setState({fields})
   }
   
   saveAddress = () => {
      const {fields} = this.state;
      //TODO
   }

   render() {
      const {modalAddress} = this.state;

      return(
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
                    <TextStyle color="#262626">Av. Lins de Vasconcelos, 1222 - Aclimação, São Paulo - SP, 01538-001</TextStyle>
                    <RowDescriptionItem marginTop="16px" aling="text-align: end">
                       <a onClick={()=>this.setState({modalAddress: true})}>
                          <TextStyle color="#262626" strong underline>Editar endereço</TextStyle>
                       </a>
                       <Divider/>
                    </RowDescriptionItem>
                    <RowDescriptionItem marginBottom="16px">
                       <TextStyle color="#262626" fontSize="14px" strong>OPÇÕES DE ENTREGA</TextStyle>
                    </RowDescriptionItem>
                    <TextStyle color="#262626">SEDEX</TextStyle>
                    <TextStyle color="#262626" strong>R$ 11,00</TextStyle>
                    <TextStyle color="#262626" >Previsto até 17/06/2020</TextStyle>
                    <RowDescriptionItem marginTop="16px" aling="text-align: end">
                       <TextStyle color="#262626" strong underline>Editar opção de entrega</TextStyle>
                       <Divider />
                    </RowDescriptionItem>
                    <RowDescriptionItem>
                       <Collapse defaultActiveKey={['1']} ghost>
                          <Panel header="CUPONS, VALES OU CARTÕES PRESENTE" >

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
                                <ImageStyle src={Details1}/>
                             </ImageWrapper>
                          </ResumeRow>
                       </Col>
                       <Col span={12}>
                          <ResumeRow aling="text-align: center">
                             <TextStyle color="#262626" strong>Blusa Chiffon Recorte nas Mangas - Azul Marinho</TextStyle>
                             <TextStyle color="#e73554" fontSize="13px" marginTop="22px" strong>R$ 69,90</TextStyle>
                             <TextStyle color="#000000" fontSize="10px" marginTop="13px">TAMANHO: M</TextStyle>
                             <TextStyle color="#000000" fontSize="10px">MARCA: Riachuelo</TextStyle>
                          </ResumeRow>
                       </Col>
                       <Divider/>
                    </Row>
                    <Row>
                       <Col span={12}>
                          <ResumeRow>
                             <TextStyle color="#262626" fontSize="10px">SUBTOTAL:</TextStyle>
                             <TextStyle color="#262626" fontSize="10px" marginTop="8px">FRETE:</TextStyle>
                          </ResumeRow>
                       </Col>
                       <Col span={12}>
                          <ResumeRow aling="margin-top: -15px" aling="text-align: end">
                             <TextStyle color="#262626" fontSize="10px" strong>R$ 69,90</TextStyle>
                             <TextStyle color="#262626" fontSize="10px" marginTop="8px" strong>R$ 11,00</TextStyle>
                          </ResumeRow>
                       </Col>
                       <Divider/>
                    </Row>
                    <Row>
                       <TextStyle color="#262626">TOTAL:  R$</TextStyle>
                       <TextStyle color="#262626" marginLeft="3px" marginBottom="16px" strong>80,90</TextStyle>
                    </Row>
                    <Row>
                       <ButtonStyle type="primary" block>FINALIZAR ALUGUEL</ButtonStyle>
                    </Row>
                 </ResumeWrapper>
              </Col>
           </Row>

           <Modal
             visible={modalAddress}
             title="Alterar Endereço"
             onCancel={()=>this.setState({modalAddress: false})}
             footer={[
                <Button key="back" onClick={()=>this.setState({modalAddress: false})}>Voltar</Button>,
                <ButtonStyle type="primary" onClick={this.saveAddress}>Alterar</ButtonStyle>
             ]}
           >
              <Row gutter={[14, 14]}>
                 <Col span={12}>
                    <TextStyle color="#656668">CEP</TextStyle>
                    <Input onChange={(e) => this.changeFields('zipcode', e.target.value)} placeholder="00000-000"/>
                 </Col>
                 <Col span={12}>
                    <TextStyle color="#656668">Estado</TextStyle>
                    <Input onChange={(e) => this.changeFields('state', e.target.value)}/>
                 </Col>
                 <Col span={12}>
                    <TextStyle color="#656668">Cidade</TextStyle>
                    <Input onChange={(e) => this.changeFields('city', e.target.value)}/>
                 </Col>
                 <Col span={12}>
                    <TextStyle color="#656668">Bairro</TextStyle>
                    <Input onChange={(e) => this.changeFields('neighborhood', e.target.value)}/>
                 </Col>
                 <Col span={24}>
                    <TextStyle color="#656668">Rua / Avenida</TextStyle>
                    <Input onChange={(e) => this.changeFields('street', e.target.value)}/>
                 </Col>
                 <Col span={12}>
                    <TextStyle color="#656668">Número</TextStyle>
                    <Input onChange={(e) => this.changeFields('number', e.target.value)}/>
                 </Col>
                 <Col span={12}>
                    <TextStyle color="#656668">Complemento</TextStyle>
                    <Input onChange={(e) => this.changeFields('complement', e.target.value)}/>
                 </Col>
              </Row>
           </Modal>
        </div>
      )
   }
}

export default Checkout;