import React, {Component} from 'react';
import styled from 'styled-components';
import {Row, Col, Input, Button, Alert as AntdAlert} from 'antd';
import MaskedInput from 'antd-mask-input'
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

  changeFields = (field, value) => {
    const fields = {
      ...this.state.fields,
      [field]: value
    }
    this.setState({fields})
  }

  clickSubmit = async () => {
    const {history} = this.props;
    const {fields} = this.state;

    try{
      const valid = this.validateForm(fields);
      if (!valid) return;

      delete fields.confirmPassword;
      await UserService.signUp(fields);

      this.setState({successMsg: "Usuário cadatrado com sucesso", errorMsg: ""});
      history.push('/login')
    } catch (e) {
      console.error(e);
      this.setState({errorMsg: "Ocorreu um erro!"});
    }

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
                <Input onChange={(e) => this.changeFields('name', e.target.value)}/>
              </Col>
              <Col span={24}>
                <TextStyle color="#656668">E-mail</TextStyle>
                <Input onChange={(e) => this.changeFields('email', e.target.value)}/>
              </Col>
              <Col span={8}>
                <TextStyle color="#656668">CPF</TextStyle>
                <MaskedInput
                  mask='111.111.111-11'
                  onChange={(e) => this.changeFields('cpf', e.target.value)}
                  placeholder="000.000.000-00"
                />
              </Col>
              <Col span={8}>
                <TextStyle color="#656668">Celular</TextStyle>
                <MaskedInput
                  mask="(11) 11111-1111"
                  onChange={(e) => this.changeFields('cellphone', e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </Col>
              <Col span={8}>
                <TextStyle color="#656668">Telefone alternativo</TextStyle>
                <MaskedInput
                  mask="(11) 11111-1111"
                  onChange={(e) => this.changeFields('phone', e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">Senha</TextStyle>
                <Input.Password onChange={(e) => this.changeFields('password', e.target.value)}/>
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">Confirmar Senha</TextStyle>
                <Input.Password onChange={(e) => this.changeFields('confirmPassword', e.target.value)}/>
              </Col>
              <Col span={12}>
                <TextStyle color="#656668">CEP</TextStyle>
                <MaskedInput
                  mask="11111-111"
                  onChange={(e) => this.changeFields('zipcode', e.target.value)}
                  placeholder="00000-000"
                />
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