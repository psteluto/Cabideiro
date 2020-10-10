import React, {Component} from 'react';
import styled from 'styled-components';
import {Row, Col} from 'antd';
import {Link} from 'react-router-dom';
import {LeftSquareFilled, RightSquareFilled} from '@ant-design/icons';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Logotipo from '../../components/Logotipo'
import Menu from '../../components/Menu';
import HomeImage from '../../images/banner.jpg'
import Locador from '../../images/locador.png'
import Locatario from '../../images/locatario.jpg'
import WardrobeIcon from '../../images/wardrobe.svg';
import CameraIcon from '../../images/camera.svg';
import HandIcon from '../../images/hand.svg';
import TextStyle from '../../components/TextStyle';
import Card from '../../components/Card'
import ProductService from '../../services/Product';

const LogoWrapper = styled.div`
   text-align: center;
`;

const BodyWrapper = styled.img`
   width: 100%;
   height: 513px;
   margin: 38px 0;
   opacity: .7;
`;

const CarouselWrapper = styled.div`
   margin: 0 216px 38px;
`;

const HowItWorks = styled.div`
   background-color: #ebebeb; 
   padding: 40px 240px;  
   align-items: center;
`;

const HowItWorksWrapper = styled.div`
   display: flex;
   justify-content: space-around;
   align-items: center;
`;

const HowWorkImages = styled.img`
  margin-bottom: 22px; 
`;

const HowItWorksItemWrapper = styled.div`
   display: flex;
   align-items: center;
   flex-direction: column;
   margin: 30px 50px;
   text-align: center;
   max-width: 200px;
`;

const TextWrapper = styled.div`
   display: flex;
   flex-direction: column;
   margin: 159px 49px;
`;

const ImageWrapper = styled.img`
   width: 100%;
   height: 100%;
`;

const Container = styled.div`
   position: relative;
`;

const PositionText = styled.div`
   position: absolute;
   bottom: 15%;
   left: 0%;
   margin-left: 73px;
`;

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carouselProducts: []
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    const res = await ProductService.getAll(1, 10);
    this.setState({carouselProducts: res.data})
  }

  clickProduct(id) {
    this.props.history.push(`/product/${id}/details`);
  }

  render() {
    const {carouselProducts} = this.state;

    return (
      <div>
        <LogoWrapper>
          <Link to="/">
            <Logotipo/>
          </Link>
          <Menu/>
          <Container>
            <BodyWrapper src={HomeImage}/>
            <PositionText>
              <div>
                <TextStyle fontSize="50px">Roupas </TextStyle>
                <TextStyle fontSize="50px" color="#e73554">selecionadas</TextStyle>
              </div>
              <div>
                <TextStyle fontSize="50px" marginLeft="200px">para </TextStyle>
                <TextStyle color="#ffcb00" fontSize="50px">qualquer ocasião</TextStyle>
              </div>
            </PositionText>
          </Container>
        </LogoWrapper>
        <CarouselWrapper>
          <Carousel infinite arrows slidesPerPage={4} slidesPerScroll={3} animationSpeed={2000} autoPlay={4000}
                    offset={15} itemWidth={200} stopAutoPlayOnHover centered
                    arrowLeft={<LeftSquareFilled style={{fontSize: '30px', color: '#000000'}}/>}
                    arrowRight={<RightSquareFilled style={{fontSize: '30px', color: '#000000'}}/>} addArrowClickHandler>

            {carouselProducts.map(product =>
              <Card
                key={product.id}
                imageUrl={product.image_products[0].image_url}
                name={`${product.name}`}
                price={product.price.replace('.', ',')}
                onClick={() => this.clickProduct(product.id)}
              />)}

          </Carousel>
        </CarouselWrapper>
        <HowItWorks>
          <TextStyle fontSize="20px" color="#262626">Como funciona?</TextStyle>
          <HowItWorksWrapper>
            <HowItWorksItemWrapper>
              <HowWorkImages src={WardrobeIcon}/>
              <TextStyle color="#262626" strong>Escolha</TextStyle>
              <TextStyle color="#656668" marginTop="5px">Encontre aquela sua peça perfeita, pendurada há um tempo e que
                esteja disponível para aluguel.</TextStyle>
            </HowItWorksItemWrapper>
            <HowItWorksItemWrapper>
              <HowWorkImages src={CameraIcon}/>
              <TextStyle color="#262626" strong>Preparo</TextStyle>
              <TextStyle color="#656668" marginTop="5px">Tire fotos de bons ângulos que capite o quão incrível e
                especial é a sua peça.</TextStyle>
            </HowItWorksItemWrapper>
            <HowItWorksItemWrapper>
              <HowWorkImages src={HandIcon}/>
              <TextStyle color="#262626" strong>Alugando</TextStyle>
              <TextStyle color="#656668" marginTop="5px">Preencha o formulário para locação da sua peça e ela estará
                disponível na loja para que outras pessoas tenham experiências incríveis com o seu look.</TextStyle>
            </HowItWorksItemWrapper>
          </HowItWorksWrapper>
        </HowItWorks>
        <Row>
          <Col span={12}>
            <ImageWrapper src={Locador}/>
          </Col>
          <Col span={12}>
            <TextWrapper>
              <TextStyle color="#262626" fontSize="20px">Locador</TextStyle>
              <TextStyle color="#656668" marginTop="10px" fontSize="14px">
                Coloque suas melhores vestimentas e acessórios para eventos aqui no Cabideiro e ganhe dinheiro com isto.
              </TextStyle>
            </TextWrapper>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <TextWrapper>
              <TextStyle color="#262626" fontSize="20px">Locatário</TextStyle>
              <TextStyle color="#656668" marginTop="10px" fontSize="14px">
                Encontre o seu look perfeito e aprecie usando-o em momentos especiais por alguns dias.
              </TextStyle>
            </TextWrapper>
          </Col>
          <Col span={12}>
            <ImageWrapper src={Locatario}/>
          </Col>
        </Row>
      </div>
    )
  }

}

export default Home;