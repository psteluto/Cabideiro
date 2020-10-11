import React, {Component} from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'
import {Col, Row} from "antd";
import DetailCard from "./DetailCard";
import ProductService from '../../services/Product';

const Container = styled.div`
  width: 1000px;
`;

const LabelWrapper = styled.p`
  margin: 15px 0 30px;
  text-align: center;
`;

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      totalClothes: 0
    }
  }

  componentDidMount() {
    this.getHistory()
  }

  getHistory = async () => {
    const res = await ProductService.getHistory();

    const history = res.data.orders.map(item => ({
      productId: item.productId,
      status: item.status,
      name: item.productName,
      color: item.productColor.name,
      owner: item.owner,
      ownerId: item.ownerId,
      devolutionDate: item.expirationDate,
      rentValue: item.productPrice,
      image: item.productImages[0].image_url
    }));

    this.setState({history, totalClothes: res.data.totalClothes})
  }

  onClickOwner(item){
    const {history} = this.props;
    history.push(`/user/${item.ownerId}`);
  }

  onClickProduct(item){
    const {history} = this.props;
    history.push(`/product/${item.productId}/details`);
  }
  
  render() {
    const {history, totalClothes} = this.state;

    return (
      <Container>
        <Row>
          <Col span={24}>
            <LabelWrapper>
              Total de Peças: {totalClothes}
            </LabelWrapper>
          </Col>
        </Row>
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
                onClickProfile={()=>this.onClickOwner(item)}
                onClickProduct={()=>this.onClickProduct(item)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default withRouter(History)