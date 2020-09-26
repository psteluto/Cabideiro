import React, {Component} from 'react';
import styled from "styled-components";
import { Card, Col, List, Row} from "antd";
import ProductService from '../../services/Product';

const {Meta} = Card;

const StyledCard = styled(Card)`
  margin-left: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const CardWrapper = styled.div`
   display: flex;
   align-items: center;
   flex-wrap: wrap;
   justify-content: center;
`;

class Closet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  setImageList = (images) => {
    return images.map(image => ({
      uid: image.id,
      name: image.image,
      status: 'done',
      url: image.image_url
    }));
  }

  formatProduct = ({
                     id, name, price, full_price, size, color, brand_id,
                     max_days_location, gender, clothing_part_id, available_price,
                     available_days_location, description, image_products
                   }) => {
    return {
      id, name, price, full_price,
      size, color, brand_id,
      max_days_location, gender,
      clothing_part_id, available_price,
      available_days_location, description,
      images: this.setImageList(image_products)
    }
  }

  getProducts = async () => {
    const res = await ProductService.getUserProducts();
    const rawProducts = res.data;
    const products = rawProducts.map(product => this.formatProduct(product));

    let selectedProduct = products[0] || {};
    this.setState({products, selectedProduct});
  }

  render() {
    let {products} = this.state;

    products = products.concat(products)
    products = products.concat(products)

    return (
      <Row justify="center">
        <Col span={18}>
          <CardWrapper>

              {products.map(product => (
                <StyledCard
                  key={product.id}
                  style={{
                    width: 185,
                    marginBottom: 16
                  }}
                  cover={<img src={product.images[0] && product.images[0].url}/>}
                >
                  <Meta style={{fontSize: "12px"}} description={product.name}/>
                </StyledCard>
              ))}

          </CardWrapper>
        </Col>
      </Row>
    );
  }
}

export default Closet;