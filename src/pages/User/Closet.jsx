import React, {Component} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Col, Row} from "antd";
import ProductService from '../../services/Product';
import Card from '../../components/Card';

const ClosetWrapper = styled.div`
  width: 800px;
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

    // products = products.concat(products)
    // products = products.concat(products)

    return (
      <ClosetWrapper>
        <Row>
          {products.map(product => (
            <Col span={5} offset={1}>
              <Link to={`/product/${product.id}/details`} replace>
                <Card
                  name={product.name}
                  imageUrl={product.images[0] && product.images[0].url}
                  price={product.price}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </ClosetWrapper>
    );
  }
}

export default Closet;