import styled from '@emotion/styled';

export interface ButtonWrapperProps {
   primary?: boolean;
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
   background-color: ${props => props.primary ? 'darkslateblue' : 'lightgray'};
   color: ${props => props.primary ? 'white' : 'black'};
   border: none;
   border-radius: 4px;
   padding: 12px 16px;
   cursor: pointer;

   &:hover {
      background-color: darkslateblue;
      color: white;
   }
`;
