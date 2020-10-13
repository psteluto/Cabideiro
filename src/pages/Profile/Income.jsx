import React, {Component} from 'react';
import styled from 'styled-components';
import {Col, message, Row} from "antd";
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import DetailCard from "./DetailCard";
import ProductService from '../../services/Product';
import {changeStatus} from '../../redux/ProductsMockSlice';

const Container = styled.div`
  width: 1000px;
`;

const LabelWrapper = styled.div`
  margin: 15px auto 30px auto;
  text-align: center;
  width: 700px;
  display: flex;
  justify-content: space-between;
`;

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: [],
      totalPrice: 0,
      totalClothes: 0,
      totalReceiptAvailable: 0,
      hasReview: false
    }
  }

  componentDidMount() {
    this.getIncomes()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.productMock !== this.props.productMock)
      this.getIncomes();
  }

  getIncomes = async () => {
    if (ProductService.activeMock) {
      const {productMock} = this.props;

      const incomes = productMock.incomeProducts
      this.setState({
        incomes,
        totalPrice: this.calculateTotalPrice(incomes),
        totalClothes: incomes.length,
        totalReceiptAvailable: this.calculateReceiptAvailable(incomes)
      })
    } else {
      const res = await ProductService.getIncome();

      const incomes = res.data.orders.map(item => ({
        id: item.productId,
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

      this.setState({
        incomes,
        totalPrice: res.data.totalPrice,
        totalClothes: res.data.totalClothes,
        totalReceiptAvailable: res.data.totalReceiptAvailable
      })
    }
  }

  calculateTotalPrice = (incomes) => {
    let totalPrice = 0
    incomes.forEach(income => totalPrice += Number(income.rentValue))
    console.log('price', totalPrice)
    const commission = totalPrice * 0.3;
    console.log('commision', commission)
    return totalPrice - commission;
  }

  calculateReceiptAvailable = (incomes) => {
    let totalReceiptAvailable = 0
    incomes.forEach(income => {
      if (income.status === 'Finalizado')
        totalReceiptAvailable += Number(income.rentValue)
    })
    const commission = totalReceiptAvailable * 0.3;
    return totalReceiptAvailable - commission;
  }

  onCLickClient(item){
    const {history} = this.props;
    history.push(`/user/${item.clientId}`);
  }

  onClickProduct(item){
    const {history} = this.props;
    history.push(`/product/${item.id}/details`);
  }

  onSendTrack = (productId) => {
    const {changeStatus: dispatchStatus} = this.props;
    dispatchStatus({id: productId, status: "Enviado", target: 'incomeProducts'});
  }

  onSendEvaluation = () => {
    message.success("Avaliação registrada com sucesso");
    this.setState({hasReview: true})
  }

  render() {
    const {incomes, totalPrice, totalClothes, totalReceiptAvailable, hasReview} = this.state;

    return (
      <Container>
        <Row>
          <Col span={24}>
            <LabelWrapper>
              <span>Total Rendimentos: <b>R$ {totalPrice}</b></span>
              <span>Total Peças: <b>{totalClothes}</b></span>
              <span>Total Disponível para Resgate: <b>R$ {totalReceiptAvailable}</b></span>
            </LabelWrapper>
          </Col>
        </Row>
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
                onSendTrack={()=>this.onSendTrack(item.id)}
                onSendEvaluation={this.onSendEvaluation}
                hasReview={hasReview}
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
export default connect(mapStateToProps, {changeStatus})(withRouter(Income));