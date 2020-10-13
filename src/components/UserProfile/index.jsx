import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, Col, Row, Spin, Upload, Tooltip} from "antd";
import {EditOutlined, CrownTwoTone} from "@ant-design/icons";
import TextStyle from "../TextStyle";

const UserProfile = ({profilePhoto, userName, countProducts, followers,
                       following, selfProfile, onFollow, onClickEdit,
                       onChangeImage, loadImage, premium, follow}) => {

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
              <TextStyle color="#262626" fontSize="14px">
                {premium && (
                  <Tooltip title="Premium">
                    <CrownTwoTone twoToneColor="#ffcb00" />
                  </Tooltip>
                )}
                &nbsp;{userName}
              </TextStyle>
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
              {follow ? (
                <Button type="primary" onClick={onFollow}>Seguindo</Button>
              ) : (
                <Button onClick={onFollow}>Seguir</Button>
              )}
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
  loadImage: false,
  premium: false,
  follow: false
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
  loadImage: PropTypes.bool,
  premium: PropTypes.bool,
  follow: PropTypes.bool
}

export default UserProfile;