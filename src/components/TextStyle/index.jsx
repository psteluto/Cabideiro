import styled from 'styled-components';
import { Typography } from 'antd';

const { Text } = Typography;

const TextStyle = styled(Text)`
    color: ${props => props.color || "#ffffff"};    
    margin-left: ${props => props.marginLeft || "0"};    
    margin-top: ${props => props.marginTop || "0"};    
    margin-bottom: ${props => props.marginBottom || "0"};    
    font-size: ${props => props.fontSize || "12px"};
    opacity: ${props => props.opacity || "1"};
    position: ${props => props.position || ""};   
`;

export default TextStyle;