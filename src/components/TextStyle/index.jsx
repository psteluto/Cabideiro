import styled from 'styled-components';
import { Typography } from 'antd';

const { Text } = Typography;

const TextStyle = styled(Text)`
    color: ${props => props.color || "#ffffff"};    
    margin-left: ${props => props.marginLeft || "0"};    
    font-size: 12px;
`;

export default TextStyle;