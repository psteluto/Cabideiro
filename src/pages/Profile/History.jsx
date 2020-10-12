import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Col, message, Row} from "antd";
import DetailCard from "./DetailCard";
import ProductService from '../../services/Product';
import {changeStatus} from '../../redux/ProductsMockSlice';

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.productMock !== this.props.productMock)
      this.getHistory();
  }

  getHistory = async () => {
    if (ProductService.activeMock){
      // Caso mock esteja ativo
      const {productMock} = this.props;
      console.log('produtin', productMock)
      this.setState({history: productMock.historyProducts, totalClothes: productMock.historyProducts.length})
    } else {
      // Caso mock NÃO esteja ativo
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
  }

  onClickOwner(item){
    const {history} = this.props;
    history.push(`/user/${item.ownerId}`);
  }

  onClickProduct(item){
    const {history} = this.props;
    history.push(`/product/${item.productId}/details`);
  }

  onSendTrack = (productId) => {
    const {changeStatus: dispatchStatus} = this.props;
    dispatchStatus({id: productId, status: "Em Devolução", target: 'historyProducts'});
  }

  onSendEvaluation = () => {
    message.success("Avaliação registrada com sucesso");
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
                onSendTrack={()=>this.onSendTrack(item.id)}
                onSendEvaluation={this.onSendEvaluation}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { productMock } = state
  return { productMock }
}
export default connect(mapStateToProps, {changeStatus})(withRouter(History));