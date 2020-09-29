import styled from 'styled-components';
import {Button} from 'antd';

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

export default ButtonStyle;