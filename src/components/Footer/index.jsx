import React from 'react';
import styled from 'styled-components';
import TextStyle from '../TextStyle';

const FooterStyle = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #ebebeb;
    padding: 25px 52px;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 1.8;
`;

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 10px 0;
`;

const FooterWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 25px 0;
    background-color: #ee365f;
`;

const Footer = () => {
    return(
        <div>
            <FooterStyle>
                <ColumnWrapper>
                    <TextStyle color="#262626" strong>LOCADOR</TextStyle>  
                    <TextStyle color="#656668" strong>Disponibilizar vestimenta</TextStyle>  
                </ColumnWrapper>        
                <ColumnWrapper>  
                    <TextStyle color="#262626" strong>LOCATÁRIO</TextStyle> 
                    <TextStyle color="#656668" strong>Entenda o aluguel</TextStyle>  
                    <TextStyle color="#656668" strong>Alugar vestimenta</TextStyle>  
                </ColumnWrapper>  
                <ColumnWrapper>
                    <TextStyle color="#262626" strong>SOBRE NÓS</TextStyle>    
                    <TextStyle color="#656668" strong>Quem somos</TextStyle>        
                    <TextStyle color="#656668" strong>FAQ</TextStyle>        
                    <TextStyle color="#656668" strong>Contato</TextStyle>        
                    <TextStyle color="#656668" strong>Parceria</TextStyle>        
                </ColumnWrapper>
                <ColumnWrapper>
                    <ItemWrapper>
                        <TextStyle color="#262626" strong>Cabideiro - Armário Compartilhado</TextStyle>   
                        <TextStyle color="#656668" strong>Av. Lins de Vasconcelos, 1964.</TextStyle>        
                        <TextStyle color="#656668" strong>Aclimação | São Paulo - SP</TextStyle>        
                        <TextStyle color="#656668" strong>CEP 01538-001</TextStyle>
                    </ItemWrapper>
                    <ItemWrapper>
                        <TextStyle color="#262626" strong>E-mail</TextStyle> 
                        <TextStyle color="#656668" strong>contato@cabideiro.com.br</TextStyle>
                    </ItemWrapper>
                    <ItemWrapper>
                        <TextStyle color="#262626" strong>Telefone / Whatsapp</TextStyle> 
                        <TextStyle color="#656668" strong>(11) 2667-8060 / (11) 99391-3716</TextStyle>
                    </ItemWrapper>
                </ColumnWrapper>
            </FooterStyle>    
            <FooterWrapper>
                <ColumnWrapper>
                    <TextStyle strong>Termos de Uso</TextStyle>
                    <TextStyle opacity="0.8">Termos e condições de uso do locador</TextStyle>
                    <TextStyle opacity="0.8">Termos e condições de uso do locatário</TextStyle>
                    <TextStyle opacity="0.8">Política e Privacidade</TextStyle>
                    <TextStyle opacity="0.8">Modelo de Contrato de Locação</TextStyle>
                </ColumnWrapper>
                <ColumnWrapper>
                    <TextStyle fontSize="10px" strong>Estrutura</TextStyle>
                    <TextStyle opacity="0.8">Google CloudPlatform</TextStyle>
                    <TextStyle fontSize="10px" strong>Site Seguro</TextStyle>
                    <TextStyle opacity="0.8">Let's Encrypt</TextStyle>
                    <TextStyle fontSize="10px" strong>Assinatura Digital</TextStyle>
                    <TextStyle opacity="0.8">AUTENTIQUE</TextStyle>
                </ColumnWrapper>
            </FooterWrapper>      
        </div>       
    )
 }
 
 export default Footer;