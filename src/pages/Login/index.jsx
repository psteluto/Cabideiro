import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Input, Button, Alert} from 'antd';
import {Link} from 'react-router-dom';
import UserService from '../../services/User'
import Logotipo from '../../components/Logotipo'
import styled from 'styled-components';
import TextStyle from '../../components/TextStyle';
import BackgroundLogin from '../../images/background-login.jpg';
import {setToken} from '../../redux/TokenSlice';


const Background = styled.div`
   background: url(${BackgroundLogin});
   background-size: contain;
   
   .background-color{
    background-color: rgba(255,255,255,.5);
   }
`;

const BackgroundImage = styled.img`
   opacity: 0.5;
`;

const FormWrapper = styled.div`
   background-color: #ffffff;
   width: 50%;
   margin: 0 auto;
`;

const LogoWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;

const FormStyle = styled.div`
   padding: 43px 115px 80px 115px;
`;

const ButtonStyle = styled(Button)`
   color: #000000;
   margin-top: 25px;
`;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailCpf: "",
      password: "",
      errorMsg: ""
    }
  }

  changeField(field, value) {
    this.setState({[field]: value})
  }

  login = async () => {
    const {setToken: dispatchToken} = this.props;
    const {emailCpf, password} = this.state;

    if (emailCpf && password) {
      try {
        const res = await UserService.login(emailCpf, password);
        localStorage.setItem('token', res.data.token);
        dispatchToken(res.data.token);
        this.props.history.push(`/`);
      } catch (error) {
        if (error.isAxiosError && error.response && (error.response.status === 401 || error.response.status === 400)) {
          this.setState({errorMsg: "Usuário ou senha inválido"});
        } else {
          this.setState({errorMsg: "Ocorreu um erro"});
          console.error(error)
        }
      }
    } else {
      this.setState({errorMsg: "Preencha todos os campos"})
    }
  }

  render() {
    const {errorMsg} = this.state;

    return (
      <Background src={BackgroundImage}>
        <div className='background-color'>
          <FormWrapper>
            <LogoWrapper>
              <Link to="/">
                <Logotipo/>
              </Link>
              <TextStyle color="#262626" fontSize="16px">ENTRAR</TextStyle>
            </LogoWrapper>
            <FormStyle>
              <Row gutter={[14, 14]}>
                <Col span={24}>
                  <TextStyle color="#656668">E-mail / CPF</TextStyle>
                  <Input onChange={(e) => this.changeField('emailCpf', e.target.value)}/>
                </Col>
              </Row>
              <Row gutter={[14, 14]}>
                <Col span={24}>
                  <TextStyle color="#656668">Senha</TextStyle>
                  <Input.Password onChange={(e) => this.changeField('password', e.target.value)}/>
                  <TextStyle color="#656668" fontSize="10px">Esqueceu a sua senha? Clique aqui </TextStyle>
                </Col>
              </Row>
              {errorMsg && (
                <Row>
                  <Col span={24}>
                    <Alert message={errorMsg} type="error" showIcon/>
                  </Col>
                </Row>
              )}
              <Row>
                <Col span={24}>
                  <ButtonStyle type="primary" block onClick={this.login}>CONTINUAR</ButtonStyle>
                </Col>
              </Row>
            </FormStyle>
          </FormWrapper>
        </div>
      </Background>
    )
  }
}

export default connect(null, {setToken})(Login);