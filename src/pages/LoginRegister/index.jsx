import React, {Component} from 'react';
import {Row, Col, Input, Button, Alert as AntdAlert} from 'antd';
import styled from 'styled-components';
import UserService from '../../services/User';
import Logotipo from '../../components/Logotipo'
import TextStyle from '../../components/TextStyle';
import BackgroundLogin from '../../images/background-login.jpg';

const Background = styled.div`
   background: url(${BackgroundLogin});
   background-size: contain;
`;

const FormWrapper = styled.div`
   background-color: #ffffff;
   width: 60%;
   margin: 0 auto;
`;

const LogoWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;

const FormStyle = styled.div`
   padding: 0px 115px 80px 115px;
`;

const ButtonStyle = styled(Button)`
   color: #000000;
   margin-top: 20px;
`;

const Alert = styled(AntdAlert)`
  white-space: pre;
`;

class LoginRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: "",
        email: "",
        cpf: "",
        cellphone: "",
        phone: "",
        password: "",
        confirmPassword: "",
        zipcode: "",
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        number: "",
        complement: ""
      },
      errorMsg: "",
      successMsg: ""
    }
  }

  changeFilter = (field, value) => {
    const fields = {
      ...this.state.fields,
      [field]: value
    }
    console.log(field, value)
    console.log(fields);
    this.setState({fields})
  }

  clickSubmit = async () => {
    const {history} = this.props;
    const {name, email, cpf, cellphone, phone, password,
      zipcode, state, city, neighborhood, street, number, complement} = this.state.fields;
    
    const valid = this.validateForm(this.state.fields);
    if (!valid) return;
    
    const {} = this.state;
    const userData = {
      name, email, cpf, cellphone, phone, password
    }
    const res = await UserService.signUp(userData);

    const addressData = {
      zipcode, state, city, neighborhood, street, number, complement,
      userId: res.data.id
    }
    await UserService.addAddress(addressData);

    this.setState({successMsg: "Usuário cadatrado com sucesso", errorMsg: ""});
    history.push('/login')
  }

  validateForm = (fields) => {
    const {name, email, cpf, cellphone, password, confirmPassword,
      zipcode, state, city, neighborhood, street, number} = fields;
    
    let msg = "";
    if (!name) msg += "Campo 'Nome Completo' é obrigatório\n";
    if (!email) msg += "Campo 'E-mail' é obrigatório\n";
    if (!cpf) msg += "Campo 'CPF' é obrigatório\n";
    if (!cellphone) msg += "Campo 'Celular' é obrigatório\n";
    if (!password) msg += "Campo 'Senha' é obrigatório\n";
    if (!confirmPassword) msg += "Campo 'Confirmar Senha' é obrigatório\n";
    if (!zipcode) msg += "Campo 'CEP' é obrigatório\n";
    if (!state) msg += "Campo 'Estado' é obrigatório\n";
    if (!city) msg += "Campo 'Cidade' é obrigatório\n";
    if (!neighborhood) msg += "Campo 'Bairro' é obrigatório\n";
    if (!street) msg += "Campo 'Rua' é obrigatório\n";
    if (!number) msg += "Campo 'Número' é obrigatório\n";

    if (msg) {
      this.setState({errorMsg: msg, successMsg: ""});
      return false;
    }

    if (password !== confirmPassword) {
      this.setState({errorMsg: "Senhas não são iguais", successMsg: ""})
      return false;
    }

    return true;
  }
  
  render() {
    const {errorMsg, successMsg} = this.state;
    return (
      <Background src={BackgroundLogin}>
        <FormWrapper>
          <LogoWrapper>
            <Logotipo/>
            <TextStyle color="#262626" fontSize="16px">CRIAR CONTA</TextStyle>
          </LogoWrapper>
          <FormStyle>
            <Row gutter={[14, 14]}>
              <Col span={24}>
                <TextStyle color="#656668">Nome completo</TextStyle>
                <Input onChange={(e) => this.changeFilter('name', e.target.value)}/>
              </Col>
              <Col span={24}>
                <TextStyle color="#656668">E-mail</TextStyle>
                <Input onChange={(e) => this.changeFilter('email', e.target.value)}/>
              </Col>
              <Col span={8}>
                <TextStyle color="#656668">CPF</TextStyle>
                <Input onChange={(e) => this.changeFilter('cpf', e.target.value)} placeholder="000.000.000-00"/>
              </Col>
              <Col span={8}>
                <TextStyle color="#656668">Celular</TextStyle>
                <Input onChange={(e) => this.changeFilter('cellphone', e.target.value)} placeholder="(00) 00000-0000"/>
              </Col>
              <Col span={8}>
                <TextStyle color="#656668">Telefone alternativo</TextStyle>
                <Input onChange={(e) => this.changeFilter('phone', e.target.value)} placeholder="(00) 00000-0000"/>
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">Senha</TextStyle>
                <Input onChange={(e) => this.changeFilter('password', e.target.value)}/>
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">Confirmar Senha</TextStyle>
                <Input onChange={(e) => this.changeFilter('confirmPassword', e.target.value)}/>
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">CEP</TextStyle>
                <Input onChange={(e) => this.changeFilter('zipcode', e.target.value)} placeholder="00000-000"/>
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">Estado</TextStyle>
                <Input onChange={(e) => this.changeFilter('state', e.target.value)}/>
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">Cidade</TextStyle>
                <Input onChange={(e) => this.changeFilter('city', e.target.value)}/>
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">Bairro</TextStyle>
                <Input onChange={(e) => this.changeFilter('neighborhood', e.target.value)}/>
              </Col>
              <Col span={24}>
                <TextStyle color="#656668">Rua / Avenida</TextStyle>
                <Input onChange={(e) => this.changeFilter('street', e.target.value)}/>
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">Número</TextStyle>
                <Input onChange={(e) => this.changeFilter('number', e.target.value)}/>
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">Complemento</TextStyle>
                <Input onChange={(e) => this.changeFilter('complement', e.target.value)}/>
              </Col>
            </Row>
            <Row>
              <Col span={12} offset={12}>
                <ButtonStyle onClick={this.clickSubmit} type="primary" block>CONTINUAR</ButtonStyle>
              </Col>
            </Row>
            <Row>
              <Col span={12} offset={12}>
                <TextStyle color="#656668" fontSize="10px">Ao cadastrar-se, você concorda com nossos termos e condições
                  de uso.</TextStyle>
              </Col>
            </Row>
            {successMsg && (
              <Row>
                <Col span={24}>
                  <Alert message={successMsg} type="success" showIcon />
                </Col>
              </Row>
            )}
            {errorMsg && (
              <Row>
                <Col span={24}>
                  <Alert message={errorMsg} type="error" showIcon />
                </Col>
              </Row>
            )}
          </FormStyle>
        </FormWrapper>
      </Background>
    )
  }
}

export default LoginRegister;