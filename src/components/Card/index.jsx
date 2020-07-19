import React from 'react';
import styled from 'styled-components';
import HomeImage1 from '../../images/image1.jpg'
import TextStyle from '../TextStyle';

const CardWrapper = styled.div`
   display: flex;
   flex-direction: column;
   text-align: center;
`;

const ImageStyle = styled.img`
    width: 100%;
    height: 100%;
`;

const Card = () => {
   return(
      <CardWrapper>
          <ImageStyle src={HomeImage1} />
          <TextStyle color="#262626" fontSize="10px" marginTop="10px">CALÇA ALFAIATARIA BÁSICO - PRETO</TextStyle>
          <TextStyle color="#e73554" fontSize="10px" marginTop="8px" strong>R$ 29,90</TextStyle>
      </CardWrapper>
   )
}

export default Card;