import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import TextStyle from '../TextStyle';

const CardWrapper = styled.div`
   display: flex;
   flex-direction: column;
   text-align: center;
   ${({hasClick})=>hasClick && css`&:hover{cursor: pointer}`}
`;

const ImageStyle = styled.img`
    width: ${props => props.widthStyle || "100%"};;
    height: ${props => props.heightStyle || "100%"};;
`;

const Card = ({imageUrl, name, price, onClick, className}) => {
  const handleClick = () => {
    if (onClick) onClick()
  }

  return (
    <CardWrapper className={className} onClick={handleClick} hasClick={onClick}>
      <ImageStyle src={imageUrl}/>
      <TextStyle color="#262626" fontSize="11px" marginTop="16px">{name}</TextStyle>
      {price && (
        <TextStyle color="#e73554" fontSize="12px" marginTop="8px" strong>R$ {price}</TextStyle>
      )}
    </CardWrapper>
  )
}

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string,
  onClick: PropTypes.func,
}

export default Card;