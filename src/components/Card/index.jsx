import React from 'react';
import styled from 'styled-components';
import HomeImage1 from '../../images/details-1.png'
import TextStyle from '../TextStyle';

const CardWrapper = styled.div`
   display: flex;
   flex-direction: column;
   text-align: center;
`;

const ImageStyle = styled.img`
    width: ${props => props.widthStyle || "100%"};;
    height: ${props => props.heightStyle || "100%"};;
`;

const Card = () => {
   return(
      <CardWrapper>
          <ImageStyle src={HomeImage1} />
          <TextStyle color="#262626" fontSize="11px" marginTop="16px">BATA ESTAMPADA - ROSA</TextStyle>
          <TextStyle color="#e73554" fontSize="12px" marginTop="8px" strong>R$ 29,90</TextStyle>
      </CardWrapper>
   )
}

export default Card;