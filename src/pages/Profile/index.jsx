import React from 'react';
import styled from 'styled-components';
import Logotipo from '../../components/Logotipo'
import TextStyle from '../../components/TextStyle';
import WomanImage from '../../images/mulher.jpg';
import {Row, Col, Tabs, Avatar, Rate} from 'antd';
import MyCloset from "./MyCloset";
import Rating from "./Rating";
import History from "./History";
import Income from "./Income";

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

const Profile = () => {
  return (
    <div>
      <LogoWrapper>
        <Logotipo/>
        <TextStyle color="#262626" fontSize="17px">PERFIL</TextStyle>
      </LogoWrapper>
      <ProfileWrapper>
        <Row>
          <Col span={8}>
            <Avatar style={{marginRight: 60}} size={80} src={WomanImage}/>
          </Col>
          <Col span={16}>
            <Row>
              <TextStyle color="#262626" fontSize="14px">PALOMA STELUTO</TextStyle>
            </Row>
            <RowInformation>
              <Col span={4}>
                <Row>
                  <TextStyle color="#262626" fontSize="15px" strong>33</TextStyle>
                  <TextStyle color="#262626" fontSize="11px">Produtos</TextStyle>
                </Row>
              </Col>
              <Col span={4}>
                <Row>
                  <TextStyle color="#262626" fontSize="15px" strong>700</TextStyle>
                  <TextStyle color="#262626" fontSize="11px">Seguidores</TextStyle>
                </Row>
              </Col>
              <Col span={4}>
                <Row>
                  <TextStyle color="#262626" fontSize="15px" strong>300</TextStyle>
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

export default Profile;