import React, {Component} from 'react';
import {Tabs} from 'antd';
import styled from 'styled-components';
import UserService from '../../services/User';
import Rating from "./Rating";
import Logotipo from '../../components/Logotipo'
import TextStyle from '../../components/TextStyle';
import Closet from "./Closet";
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

  render() {
    const {userData, loadImage} = this.state;

    return (
      <div>
        <LogoWrapper>
          <Logotipo/>
          <TextStyle color="#262626" fontSize="17px">PERFIL</TextStyle>
        </LogoWrapper>
        <UserProfile
          profilePhoto={userData.avatar_url}
          userName={userData.name}
          countProducts={userData.countProducts}
          followers={userData.followers}
          following={userData.following}
        />
        <IconsWrapper>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Closet" key="1">
              <Closet/>
            </TabPane>
            <TabPane tab="Avaliações" key="2">
              <Rating/>
            </TabPane>
          </Tabs>
        </IconsWrapper>
      </div>
    )
  }
}

export default Profile;