import React, {Component} from 'react';
import styled from 'styled-components';
import {Col, Row} from "antd";
import ListImage1 from "../../images/image1.jpg";
import ListImage2 from "../../images/image2.jpg";
import ListImage3 from "../../images/image3.jpg";
import ListImage4 from "../../images/image4.png";
import DetailCard from "./DetailCard";

const Container = styled.div`
  max-width: 1000px;
`;

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    }
  }

  componentDidMount() {
    this.getHistory()
  }

  getHistory = async () => {
    const mock = [
      {
        status: "APPROVED",
        name: "Blusa Floral",
        color: "Rosa Claro",
        owner: "Larissa Manoela",
        devolutionDate: "2020-10-01",
        rentValue: "152",
        image: ListImage1
      },
      {
        status: "SEPARATION",
        name: "Calça alfaiataria básico",
        color: "Preto",
        owner: "Larissa Manoela",
        devolutionDate: "2020-10-01",
        rentValue: "152",
        image: ListImage2
      },
      {
        status: "APPROVED",
        name: "Blusa Floral",
        color: "Rosa Claro",
        owner: "Larissa Manoela",
        devolutionDate: "2020-10-01",
        rentValue: "152",
        image: ListImage3
      },
      {
        status: "FINISHED",
        name: "Blusa Floral",
        color: "Rosa Claro",
        owner: "Larissa Manoela",
        devolutionDate: "2020-10-01",
        rentValue: "152",
        image: ListImage4
      }
    ]
    this.setState({history: mock})
  }

  render() {
    const {history} = this.state;

    return (
      <Container>
        <Row>
          {history.map(item => (
            <Col span={12}>
              <DetailCard
                image={item.image}
                status={item.status}
                name={item.name}
                color={item.color}
                owner={item.owner}
                devolutionDate={item.devolutionDate}
                rentValue={item.rentValue}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default History