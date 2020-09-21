import React, {Component} from 'react';
import {Row, Col, Tabs, Avatar, Upload, Spin} from 'antd';
import styled from 'styled-components';
import UserService from '../../services/User';
import MyCloset from "./MyCloset";
import Rating from "./Rating";
import History from "./History";
import Income from "./Income";
import Logotipo from '../../components/Logotipo'
import TextStyle from '../../components/TextStyle';
import WomanImage from '../../images/mulher.jpg';

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
      loadImage: false
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const res = await UserService.getUserData()
    const user = res.data.user;
    user.countProducts = res.data.totalProducts;
    user.followers = res.data.totalFollowers;
    user.following = res.data.totalFollowing;
    this.setState({userData: user});
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

  render() {
    const {userData, loadImage} = this.state;

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
                {loadImage && (<Spin />)}
              </Upload>
            </Col>
            <Col span={16}>
              <Row>
                <TextStyle color="#262626" fontSize="14px">{userData.name}</TextStyle>
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
      </div>
    )
  }
}

export default Profile;