import React, {Component} from 'react';
import styled from "styled-components";
import {Alert, Checkbox, Col, Input, List, Row, Select, Upload, InputNumber, Button, Modal} from "antd";
import ImgCrop from "antd-img-crop";
import {connect} from 'react-redux';
import ProductService from '../../services/Product';
import TextStyle from "../../components/TextStyle";
import ButtonStyle from '../../components/ButtonStyle';
import MoneyInput from "../../components/MoneyInput";
import Card from '../../components/Card';
import {setIncomeProducts} from '../../redux/ProductsMockSlice';

const {TextArea} = Input;
const {Option} = Select;

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
        images: [],
        contract: false
      },
      successMsg: "",
      errorMsg: "",
      editMode: true,
      openContract: false
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
    if (!selectedProduct.price) msg += "Campo 'Valor do Aluguel' é obrigatório\n";
    if (!selectedProduct.full_price) msg += "Campo 'Valor Original' é obrigatório\n";
    if (!selectedProduct.size) msg += "Campo 'Tamanho' é obrigatório\n";
    if (!selectedProduct.color_id) msg += "Campo 'Cor' é obrigatório\n";
    if (!selectedProduct.brand_id) msg += "Campo 'Marca' é obrigatório\n";
    if (!selectedProduct.max_days_location) msg += "Campo 'Tempo de Locação' é obrigatório\n";
    if (!selectedProduct.gender) msg += "Campo 'Sexo' é obrigatório\n";
    if (!selectedProduct.clothing_part_id) msg += "Campo 'Categoria da Peça' é obrigatório\n";
    if (!selectedProduct.description) msg += "Campo 'Descrição' é obrigatório\n";
    if (!selectedProduct.images) msg += "Pelo menos uma imagem é obrigatória\n";
    if (!selectedProduct.contract) msg += "Você precisa aceitar os termos do contrato\n";

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
    const res = await ProductService.getUserProducts(localStorage.getItem("userId"));
    const rawProducts = res.data;

    if (ProductService.activeMock){
      const {setIncomeProducts: dispatchIncomeProducts} = this.props;

      let prod1 = {}
      if (rawProducts[0])
        prod1 = {
          id: rawProducts[0].id,
          status: "Em separação",
          name: rawProducts[0].name,
          color: rawProducts[0].color.name,
          client: "Camila Almeida",
          devolutionDate: "20/10/2020",
          rentValue: rawProducts[0].price,
          paymentStatus: "Em Andamento",
          image: rawProducts[0].image_products[0].image_url
        }

      let prod2 = {}
      if (rawProducts[1])
        prod2 = {
          id: rawProducts[1].id,
          status: "Em devolução",
          name: rawProducts[1].name,
          color: rawProducts[1].color.name,
          client: "Camila Almeida",
          devolutionDate: "20/10/2020",
          rentValue: rawProducts[1].price,
          paymentStatus: "Em Andamento",
          image: rawProducts[1].image_products[0].image_url
        }

      let prod3 = {}
      if (rawProducts[2])
        prod3 = {
          id: rawProducts[2].id,
          status: "Devolvido",
          name: rawProducts[2].name,
          color: rawProducts[2].color.name,
          client: "Camila Almeida",
          devolutionDate: "20/10/2020",
          rentValue: rawProducts[2].price,
          paymentStatus: "Em Andamento",
          image: rawProducts[2].image_products[0].image_url
        }

      let prod4 = {}
      if (rawProducts[3])
        prod4 = {
          id: rawProducts[3].id,
          status: "Finalizado",
          name: rawProducts[3].name,
          color: rawProducts[3].color.name,
          client: "Camila Almeida",
          devolutionDate: "20/10/2020",
          rentValue: rawProducts[3].price,
          paymentStatus: "Disponível",
          image: rawProducts[3].image_products[0].image_url
        }

      dispatchIncomeProducts([prod1, prod2, prod3, prod4])
    }

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
    const {
      products, brands, sizes, colors, clothingParts,
      selectedProduct, successMsg, errorMsg, editMode, openContract
    } = this.state;

    return (
      <Row>
        <Col span={10}>
          <CardWrapper>
            <ButtonStyle backColorButtom="background-color: #e73554" backHoverButton="#e73554"
                         colorButton="#ffffff" color="#000000" onClick={this.clickNewProduct}>+ Nova Peça</ButtonStyle>
            <List style={{marginTop: 20}}>
              {products.map(product => (

                <Card
                  imageUrl={product.images[0] && product.images[0].url}
                  onClick={() => this.selectProduct(product)}
                  name={product.name}
                  selected={product.id === selectedProduct.id}
                  width={185}
                />

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
                <TextStyle color="#262626">Valor do Aluguel</TextStyle>
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
                <TextStyle color="#262626">Tempo de Locação</TextStyle>
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
                <TextStyle color="#262626">Departamento</TextStyle>
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
                  customRequest={({file, onSuccess}) => {
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

          <ItensWrapper>
            <Checkbox
              style={{fontSize: "12px"}}
              onChange={(e) => this.changeFields('contract', e.target.checked)}
              checked={selectedProduct.contract}
            />
            &nbsp;Eu aceito os termos do <a onClick={()=>this.setState({openContract: true})}>contrato</a>
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
                <Alert style={{whiteSpace: 'pre'}} message={errorMsg} type="error" showIcon/>
              </Col>
            </Row>
          )}

          <Modal
            visible={openContract}
            title="Termos de contrato"
            onCancel={() => this.setState({openContract: false})}
            footer={[
              <ButtonStyle type="primary" onClick={()=>this.setState({openContract: false})}>Ok</ButtonStyle>
            ]}
          >
            <div>
              Ao clicar em “Li e Aceito os Termos do Contrato de Locação” a LOCADORA declara estar de acordo e em cumprir com os termos e condições do presente Contrato de Locação, bem como aqueles constantes nos Termos e Condições e Política de Privacidade do Site.
              <br /><br />
              Cláusula 1ª – Valor e Forma de Pagamento da Locação
              <br /><br />
              1.1. A LOCADORA pode a qualquer momento reajustar o valor do aluguel do(s) Produto(s). Essa alteração não afetará o valor do(s) Produto(s) em pedido(s) préviamente realizado(s) pela LOCATÁRIA.
              <br /><br />
              Cláusula 2ª – Prazo da Locação
              <br /><br />
              2.1. O prazo da Locação será aquele escolhido pela LOCATÁRIA no ato da contratação, de acordo com as opções disponibilizadas pela LOCADORA.
              <br /><br />
              Cláusula 3ª – Entrega do(s) Produto(s) Locado(s)
              <br /><br />
              3.1. A LOCADORA se compromete a definir o endereço de cadastro para a entrega do(s) produto(s) locado(s) em um local de fácil acesso (portaria, recepção de prédio comercial ou pessoa responsável para o recebimento do produto).
            </div>
          </Modal>

        </Col>
      </Row>
    );
  }
}

export default connect(null, {setIncomeProducts})(MyCloset);