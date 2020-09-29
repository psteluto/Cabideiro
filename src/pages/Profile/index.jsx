import React, {Component} from 'react';
import {Row, Col, Tabs, Avatar, Upload, Spin, Button, Modal, Input} from 'antd';
import styled from 'styled-components';
import {EditOutlined} from "@ant-design/icons";
import UserService from '../../services/User';
import MyCloset from "./MyCloset";
import Rating from "./Rating";
import History from "./History";
import Income from "./Income";
import Logotipo from '../../components/Logotipo'
import TextStyle from '../../components/TextStyle';
import ButtonStyle from "../../components/ButtonStyle";
import MaskedInput from "antd-mask-input";

const {TabPane} = Tabs;

const LogoWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;

const ProfileWrapper = styled.div`
   display: flex;
   justify-content: center;
   margin-top: 72px;
`;

const IconsWrapper = styled.div`
   display: flex;
   align-items: center;
   flex-direction: column;
   margin-top: 62px;
`;

const RowInformation = styled.div`
   display: flex;
   justify-content: space-between;
   margin-top: 16px;
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
        password: "",
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
      name, email, password, newPassword, confirmPassword,
      zipcode, state, city, neighborhood, street, number
    } = fields;

    let msg = "";
    if (!name) msg += "Campo 'Nome Completo' é obrigatório\n";
    if (!email) msg += "Campo 'E-mail' é obrigatório\n";
    if (!password) msg += "Campo 'Senha Atual' é obrigatório\n";
    if (!newPassword) msg += "Campo 'Nova Senha' é obrigatório\n";
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
    console.log(fields);
  }

  render() {
    const {userData, loadImage, modalProfile, fields} = this.state;

    return (
      <div>
        <LogoWrapper>
          <Logotipo/>
          <TextStyle color="#262626" fontSize="17px">PERFIL</TextStyle>
        </LogoWrapper>
        <ProfileWrapper>
          <Row>
            <Col span={8}>
              <Upload onChange={this.changeImage} fileList={[]}>
                <Avatar style={{marginRight: 60}} size={80} src={userData.avatar_url}></Avatar>
                {loadImage && (<Spin/>)}
              </Upload>
            </Col>
            <Col span={16}>
              <Row>
                <TextStyle color="#262626" fontSize="14px">{userData.name}</TextStyle>
                <a
                  style={{marginLeft: 10}}
                  href="#"
                  onClick={() => this.setState({modalProfile: true})}
                >
                  <EditOutlined/>
                </a>
              </Row>
              <RowInformation>
                <Col span={4}>
                  <Row>
                    <TextStyle color="#262626" fontSize="15px" strong>{userData.countProducts}</TextStyle>
                    <TextStyle color="#262626" fontSize="11px">Produtos</TextStyle>
                  </Row>
                </Col>
                <Col span={4}>
                  <Row>
                    <TextStyle color="#262626" fontSize="15px" strong>{userData.followers}</TextStyle>
                    <TextStyle color="#262626" fontSize="11px">Seguidores</TextStyle>
                  </Row>
                </Col>
                <Col span={4}>
                  <Row>
                    <TextStyle color="#262626" fontSize="15px" strong>{userData.following}</TextStyle>
                    <TextStyle color="#262626" fontSize="11px">Seguindo</TextStyle>
                  </Row>
                </Col>
              </RowInformation>
            </Col>
          </Row>
        </ProfileWrapper>
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
                  <Input.Password onChange={(e) => this.changeFields('password', e.target.value)}/>
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
        </Modal>

      </div>
    )
  }
}

export default Profile;