import React from 'react';
import Logotipo from '../../components/Logotipo' 
import styled from 'styled-components';
import Menu from '../../components/Menu';
import HomeImage from '../../images/home.png'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { LeftSquareFilled, RightSquareFilled } from '@ant-design/icons';
import TextStyle from '../../components/TextStyle';
import Card from '../../components/Card'

const LogoWrapper = styled.div`
   text-align: center;
`;

const BodyWrapper = styled.img`
   width: 100%;
   height: 400px;
   margin: 38px 0;
`;

const CarouselWrapper = styled.div`
   margin: 0 216px;
   margin-bottom: 38px
`;

const ComoFunciona = styled.div`
   background-color: #ebebeb;   
   
`;

const Home = () => {
   return(
      <div>
         <LogoWrapper>
            <Logotipo/>     
            <Menu/>  
            <BodyWrapper src={HomeImage}/>
         </LogoWrapper>
         <CarouselWrapper>
            <Carousel infinite arrows slidesPerPage={4} slidesPerScroll={3} animationSpeed={2000} autoPlay={4000} offset={15} itemWidth={200} stopAutoPlayOnHover centered
            arrowLeft={<LeftSquareFilled style={{fontSize: '30px', color: '#000000'}}/>}
            arrowRight={<RightSquareFilled style={{fontSize: '30px', color: '#000000'}}/>} addArrowClickHandler>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
            </Carousel>
         </CarouselWrapper>
         <ComoFunciona>
            <TextStyle fontSize="20px" color="#262626" marginLeft="240px" marginTop="40px">Como funciona?</TextStyle>
         </ComoFunciona>
      </div>
   )
}

export default Home;