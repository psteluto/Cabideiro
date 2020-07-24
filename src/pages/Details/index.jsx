import React from 'react';
import styled from 'styled-components';
import Logotipo from '../../components/Logotipo'
import Menu from '../../components/Menu';
import Details1 from '../../images/details-1.png';
import Details2 from '../../images/details-2.png';
import Details3 from '../../images/details-3.png';
import TextStyle from '../../components/TextStyle';
import { Row, Col, Button, Collapse } from 'antd';

const { Panel } = Collapse;

const LogoWrapper = styled.div`
   text-align: center;
`;

const ButtonStyle = styled(Button)`
   color: ${props => props.colorButton || "#000000"};
   border: #ffffff;
   &:hover {
      background: ${props => props.backHoverButton || "#ffcb00"};     
    } 
   ${props => props.backColorButtom || ""};
   margin-top: 15px;
   width: 240px;
   height: 30px;
`;

const ColImage = styled.div`
   margin-top: 64px;
   margin-bottom: 48px;
   margin-left: 170px;
   width: 360px;
   height: 500px;
`;

const ColImages = styled.div`
   width: 122px;
   height: 152px;
   margin-top: 64px;
   margin-left: 242px;
`;

const ColDescription = styled.div`
   width: 240px;
   margin-top: 64px;
   margin-left: 30px;
`; 

const RowDescriptionItem = styled.div`  
   margin-bottom: ${props => props.marginBottom || "0"};
   ${props => props.aling || "0"};
`;

const ImageWrapper = styled.img`
   width: 100%;
   height: 100%;
`;

const Details = () => {
   return(
      <div>
         <LogoWrapper>
            <Logotipo/>     
            <Menu/>             
         </LogoWrapper>
         <Row>
            <Col span={4}>
               <ColImages>               
                  <RowDescriptionItem marginBottom="16px">
                     <ImageWrapper src={Details2}></ImageWrapper> 
                  </RowDescriptionItem>
                  <RowDescriptionItem>
                     <ImageWrapper src={Details3}></ImageWrapper> 
                  </RowDescriptionItem>      
               </ColImages>         
            </Col>
            <Col span={10}>
               <ColImage>
                  <ImageWrapper src={Details1}></ImageWrapper> 
               </ColImage>   
            </Col>
            <Col span={10}>
               <ColDescription>         
                  <RowDescriptionItem aling="text-align: center">
                     <RowDescriptionItem marginBottom="22px" >
                        <TextStyle color="#262626" strong>Blusa Chiffon Recorte nas Mangas - Azul Marinho</TextStyle>
                     </RowDescriptionItem>
                     <RowDescriptionItem marginBottom="10px" >
                        <TextStyle color="#e73554" strong>R$ 69,90</TextStyle>
                     </RowDescriptionItem>
                     <RowDescriptionItem >
                        <TextStyle color="#000000">TAMANHO: </TextStyle>
                        <TextStyle color="#000000" strong>M</TextStyle>
                     </RowDescriptionItem>
                     <RowDescriptionItem>
                        <TextStyle color="#000000" marginBottom="24px">MARCA: </TextStyle>
                        <TextStyle color="#000000" marginBottom="24px" strong>Riachuelo</TextStyle>
                     </RowDescriptionItem>
                  </RowDescriptionItem>                  
                  <RowDescriptionItem>
                     <ButtonStyle type="primary">ALUGAR</ButtonStyle>
                  </RowDescriptionItem>
                  <RowDescriptionItem marginBottom="10px">
                     <ButtonStyle type="primary" backColorButtom="background-color: #e73554" backHoverButton="#e73554" colorButton="#ffffff">FAZER PROPOSTA</ButtonStyle>
                  </RowDescriptionItem>  
                  <RowDescriptionItem marginBottom="56px">
                     <TextStyle color="#1f89e5">Calcule o frete</TextStyle>
                  </RowDescriptionItem> 
                  <RowDescriptionItem marginBottom="18px">
                     <Collapse defaultActiveKey={['0']} ghost>
                        <Panel header="DETALHES">
                        <TextStyle color="#262626">Blusa de chiffon confeccionada em modelagem ampla que possui decote em U, mangas longas com recortes e detalhe de amarração. Leve e fresh, ótima para compor looks casuais.</TextStyle>
                        </Panel>
                     </Collapse>
                  </RowDescriptionItem>   
               </ColDescription>               
            </Col>
         </Row>
      </div>
      
   )
}

export default Details;