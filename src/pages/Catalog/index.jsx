import React from 'react';
import Logotipo from '../../components/Logotipo' 
import styled from 'styled-components';
import Menu from '../../components/Menu';

const LogoWrapper = styled.div`
   text-align: center;
`;

const Catalog = () => {
   return(
      <div>
         <LogoWrapper>
            <Logotipo/>     
            <Menu/>                   
         </LogoWrapper>
      </div>
   )
}

export default Catalog;