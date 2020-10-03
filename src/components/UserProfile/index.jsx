import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Avatar, Button, Col, Row, Spin, Upload} from "antd";
import TextStyle from "../TextStyle";
import {EditOutlined} from "@ant-design/icons";

const UserProfile = ({profilePhoto, userName, countProducts, followers,
                       following, selfProfile, onFollow, onClickEdit,
                       onChangeImage, loadImage}) => {

  const avatarComponent = (<Avatar style={{marginRight: 60}} size={80} src={profilePhoto}/>);

  return (
    <>
      <Row justify="center">
        <Col span={2}>

          {selfProfile ? (
            <Upload onChange={onChangeImage} fileList={[]}>
              {avatarComponent}
              {loadImage && (<Spin/>)}
            </Upload>
          ) : (avatarComponent)}
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <TextStyle color="#262626" fontSize="14px">{userName}</TextStyle>
              {selfProfile && (
                <a
                  style={{marginLeft: 10}}
                  href="#"
                  onClick={onClickEdit}
                >
                  <EditOutlined/>
                </a>
              )}
            </Col>
          </Row>
          <Row style={{marginTop: 16}}>
            <Col span={8}>
              <TextStyle color="#262626" fontSize="15px" strong>{countProducts}</TextStyle>
              <br />
              <TextStyle color="#262626" fontSize="11px">Produtos</TextStyle>
            </Col>
            <Col span={8}>
              <TextStyle color="#262626" fontSize="15px" strong>{followers}</TextStyle>
              <br />
              <TextStyle color="#262626" fontSize="11px">Seguidores</TextStyle>
            </Col>
            <Col span={8}>
              <TextStyle color="#262626" fontSize="15px" strong>{following}</TextStyle>
              <br />
              <TextStyle color="#262626" fontSize="11px">Seguindo</TextStyle>
            </Col>
          </Row>
        </Col>
        {!selfProfile && (
          <Col span={2}>
            <Row style={{marginTop: 48}}>
              <Button onClick={onFollow}>Seguir</Button>
            </Row>
          </Col>
        )}
      </Row>
    </>
  )
}

UserProfile.defaultProps = {
  selfProfile: false,
  onFollow: ()=>{},
  onClickEdit: ()=>{},
  onChangeImage: ()=>{},
  loadImage: false
}

UserProfile.propTypes = {
  profilePhoto: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  countProducts: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  selfProfile: PropTypes.bool,
  onFollow: PropTypes.func,
  onClickEdit: PropTypes.func,
  onChangeImage: PropTypes.func,
  loadImage: PropTypes.bool
}

export default UserProfile;