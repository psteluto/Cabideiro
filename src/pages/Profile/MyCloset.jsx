import React, {Component} from 'react';
import styled from "styled-components";
import {Alert, Card, Checkbox, Col, Input, List, Row, Select, Upload, InputNumber} from "antd";
import ImgCrop from "antd-img-crop";
import ProductService from '../../services/Product';
import TextStyle from "../../components/TextStyle";
import ButtonStyle from '../../components/ButtonStyle';
import MoneyInput from "../../components/MoneyInput";

const {TextArea} = Input;
const {Option} = Select;
const {Meta} = Card;

const StyledCard = styled(Card)`
  &:hover {
    cursor: pointer;
  }
`;

const ItensWrapper = styled.div`
   padding: 16px ${props => props.paddingRight || "0"} 0 0;
`;

const ButtonWrapper = styled.div`
   display: flex;
   margin-bottom: 15px;
`;

const InputNumberStyle = styled(InputNumber)`
  width: 100%;
`;

const CardWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

class MyCloset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      brands: [],
      sizes: [],
      colors: [],
      clothingParts: [],
      selectedProduct: {
        id: "",
        name: "",
        price: "",
        full_price: "",
        size: "",
        color_id: "",
        brand_id: "",
        max_days_location: "",
        gender: "",
        clothing_part_id: "",
        available_price: false,
        available_days_location: false,
        description: "",
        images: []
      },
      successMsg: "",
      errorMsg: "",
      editMode: true
    }
  }

  componentDidMount() {
    this.getProducts();
    this.getFilters();
  }

  changeFields = (field, value) => {
    const selectedProduct = {
      ...this.state.selectedProduct,
      [field]: value
    }
    this.setState({selectedProduct})
  }

  validateFields = () => {
    const {selectedProduct} = this.state;

    let msg = "";
    if (!selectedProduct.name) msg += "Campo 'Nome' é obrigatório\n";
    if (!selectedProduct.price) msg += "Campo 'Valor' é obrigatório\n";
    if (!selectedProduct.full_price) msg += "Campo 'Valor Original' é obrigatório\n";
    if (!selectedProduct.size) msg += "Campo 'Tamanho' é obrigatório\n";
    if (!selectedProduct.color_id) msg += "Campo 'Cor' é obrigatório\n";
    if (!selectedProduct.brand_id) msg += "Campo 'Marca' é obrigatório\n";
    if (!selectedProduct.max_days_location) msg += "Campo 'Tempo Máximo de Locação' é obrigatório\n";
    if (!selectedProduct.gender) msg += "Campo 'Gênero da Peça' é obrigatório\n";
    if (!selectedProduct.clothing_part_id) msg += "Campo 'Categoria da Peça' é obrigatório\n";
    if (!selectedProduct.description) msg += "Campo 'Descrição' é obrigatório\n";
    if (!selectedProduct.images) msg += "Pelo menos uma imagem é obrigatória\n";

    if (msg) {
      this.setState({errorMsg: msg});
      return false;
    }

    return true;
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
                     id, name, price, full_price, size, color_id, brand_id,
                     max_days_location, gender, clothing_part_id, available_price,
                     available_days_location, description, image_products
                   }) => {
    return {
      id, name, price, full_price,
      size, color_id, brand_id,
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
    this.setState({products, selectedProduct, editMode: products.length});
  }

  getFilters = async () => {
    const res = await ProductService.getFilters()

    this.setState({
      clothingParts: res.data.clothingParts,
      brands: res.data.brands,
      sizes: res.data.sizes,
      colors: res.data.colors
    });
  }

  selectProduct = (product) => {
    this.setState({selectedProduct: product, successMsg: "", editMode: true})
  }

  convertImages = async (images) => {
    const newImages = [];
    for (const image of images) {
      if (image.url) {
        newImages.push(await this.urlToObject(image.url));
      } else {
        newImages.push(image.originFileObj);
      }
    }
    return newImages
  }

  newProduct = async () => {
    const {selectedProduct} = this.state;
    if (this.validateFields()) {
      selectedProduct.images = await this.convertImages(selectedProduct.images);
      await ProductService.add(selectedProduct)
      await this.getProducts();
    }
  }

  updateProduct = async () => {
    const {selectedProduct} = this.state;
    if (this.validateFields()) {
      selectedProduct.images = await this.convertImages(selectedProduct.images);
      await ProductService.update(selectedProduct);
      await this.getProducts();
      this.setState({successMsg: "Produto alterado com sucesso!"})
    }
  }

  removeProduct = async () => {
    const {selectedProduct} = this.state;
    await ProductService.remove(selectedProduct.id);
    await this.getProducts();
  }

  onUpload = ({fileList: newFileList}) => {
    this.changeFields("images", newFileList);
  };

  urlToObject = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', {type: blob.type});
    return file;
  }

  clickNewProduct = () => {
    this.setState({selectedProduct: {}, editMode: false})
  }

  render() {
    const {products, brands, sizes, colors, clothingParts,
      selectedProduct, successMsg, errorMsg, editMode} = this.state;

    return (
      <Row>
        <Col span={10}>
          <CardWrapper>
            <ButtonStyle backColorButtom="background-color: #e73554" backHoverButton="#e73554"
                         colorButton="#ffffff" color="#000000" onClick={this.clickNewProduct}>+ Nova Peça</ButtonStyle>
            <List style={{marginTop: 20}}>
              {products.map(product => (
                <StyledCard
                  key={product.id}
                  onClick={() => this.selectProduct(product)}
                  style={{
                    width: 185,
                    marginBottom: 16,
                    border: (product.id === selectedProduct.id ? "2px solid #ffcb00" : "")
                  }}
                  cover={<img src={product.images[0] && product.images[0].url}/>}
                >
                  <Meta style={{fontSize: "12px"}} description={product.name}/>
                </StyledCard>
              ))}
            </List>
          </CardWrapper>
        </Col>
        <Col span={14}>
          <TextStyle color="#262626">Nome</TextStyle>
          <Input
            onChange={(e) => this.changeFields('name', e.target.value)}
            value={selectedProduct.name}
          />
          <Row>
            <Col span={6}>
              <ItensWrapper paddingRight="16px">
                <TextStyle color="#262626">Valor</TextStyle>
                <MoneyInput
                  onChange={(value) => this.changeFields('price', value)}
                  value={selectedProduct.price}/>
              </ItensWrapper>
            </Col>
            <Col span={6}>
              <ItensWrapper paddingRight="16px">
                <TextStyle color="#262626">Valor Original</TextStyle>
                <MoneyInput
                  onChange={(value) => this.changeFields('full_price', value)}
                  value={selectedProduct.full_price}
                />
              </ItensWrapper>
            </Col>
            <Col span={6}>
              <ItensWrapper paddingRight="16px">
                <TextStyle color="#262626">Tamanho</TextStyle>

                <Select
                  style={{width: "100%"}}
                  onChange={(value) => this.changeFields('size', value)}
                  value={selectedProduct.size}
                >
                  {sizes.map(size => <Option value={size}>{size}</Option>)}
                </Select>
              </ItensWrapper>
            </Col>
            <Col span={6}>
              <ItensWrapper>
                <TextStyle color="#262626">Cor</TextStyle>

                <Select
                  style={{width: "100%"}}
                  onChange={(value) => this.changeFields('color_id', value)}
                  value={selectedProduct.color_id}
                >
                  {colors.map(color => <Option value={color.id}>{color.name}</Option>)}
                </Select>
              </ItensWrapper>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <ItensWrapper paddingRight="16px">
                <TextStyle color="#262626">Marca</TextStyle>
                <Select
                  style={{width: "100%"}}
                  onChange={(value) => this.changeFields('brand_id', value)}
                  value={selectedProduct.brand_id}
                >
                  {brands.map(brand => <Option value={brand.id}>{brand.name}</Option>)}
                </Select>
              </ItensWrapper>
            </Col>
            <Col span={12}>
              <ItensWrapper>
                <TextStyle color="#262626">Tempo Máximo de Locação</TextStyle>
                <InputNumberStyle
                  min={0}
                  onChange={(value) => this.changeFields('max_days_location', value)}
                  value={selectedProduct.max_days_location}
                />
              </ItensWrapper>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <ItensWrapper paddingRight="16px">
                <TextStyle color="#262626">Gênero da Peça</TextStyle>
                <Select
                  style={{width: "100%"}}
                  onChange={(value) => this.changeFields('gender', value)}
                  value={selectedProduct.gender}
                >
                  <Option value="Feminino">Feminino</Option>
                  <Option value="Masculino">Masculino</Option>
                  <Option value="Unissex">Unissex</Option>
                </Select>
              </ItensWrapper>
            </Col>
            <Col span={12}>
              <ItensWrapper>
                <TextStyle color="#262626">Categoria da Peça</TextStyle>
                <Select
                  style={{width: "100%"}}
                  onChange={(value) => this.changeFields('clothing_part_id', value)}
                  value={selectedProduct.clothing_part_id}
                >
                  {clothingParts.map(clothingPart => (
                    <Option value={clothingPart.id}>{clothingPart.name}</Option>
                  ))}
                </Select>
              </ItensWrapper>
            </Col>
          </Row>
          <ItensWrapper>
            <Checkbox
              style={{fontSize: "12px"}}
              onChange={(e) => this.changeFields('available_price', e.target.checked)}
              checked={selectedProduct.available_price}
            >
              Aceita proposta de valor
            </Checkbox>
          </ItensWrapper>
          <ItensWrapper>
            <Checkbox
              style={{fontSize: "12px"}}
              onChange={(e) => this.changeFields('available_days_location', e.target.checked)}
              checked={selectedProduct.available_days_location}
            >
              Aceita proposta no tempo de locação
            </Checkbox>
          </ItensWrapper>
          <ItensWrapper>
            <TextStyle color="#262626">Descrição</TextStyle>
            <TextArea
              rows={3}
              onChange={(e) => this.changeFields('description', e.target.value)}
              value={selectedProduct.description || ""}
            />
          </ItensWrapper>
          <ItensWrapper>
            <List style={{padding: "7px 0 7px 0"}}>
              <ImgCrop>
                <Upload
                  customRequest={({ file, onSuccess }) => {
                    setTimeout(() => {
                      onSuccess("ok");
                    }, 0);
                  }}
                  listType="picture-card"
                  fileList={selectedProduct.images || []}
                  onChange={this.onUpload}
                >
                  {(!selectedProduct.images || (selectedProduct.images && selectedProduct.images.length < 4)) && '+ Upload'}
                </Upload>
              </ImgCrop>
            </List>
          </ItensWrapper>
          {editMode ? (
            <ButtonWrapper>
              <ButtonStyle
                onClick={this.updateProduct}
                backColorButtom="background-color: #ffcb00"
                marginRight="5px"
                width="50%"
              >
                SALVAR ALTERAÇÕES
              </ButtonStyle>
              <ButtonStyle
                onClick={this.removeProduct}
                backColorButtom="background-color: #e73554"
                backHoverButton="#e73554"
                colorButton="#ffffff"
                color="#000000"
                width="50%"
              >
                REMOVER DO CLOSET
              </ButtonStyle>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <ButtonStyle
                onClick={this.newProduct}
                backColorButtom="background-color: #ffcb00"
                marginRight="5px"
                width="50%"
              >
                CADASTRAR PEÇA
              </ButtonStyle>
            </ButtonWrapper>
          )}

          {successMsg && (
            <Row>
              <Col span={24}>
                <Alert message={successMsg} type="success" showIcon/>
              </Col>
            </Row>
          )}

          {!successMsg && errorMsg && (
            <Row>
              <Col span={24}>
                <Alert style={{whiteSpace: 'pre'}} message={errorMsg} type="error" showIcon />
              </Col>
            </Row>
          )}

        </Col>
      </Row>
    );
  }
}

export default MyCloset;