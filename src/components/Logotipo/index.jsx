import React from 'react';
import logotipo from '../../images/logotipo.png';
import styled from 'styled-components';

const LogoStyle = styled.img`
    width: 276px;
    height: 143px;    
`;

const Logotipo = () => {
    return(
          <LogoStyle src={logotipo}/>   
    )
 }
 
 export default Logotipo;