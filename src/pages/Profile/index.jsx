import React, { useState } from 'react';
import styled from 'styled-components';
import Logotipo from '../../components/Logotipo' 
import TextStyle from '../../components/TextStyle';
import WomanImage from '../../images/mulher.jpg';
import DetailImage1 from '../../images/details-1.png';
import DetailImage2 from '../../images/details-2.png';
import DetailImage3 from '../../images/details-3.png';
import ListImage1 from '../../images/image1.jpg'
import ListImage2 from '../../images/image2.jpg'
import ListImage3 from '../../images/image3.jpg'
import { Row, Col, Tabs, Avatar, Rate, Input, Checkbox, List, Image, Upload, Button, Select, Card } from 'antd';
import { Link } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option, OptGroup } = Select;
const { Meta } = Card;

const LogoWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;

const ProfileWrapper = styled.div`
   display: flex;
   justify-content: center;
   margin-top: 72px;
`;

const IconsWrapper = styled.div`
   display: flex;
   align-items: center;
   flex-direction: column;
   margin-top: 62px;
`;

const RowInformation = styled.div`
   display: flex;
   justify-content: space-between;
   margin-top: 16px;
`;

const ItensWrapper = styled.div`
   padding: 16px 0 0 0;
   padding-right: ${props => props.paddingRight || "0"};
`;

const ButtonWrapper = styled.div`
   display: flex;
`;

const ButtonStyle = styled(Button)`
   color: ${props => props.colorButton || "#000000"};
   border: #ffffff;
   &:hover { 
      background: ${props => props.backHoverButton || "#ffcb00"}; 
      color: ${props => props.color || "#ffffff"};   
    } 
   ${props => props.backColorButtom || ""};
   margin-top: 15px;
   width: ${props => props.width || "185px"};
   height: 30px;
   margin-right: ${props => props.marginRight || "0"};
   font-size: 12px;   
`;

const CardWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const FeedbackWrapper = styled.div`
   text-align: center;
`;

