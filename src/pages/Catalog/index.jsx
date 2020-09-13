import React from 'react';
import Logotipo from '../../components/Logotipo' 
import styled from 'styled-components';
import Card from '../../components/Card'
import { Row, Col, Select, Pagination, Input } from 'antd';
import { Link } from 'react-router-dom'

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

const PaginationWrapper = styled.div`
   display: flex;
   justify-content: center;
   margin: 24px 0 24px 0;
`;

const InputWrapper = styled.div`
   margin: 0 240px;
   margin-top: 20px;
`;

const Catalog = () => {
   return(
      <div>
         <LogoWrapper>
            <Logotipo/>  
            <InputWrapper>
               <Input placeholder="O que você está procurando ?"></Input>
            </InputWrapper>
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
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>                  
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
            </FilterWrapper>
         </Row>
         <Row>
            <FilterWrapper>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>                  
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
            </FilterWrapper>
         </Row>
         <Row>
            <FilterWrapper>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>                  
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
            </FilterWrapper>
         </Row>
         <Row>
            <FilterWrapper>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>                  
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
               <Col span={4}>
                  <Link to="/product/1/details" replace>
                     <Card/>
                  </Link>
               </Col>
            </FilterWrapper>
         </Row>
         <PaginationWrapper>
            <Pagination defaultCurrent={1} total={50} />
         </PaginationWrapper>         
      </div>
   )
}

export default Catalog;