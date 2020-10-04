import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {Row, Col, Select, Pagination, Input} from 'antd';
import Logotipo from '../../components/Logotipo'
import Card from '../../components/Card'
import ProductService from '../../services/Product';

const {Option} = Select;

const LogoWrapper = styled.div`
   text-align: center;
`;

const FilterWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin: 24px 240px 35px 240px;
   width: 100%;
`;

const SelectStyle = styled(Select)`
   width: 160px;
`;

const PaginationWrapper = styled.div`
   display: flex;
   justify-content: center;
   margin: 24px 0 24px 0;
`;

const InputWrapper = styled.div`
   margin: 0 240px;
   margin-top: 20px;
`;

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        sizes: [],
        clothingParts: [],
        brands: [],
        colors: []
      }
    }
  }

  componentDidMount() {
    this.getFilters();
  }

  getFilters = async () => {
    const res = await ProductService.getFilters()
    this.setState({filters: res.data});
  }

  render() {
    const {filters} = this.state;
    
    return (
      <div>
        <LogoWrapper>
          <Logotipo/>
          <InputWrapper>
            <Input placeholder="O que você está procurando ?"></Input>
          </InputWrapper>
        </LogoWrapper>
        <Row>
          <FilterWrapper>
            <SelectStyle defaultValue="Tamanho">
              {filters.sizes.map(size => (
                <Option value={size}>{size}</Option>
              ))}
            </SelectStyle>
            <SelectStyle defaultValue="Categoria">
              {filters.clothingParts.map(part => (
                <Option value={part.id}>{part.name}</Option>
              ))}
            </SelectStyle>
            <SelectStyle defaultValue="Marca">
              {filters.brands.map(brand => (
                <Option value={brand.id}>{brand.name}</Option>
              ))}
            </SelectStyle>
            <SelectStyle defaultValue="Cor">
              {filters.colors.map(color => (
                <Option value={color.id}>{color.name}</Option>
              ))}
            </SelectStyle>
          </FilterWrapper>
        </Row>
        <Row>
          <FilterWrapper>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
          </FilterWrapper>
        </Row>
        <Row>
          <FilterWrapper>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
          </FilterWrapper>
        </Row>
        <Row>
          <FilterWrapper>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
          </FilterWrapper>
        </Row>
        <Row>
          <FilterWrapper>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
            <Col span={4}>
              <Link to="/product/1/details" replace>
                <Card/>
              </Link>
            </Col>
          </FilterWrapper>
        </Row>
        <PaginationWrapper>
          <Pagination defaultCurrent={1} total={50}/>
        </PaginationWrapper>
      </div>
    )
  }
}

export default Catalog;