const Profile = () => {

   const [fileList, setFileList] = useState([
      {
         uid: '-1',
         name: 'image.png',
         status: 'done',
         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
   ]);

   const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
   };
  
    const onPreview = async file => {
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    };

   return(
      <div>
         <LogoWrapper>
            <Logotipo/>
            <TextStyle color="#262626" fontSize="17px">PERFIL</TextStyle>   
         </LogoWrapper>
         <ProfileWrapper>
            <Row>
               <Col span={8}>
                  <Avatar style={{marginRight: 60}} size={80} src={WomanImage} />
               </Col>
               <Col span={16}>
                  <Row>
                     <TextStyle color="#262626" fontSize="14px">PALOMA STELUTO</TextStyle> 
                  </Row> 
                  <RowInformation>
                     <Col span={4}>
                        <Row>
                        <TextStyle color="#262626" fontSize="15px" strong>33</TextStyle>
                        <TextStyle color="#262626" fontSize="11px">Produtos</TextStyle>
                        </Row>
                     </Col>
                     <Col span={4}>
                        <Row>
                           <TextStyle color="#262626" fontSize="15px" strong>700</TextStyle>
                           <TextStyle color="#262626" fontSize="11px">Seguidores</TextStyle>
                        </Row>
                     </Col>
                     <Col span={4}>
                        <Row>
                           <TextStyle color="#262626" fontSize="15px" strong>300</TextStyle>
                           <TextStyle color="#262626" fontSize="11px">Seguindo</TextStyle>
                        </Row>
                     </Col>
                  </RowInformation>
               </Col> 
            </Row>
         </ProfileWrapper>
         <IconsWrapper>
            <Tabs defaultActiveKey="2" centered>
               <TabPane tab="Meu Closet" key="1">
                  <Row>
                     <Col span={10}>  
                        <CardWrapper>                                                    
                              <ButtonStyle backColorButtom="background-color: #e73554" backHoverButton="#e73554" colorButton="#ffffff" color="#000000">+ Nova Peça</ButtonStyle>
                              <List style={{marginTop: 20}}>
                                 <Card style={{ width: 185, marginBottom: 16}} cover={<img src={ListImage1} />}>
                                    <Meta style={{fontSize: "12px"}} description="Blusa Floral" />
                                 </Card>
                                 <Card hoverable style={{ width: 185, marginBottom: 16 }} cover={<img src={ListImage2} />}>
                                    <Meta style={{fontSize: "12px"}} description="Calça Básica" />
                                 </Card>
                                 <Card hoverable style={{ width: 185, marginBottom: 16 }} cover={<img src={ListImage3} />}>
                                    <Meta style={{fontSize: "12px"}} description="Blusa Chiffon" />
                                 </Card>
                              </List> 
                        </CardWrapper>                           
                        </Col>
                        <Col span={14}> 
                           <TextStyle color="#262626">Nome</TextStyle>
                           <Input/>                                                     
                           <Row>
                              <Col span={8}>
                                 <ItensWrapper paddingRight="16px">
                                    <TextStyle color="#262626">Valor</TextStyle>
                                    <Input placeholder="R$"/>
                                 </ItensWrapper>
                              </Col>
                              <Col span={8}>
                                 <ItensWrapper paddingRight="16px">
                                    <TextStyle color="#262626">Tamanho</TextStyle>
                                    <Input/>
                                 </ItensWrapper>
                              </Col>
                              <Col span={8}>
                                 <ItensWrapper>
                                    <TextStyle color="#262626">Cor</TextStyle>
                                    <Input/>
                                 </ItensWrapper>
                              </Col>
                           </Row>
                           <Row>
                              <Col span={12}>
                                 <ItensWrapper paddingRight="16px">
                                    <TextStyle color="#262626">Marca</TextStyle>
                                    <Input/>
                                 </ItensWrapper>
                              </Col>
                              <Col span={12}>
                                 <ItensWrapper>
                                    <TextStyle color="#262626">Tempo Máximo de Locação</TextStyle>
                                    <Input/>
                                 </ItensWrapper>
                              </Col>
                           </Row>
                           <Row>
                           <Col span={12}>
                              <ItensWrapper paddingRight="16px">
                                 <TextStyle color="#262626">Gênero da Peça</TextStyle>
                                 <Select style={{ width: "100%" }}>
                                    <Option value="1">Feminino</Option>
                                    <Option value="2">Masculino</Option>
                                    <Option value="3">Unissex</Option>
                                 </Select>
                              </ItensWrapper>
                           </Col>
                              <Col span={12}>
                                 <ItensWrapper>
                                    <TextStyle color="#262626">Categoria da Peça</TextStyle>
                                    <Select style={{ width: "100%" }}>
                                       <OptGroup label="Roupas">
                                          <Option value="1">Vestidos</Option>
                                          <Option value="2">Saias</Option>
                                          <Option value="3">Blusas</Option>
                                       </OptGroup>
                                       <OptGroup label="Acessórios">
                                          <Option value="4">Brinco</Option>
                                          <Option value="5">Colar</Option>
                                          <Option value="6">Anel</Option>
                                          <Option value="7">Cinto</Option>
                                          <Option value="8">Bolsa</Option>
                                       </OptGroup> 
                                       <OptGroup label="Calçados">
                                          <Option value="9">Scarpin</Option>
                                          <Option value="10">Botas</Option>
                                          <Option value="11">Peep Tue</Option>
                                          <Option value="12">Sandálias</Option>
                                          <Option value="13">Tênis</Option>
                                       </OptGroup>                                    
                                    </Select>
                                 </ItensWrapper>
                              </Col>   
                           </Row>
                           <ItensWrapper>
                              <Checkbox style={{fontSize: "12px"}}>Aceita proposta de valor</Checkbox>
                           </ItensWrapper>
                           <ItensWrapper>
                              <Checkbox style={{fontSize: "12px"}}>Aceita proposta no tempo de locação</Checkbox>
                           </ItensWrapper>
                           <ItensWrapper>
                              <TextStyle color="#262626">Descrição</TextStyle>
                              <TextArea rows={3}/>
                           </ItensWrapper>
                           <ItensWrapper>
                              <List style={{padding: "7px 0 7px 0"}}>
                                 <ImgCrop rotate>
                                    <Upload
                                       action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                       listType="picture-card"
                                       fileList={fileList}
                                       onChange={onChange}
                                       onPreview={onPreview}
                                       >
                                       {fileList.length < 5 && '+ Upload'}
                                    </Upload>
                                 </ImgCrop>
                              </List>
                           </ItensWrapper>
                           <ButtonWrapper>
                                 <ButtonStyle backColorButtom="background-color: #ffcb00" marginRight="5px" width="50%">SALVAR ALTERAÇÕES</ButtonStyle>
                                 <ButtonStyle backColorButtom="background-color: #e73554" backHoverButton="#e73554" colorButton="#ffffff" color="#000000" width="50%">REMOVER DO CLOSET</ButtonStyle>                                                           
                           </ButtonWrapper>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tab="Avaliações" key="2">
                     <Row>
                        <Col span={8}>
                           <FeedbackWrapper>                           
                           <Row>
                              <Col span={6}>
                                 <Avatar size={55} src={WomanImage} />
                              </Col>
                              <Col span={18}>
                                 <Row>
                                    <TextStyle color="#262626" fontSize="12px" style={{fontWeight: "600"}}>Paloma Steluto <Link style={{marginLeft: "10px"}}>Seguir</Link></TextStyle>
                                 </Row>
                                 <Row>
                                    <Rate defaultValue={3} disabled/>
                                 </Row>                               
                              </Col>
                           </Row>
                           </FeedbackWrapper>
                        </Col>
                        <Col span={16}>
                           <TextStyle color="#262626" fontSize="11px">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</TextStyle>
                        </Col>                   
                     </Row>
                     <Row>
                        <Col span={8}>
                           <FeedbackWrapper>                           
                           <Row>
                              <Col span={6}>
                                 <Avatar size={55} src={WomanImage} />
                              </Col>
                              <Col span={18}>
                                 <Row>
                                    <TextStyle color="#262626" fontSize="12px" style={{fontWeight: "600"}}>Paloma Steluto <Link style={{marginLeft: "10px"}}>Seguir</Link></TextStyle>
                                 </Row>
                                 <Row>
                                    <Rate defaultValue={3} disabled/>
                                 </Row>                               
                              </Col>
                           </Row>
                           </FeedbackWrapper>
                        </Col>
                        <Col span={16}>
                           <TextStyle color="#262626" fontSize="11px">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</TextStyle>
                        </Col>                   
                     </Row>
                  </TabPane>
                  <TabPane tab="Histórico" key="3">
                     Comprar Novamente
                  </TabPane>
               </Tabs>
         </IconsWrapper>
      </div>
   )
}

export default Profile;