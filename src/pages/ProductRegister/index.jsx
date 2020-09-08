import React from 'react';
import styled from 'styled-components';
import Logotipo from '../../components/Logotipo' 

const LogoWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;

const ProductRegister = () => {
   return(
      <div>
         <LogoWrapper>
            <Logotipo/>  
         </LogoWrapper>        
      </div>
   )
}

export default ProductRegister;