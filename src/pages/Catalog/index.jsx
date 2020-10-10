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

const ProductsRow = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 1000px;
`;

const NoProductsLabel = styled.p`
  text-align: center;
`;

const FilterWrapper = styled.div`
  margin: 35px auto;
  max-width: 1000px;
`;

const SelectStyle = styled(Select)`
   width: 100%;
`;

const PaginationWrapper = styled.div`
   display: flex;
   justify-content: center;
   margin: 24px 0 24px 0;
`;

const InputWrapper = styled.div`
   margin: 20px 0;
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
      },
      products: [],
      page: 1,
      pageSize: 12,
      filterValue: {
        size: undefined,
        clothingPart: undefined,
        brand: undefined,
        color: undefined,
        gender: undefined
      }
    }
  }

  async componentDidMount() {
    this.getFilters();
  }

  changeFilterValue = (field, value) => {
    const {filterValue} = this.state;
    const newFilterValue = {
      ...filterValue,
      [field]: value
    }
    this.setState({filterValue: newFilterValue}, this.getProducts)
  }

  getProducts = async () => {
    const {page, pageSize, filterValue} = this.state;
    const res = await ProductService.getAll(page, pageSize, filterValue);
    this.setState({products: res.data})
  }

  getFilters = async () => {
    const {match} = this.props;
    const {filterValue} = this.state;

    const res = await ProductService.getFilters();
    const externalFilter = match.params.filter;
    const values = {
      ...filterValue,
      gender: externalFilter
    }

    this.setState({
      filters: res.data, filterValue: values
    }, this.getProducts);
  }

  changePage = async (page, pageSize) => {
    this.setState({page, pageSize}, this.getProducts);
  }

  render() {
    const {products, filters, pageSize, filterValue} = this.state;

    return (
      <div>
        <LogoWrapper>
          <Link to="/">
            <Logotipo/>
          </Link>
        </LogoWrapper>

        <FilterWrapper>
          <Row>
            <Col span={23} offset={1}>
              <InputWrapper>
                <Input placeholder="O que você está procurando ?"/>
              </InputWrapper>
            </Col>
            <Col span={4} offset={1}>
              <SelectStyle
                value={filterValue.gender}
                onChange={(value) => this.changeFilterValue('gender', value)}
                defaultValue="Gênero"
              >
                <Option value="Feminino">Feminino</Option>
                <Option value="Masculino">Masculino</Option>
              </SelectStyle>
            </Col>
            <Col span={3} offset={1}>
              <SelectStyle
                value={filterValue.size}
                onChange={(value) => this.changeFilterValue('size', value)}
                defaultValue="Tamanho"
              >
                {filters.sizes.map(size => (
                  <Option value={size}>{size}</Option>
                ))}
              </SelectStyle>
            </Col>
            <Col span={4} offset={1}>
              <SelectStyle
                value={filterValue.clothingPart}
                onChange={(value) => this.changeFilterValue('clothingPart', value)}
                defaultValue="Categoria"
              >
                {filters.clothingParts.map(part => (
                  <Option value={part.name}>{part.name}</Option>
                ))}
              </SelectStyle>
            </Col>
            <Col span={4} offset={1}>
              <SelectStyle
                value={filterValue.brand}
                onChange={(value) => this.changeFilterValue('brand', value)}
                defaultValue="Marca"
              >
                {filters.brands.map(brand => (
                  <Option value={brand.name}>{brand.name}</Option>
                ))}
              </SelectStyle>
            </Col>
            <Col span={4} offset={1}>
              <SelectStyle
                value={filterValue.color}
                onChange={(value) => this.changeFilterValue('color', value)}
                defaultValue="Cor"
              >
                {filters.colors.map(color => (
                  <Option value={color.name}>{color.name}</Option>
                ))}
              </SelectStyle>
            </Col>
          </Row>
        </FilterWrapper>


        <ProductsRow>
          <Row>
            {products.length === 0 && (
              <Col span={23} offset={1}>
                <NoProductsLabel>
                  Não há produtos para mostrar aqui!
                </NoProductsLabel>
              </Col>
            )}
            {products.map(product => (
              <Col span={5} offset={1}>
                <Link to={`/product/${product.id}/details`} replace>
                  <Card
                    name={product.name}
                    imageUrl={product.image_products[0].image_url}
                    price={product.price}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </ProductsRow>


        <PaginationWrapper>
          <Pagination
            defaultCurrent={1}
            total={100}
            pageSize={pageSize}
            onChange={this.changePage}
          />
        </PaginationWrapper>
      </div>
    )
  }
}

export default Catalog;