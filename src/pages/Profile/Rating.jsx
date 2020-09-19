import React, {Component} from 'react';
import {Avatar, Col, Rate, Row} from "antd";
import WomanImage from "../../images/mulher.jpg";
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
                  <Avatar size={55} src={WomanImage}/>
                </Col>
                <Col span={18}>
                  <Row>
                    <TextStyle color="#262626" fontSize="12px" style={{fontWeight: "600"}}>Luiza Cassiano <Link
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
            <TextStyle color="#262626" fontSize="11px">It is a long established fact that a reader will be
              distracted by the readable content of a page when looking at its layout.</TextStyle>
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
                    <TextStyle color="#262626" fontSize="12px" style={{fontWeight: "600"}}>Fernanda Lima <Link
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
            <TextStyle color="#262626" fontSize="11px">Atendimento incrível, envio rápido e qualidade excelente.
              Amei!!!</TextStyle>
          </Col>
        </Row>
      </>
    );
  }
}

export default Rating;