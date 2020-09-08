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

const CardWrapper = styled(Card)`
   margin-right:
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
         <Row>
            <FilterWrapper>
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
            </FilterWrapper>
         </Row>
         <Row>
            <FilterWrapper>
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
            </FilterWrapper>
         </Row>
         <Row>
            <FilterWrapper>
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
            </FilterWrapper>
         </Row>
         <Row>
            <FilterWrapper>
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
            </FilterWrapper>
         </Row>
      </div>
   )
}

export default Catalog;