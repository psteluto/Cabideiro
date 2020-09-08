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
    width: ${props => props.widthStyle || "95%"};;
    height: ${props => props.heightStyle || "100%"};;
`;

const Card = () => {
   return(
      <CardWrapper>
          <ImageStyle src={HomeImage1} />
          <TextStyle color="#262626" fontSize="10px" marginTop="16px">BATA ESTAMPADA - ROSA</TextStyle>
          <TextStyle color="#e73554" fontSize="10px" marginTop="8px" strong>R$ 29,90</TextStyle>
      </CardWrapper>
   )
}

export default Card;