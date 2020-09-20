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

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: []
    }
  }

  componentDidMount() {
    this.getIncomes()
  }

  getIncomes = async () => {
    const mock = [
      {
        status: "APPROVED",
        name: "Blusa Floral",
        color: "Rosa Claro",
        client: "Larissa Manoela",
        devolutionDate: "2020-10-01",
        rentValue: "152",
        paymentStatus: "APPROVED",
        image: ListImage1
      },
      {
        status: "SEPARATION",
        name: "Calça alfaiataria básico",
        color: "Preto",
        client: "Larissa Manoela",
        devolutionDate: "2020-10-01",
        rentValue: "152",
        paymentStatus: "APPROVED",
        image: ListImage2
      },
      {
        status: "APPROVED",
        name: "Blusa Floral",
        color: "Rosa Claro",
        client: "Larissa Manoela",
        devolutionDate: "2020-10-01",
        rentValue: "152",
        paymentStatus: "PROCESS",
        image: ListImage3
      },
      {
        status: "FINISHED",
        name: "Blusa Floral",
        color: "Rosa Claro",
        client: "Larissa Manoela",
        devolutionDate: "2020-10-01",
        rentValue: "152",
        paymentStatus: "DENIED",
        image: ListImage4
      }
    ]
    this.setState({incomes: mock})
  }

  render() {
    const {incomes} = this.state;

    return (
      <Container>
        <Row>
          {incomes.map(item => (
            <Col span={12}>
              <DetailCard
                image={item.image}
                status={item.status}
                name={item.name}
                color={item.color}
                client={item.client}
                devolutionDate={item.devolutionDate}
                rentValue={item.rentValue}
                paymentStatus={item.paymentStatus}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Income