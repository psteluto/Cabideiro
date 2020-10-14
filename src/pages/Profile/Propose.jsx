import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Col, message, Row} from "antd";
import DetailCard from "./DetailCard";
import ProductService from '../../services/Product';
import {changeStatus} from '../../redux/ProductsMockSlice';

const Container = styled.div`
  width: 1000px;
`;

class Propose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propose: [],
      isProposeReceiver: false
    }
  }

  componentDidMount() {
    this.getProposes()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.productMock !== this.props.productMock)
      this.getProposes();
  }

  getProposes = async () => {
    if (ProductService.activeMock) {
      // Caso mock esteja ativo
      const {productMock} = this.props;

      const userId = localStorage.getItem("userId");
      if(productMock.proposeProducts[0].receiverId === userId) {
        this.setState({propose: productMock.proposeProducts, isProposeReceiver: true})
      } else if(productMock.proposeProducts[0].senderId === userId) {
        this.setState({propose: productMock.proposeProducts, isProposeReceiver: false})
      } else {
        this.setState({propose: []})
      }
    }
  }

  onClickOwner(item) {
    const {history} = this.props;
    const {isProposeReceiver} = this.state;

    if (isProposeReceiver) {
      history.push(`/user/${item.senderId}`);
    } else {
      history.push(`/user/${item.receiverId}`);
    }
  }

  onClickProduct(item) {
    const {history} = this.props;
    history.push(`/product/${item.id}/details`);
  }

  onAccept = (product) => {
    const {changeStatus: dispatchStatus} = this.props;
    dispatchStatus({id: product.id, status: "Aceito", target: 'proposeProducts'});
    message.success(`Você aceitou essa proposta, agora é com ${product.proposeSender} :)`)
  }

  onRefuse = (id) => {
    const {changeStatus: dispatchStatus} = this.props;
    dispatchStatus({id: id, status: "Recusado", target: 'proposeProducts'});
    message.success("Você recusou essa proposta")
  }

  onSendPropose = (product) => {
    const {changeStatus: dispatchStatus} = this.props;
    dispatchStatus({id: product.id, status: "Em contraproposta", target: 'proposeProducts'});
    message.success(`Você fez uma contraproposta, agora é com ${product.proposeSender} :)`)
  }

  render() {
    const {propose} = this.state;
    const {isProposeReceiver} = this.state;

    return (
      <Container>
        <Row>
          {propose.length === 0 && (
            <Col span={12}>
              Nenhuma proposta recebida
            </Col>
          )}

          {propose.map(item => (
            <Col span={12}>
              <DetailCard
                isPropose
                isProposeReceiver={isProposeReceiver}
                image={item.image}
                status={item.status}
                proposeReceiver={item.proposeReceiver}
                proposeSender={item.proposeSender}
                name={item.name}
                color={item.color}
                rentValue={item.rentValue}
                offerValue={item.offerValue}
                locationDays={item.locationDays}
                offerDays={item.offerDays}
                onClickProfile={() => this.onClickOwner(item)}
                onClickProduct={() => this.onClickProduct(item)}
                onAcceptOffer={() => this.onAccept(item)}
                onRefuseOffer={() => this.onRefuse(item.id)}
                onSendPropose={() => this.onSendPropose(item)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {productMock} = state
  return {productMock}
}
export default connect(mapStateToProps, {changeStatus})(withRouter(Propose));