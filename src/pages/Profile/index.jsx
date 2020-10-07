import React, {Component} from 'react';
import {Row, Col, Tabs, Button, Modal, Input, Alert} from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import UserService from '../../services/User';
import MyCloset from "./MyCloset";
import Rating from "./Rating";
import History from "./History";
import Income from "./Income";
import Logotipo from '../../components/Logotipo'
import TextStyle from '../../components/TextStyle';
import ButtonStyle from "../../components/ButtonStyle";
import MaskedInput from "antd-mask-input";
import UserProfile from "../../components/UserProfile";

const {TabPane} = Tabs;

const LogoWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   margin-bottom: 72px;
`;

const IconsWrapper = styled.div`
   display: flex;
   align-items: center;
   flex-direction: column;
   margin-top: 62px;
`;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loadImage: false,
      modalProfile: false,
      fields: {
        name: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        zipcode: "",
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        number: "",
        complement: ""
      },
      errorMsg: ""
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  changeFields = (field, value) => {
    const fields = {
      ...this.state.fields,
      [field]: value
    }
    this.setState({fields})
  }

  validateForm = (fields) => {
    const {
      name, email, oldPassword, newPassword, confirmPassword,
      zipcode, state, city, neighborhood, street, number
    } = fields;

    let msg = "";
    if (!name) msg += "Campo 'Nome Completo' é obrigatório\n";
    if (!email) msg += "Campo 'E-mail' é obrigatório\n";
    if (!zipcode) msg += "Campo 'CEP' é obrigatório\n";
    if (!state) msg += "Campo 'Estado' é obrigatório\n";
    if (!city) msg += "Campo 'Cidade' é obrigatório\n";
    if (!neighborhood) msg += "Campo 'Bairro' é obrigatório\n";
    if (!street) msg += "Campo 'Rua' é obrigatório\n";
    if (!number) msg += "Campo 'Número' é obrigatório\n";

    if (newPassword && !oldPassword) msg += "Campo 'Senha Atual' é obrigatório\n";

    if (msg) {
      this.setState({errorMsg: msg, successMsg: ""});
      return false;
    }

    if (newPassword !== confirmPassword) {
      this.setState({errorMsg: "Senhas não são iguais", successMsg: ""})
      return false;
    }

    return true;
  }

  getUserData = async () => {
    const res = await UserService.getUserData()
    const user = res.data.user;
    user.countProducts = res.data.totalProducts;
    user.followers = res.data.totalFollowers;
    user.following = res.data.totalFollowing;

    const resAddress = await UserService.getAddress();

    const fields = {
      name: user.name,
      email: user.email,
      zipcode: resAddress.data.zipcode,
      state: resAddress.data.state,
      city: resAddress.data.city,
      neighborhood: resAddress.data.neighborhood,
      street: resAddress.data.street,
      number: resAddress.data.number,
      complement: resAddress.data.complement
    }

    this.setState({userData: user, fields: fields});
  }

  changeImage = async (info) => {
    const fileList = [...info.fileList];

    this.setState({loadImage: true});

    let file = null;
    if (fileList[0])
      file = fileList[0].originFileObj;

    if (file) {
      const res = await UserService.uploadPhoto(file);
      const user = res.data;
      user.countProducts = 33;
      user.followers = 700;
      user.following = 300;
      this.setState({userData: user});
    }

    this.setState({loadImage: false});
  }

  saveProfile = async () => {
    const {fields} = this.state;
    this.validateForm(fields);

    try {

      const profile = {
        name: fields.name,
        email: fields.email,
        old_password: fields.oldPassword,
        password: fields.newPassword,
        password_confirmation: fields.confirmPassword
      };
      await UserService.updateProfile(profile);

      const address = {
        street: fields.street,
        city: fields.city,
        state: fields.state,
        neighborhood: fields.neighborhood,
        zipcode: fields.zipcode,
        complement: fields.complement,
        number: fields.number
      }
      await UserService.updateAddress(address)

      await this.getUserData();
      this.setState({modalProfile: false});
    } catch (e) {
      console.error(e)
      if (e.response)
        this.setState({errorMsg: e.response.data.message})
      else
        this.setState({errorMsg: "Ocorreu um erro!"})
    }
  }

  render() {
    const {userData, loadImage, modalProfile, fields, errorMsg} = this.state;

    return (
      <div>
        <LogoWrapper>
          <Link to="/">
            <Logotipo/>
          </Link>
          <TextStyle color="#262626" fontSize="17px">PERFIL</TextStyle>
        </LogoWrapper>

        <UserProfile
          selfProfile
          profilePhoto={userData.avatar_url}
          userName={userData.name}
          countProducts={userData.countProducts}
          followers={userData.followers}
          following={userData.following}
          onClickEdit={() => this.setState({modalProfile: true})}
          onChangeImage={this.changeImage}
          loadImage={loadImage}
        />

        <IconsWrapper>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Meu Closet" key="1">
              <MyCloset/>
            </TabPane>
            <TabPane tab="Avaliações" key="2">
              <Rating/>
            </TabPane>
            <TabPane tab="Histórico" key="3">
              <History/>
            </TabPane>
            <TabPane tab="Rendimentos" key="4">
              <Income/>
            </TabPane>
          </Tabs>
        </IconsWrapper>

        <Modal
          visible={modalProfile}
          title="Alterar Perfil"
          onCancel={() => this.setState({modalProfile: false})}
          footer={[
            <Button key="back" onClick={() => this.setState({modalProfile: false})}>Voltar</Button>,
            <ButtonStyle type="primary" onClick={this.saveProfile}>Alterar</ButtonStyle>
          ]}
        >

          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Meus Dados" key="1">
              <Row gutter={[14, 14]}>
                <Col span={24}>
                  <TextStyle color="#656668">Nome completo</TextStyle>
                  <Input
                    value={fields.name}
                    onChange={(e) => this.changeFields('name', e.target.value)}
                  />
                </Col>
                <Col span={24}>
                  <TextStyle color="#656668">E-mail</TextStyle>
                  <Input
                    value={fields.email}
                    onChange={(e) => this.changeFields('email', e.target.value)}
                  />
                </Col>
                <Col span={8}>
                  <TextStyle color="#656668">Senha Atual</TextStyle>
                  <Input.Password onChange={(e) => this.changeFields('oldPassword', e.target.value)}/>
                </Col>
                <Col span={8}>
                  <TextStyle color="#656668">Nova Senha</TextStyle>
                  <Input.Password onChange={(e) => this.changeFields('newPassword', e.target.value)}/>
                </Col>
                <Col span={8}>
                  <TextStyle color="#656668">Confirmar Senha</TextStyle>
                  <Input.Password onChange={(e) => this.changeFields('confirmPassword', e.target.value)}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Endereço" key="2">
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
            </TabPane>
          </Tabs>
          {errorMsg && (
            <Row>
              <Col span={24}>
                <Alert message={errorMsg} type="error" showIcon/>
              </Col>
            </Row>
          )}
        </Modal>

      </div>
    )
  }
}

export default Profile;