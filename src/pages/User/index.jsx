import React, {Component} from 'react';
import {Tabs} from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import UserService from '../../services/User';
import Rating from "./Rating";
import Logotipo from '../../components/Logotipo'
import TextStyle from '../../components/TextStyle';
import Closet from "./Closet";
import UserProfile from "../../components/UserProfile";
import ProductService from "../../services/Product";

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
      userData: {}
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const {match} = this.props;
    const userId = match.params.id;

    const res = await UserService.getUserData(userId);
    const user = res.data.user;
    user.countProducts = res.data.totalProducts;
    user.followers = res.data.totalFollowers;
    user.following = res.data.totalFollowing;
    this.setState({userData: user});
  }

  render() {
    const {userData} = this.state;

    return (
      <div>
        <LogoWrapper>
          <Link to="/">
            <Logotipo/>
          </Link>
          <TextStyle color="#262626" fontSize="17px">PERFIL</TextStyle>
        </LogoWrapper>
        <UserProfile
          profilePhoto={userData.avatar_url}
          userName={userData.name}
          countProducts={userData.countProducts}
          followers={userData.followers}
          following={userData.following}
          premium={userData.premium}
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