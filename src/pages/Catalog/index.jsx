import React from 'react';
import Logotipo from '../../components/Logotipo' 
import styled from 'styled-components';
import Menu from '../../components/Menu';
import Card from '../../components/Card'
import { Row, Col, Select } from 'antd';

const { Option } = Select;

const LogoWrapper = styled.div`
   text-align: center;
`;

const FilterWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin: 24px 240px 35px 240px;
   width: 100%;
`;

const SelectStyle = styled(Select)`
   width: 160px;
`;

const ProductWrapper = styled.div`
   margin: 0 240px 69px 240px;
`;

const ProductStyle = styled(Card)`

`;

const Catalog = () => {
   return(
      <div>
         <LogoWrapper>
            <Logotipo/>     
            <Menu/> 
         </LogoWrapper>
         <Row>
            <FilterWrapper>
               <SelectStyle defaultValue="Tamanho"></SelectStyle>
               <SelectStyle defaultValue="Categoria"></SelectStyle>
               <SelectStyle defaultValue="Marca"></SelectStyle>
               <SelectStyle defaultValue="Cor"></SelectStyle>            
            </FilterWrapper>
         </Row>
         <ProductWrapper>
            <Row>
               <Col span={6}>
                  <ProductStyle/>
               </Col>
               <Col span={6}>
                  <ProductStyle/>
               </Col>
               <Col span={6}>
                  <ProductStyle/>
               </Col>
               <Col span={6}>
                  <ProductStyle/>
               </Col>
            </Row>
            <Row>
               <Col span={6}>
                  <Card/>
               </Col>
               <Col span={6}>
                  <Card/>
               </Col>
               <Col span={6}>
                  <Card/>
               </Col>
               <Col span={6}>
                  <Card/>
               </Col>
            </Row>
            <Row>
               <Col span={6}>
                  <Card/>
               </Col>
               <Col span={6}>
                  <Card/>
               </Col>
               <Col span={6}>
                  <Card/>
               </Col>
               <Col span={6}>
                  <Card/>
               </Col>
            </Row>
            <Row>
               <Col span={6}>
                  <Card/>
               </Col>
               <Col span={6}>
                  <Card/>
               </Col>
               <Col span={6}>
                  <Card/>
               </Col>
               <Col span={6}>
                  <Card/>
               </Col>
            </Row>
         </ProductWrapper>
      </div>
   )
}

export default Catalog;