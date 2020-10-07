import React, {Component} from 'react';
import styled from 'styled-components';
import {Col, Row} from "antd";
import { withRouter } from 'react-router-dom'
import DetailCard from "./DetailCard";
import ProductService from '../../services/Product';

const Container = styled.div`
  width: 1000px;
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
    const res = await ProductService.getIncome();

    const incomes = res.data.map(item => ({
      productId: item.productId,
      status: item.status,
      name: item.productName,
      color: item.productColor.name,
      client: item.customer,
      clientId: item.customerId,
      devolutionDate: item.expirationDate,
      rentValue: item.productPrice,
      paymentStatus: item.paymentStatus,
      image: item.productImages[0].image_url
    }));

    this.setState({incomes})
  }

  onCLickClient(item){
    const {history} = this.props;
    history.push(`/user/${item.clientId}`);
  }

  onClickProduct(item){
    const {history} = this.props;
    history.push(`/product/${item.productId}/details`);
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
                onClickProfile={()=>this.onCLickClient(item)}
                onClickProduct={()=>this.onClickProduct(item)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default withRouter(Income)