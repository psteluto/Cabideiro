import React, {Component} from 'react';
import {Avatar, Col, Rate, Row} from "antd";
import WomanImage from "../../images/mulher.jpg";
import WomanImage2 from "../../images/mulher2.jpg";
import TextStyle from "../../components/TextStyle";
import {Link} from "react-router-dom";
import styled from "styled-components";

const FeedbackWrapper = styled.div`
   text-align: center;
   margin-bottom: 16px;
`;

class Rating extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Row>
          <Col span={8}>
            <FeedbackWrapper>
              <Row>
                <Col span={6}>
                  <Avatar size={55} src={WomanImage2}/>
                </Col>
                <Col span={18}>
                  <Row>
                    <TextStyle color="#262626" fontSize="12px" style={{fontWeight: "600"}}>Mariana Ferreira <Link
                      style={{marginLeft: "10px"}}>Seguir</Link></TextStyle>
                  </Row>
                  <Row>
                    <Rate defaultValue={3} disabled/>
                  </Row>
                </Col>
              </Row>
            </FeedbackWrapper>
          </Col>
          <Col span={16}>
            <TextStyle color="#262626" fontSize="11px">Amei os detalhes da peça, estava em perfeito estado, o tamanho ficou perfeito, tudo conforme descrito. Super recomendo!</TextStyle>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FeedbackWrapper>
              <Row>
                <Col span={6}>
                  <Avatar size={55} src={WomanImage}/>
                </Col>
                <Col span={18}>
                  <Row>
                    <TextStyle color="#262626" fontSize="12px" style={{fontWeight: "600"}}>Julia Souza <Link
                      style={{marginLeft: "10px"}}>Seguir</Link></TextStyle>
                  </Row>
                  <Row>
                    <Rate defaultValue={5} disabled/>
                  </Row>
                </Col>
              </Row>
            </FeedbackWrapper>
          </Col>
          <Col span={16}>
            <TextStyle color="#262626" fontSize="11px">Extremamente cuidadosa com a minha peça, voltou em perfeito estado, recomendo!</TextStyle>
          </Col>
        </Row>
      </>
    );
  }
}

export default Rating;