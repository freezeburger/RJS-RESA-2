import styled from '@emotion/styled';

export const HeaderWrapper = styled.header<{online?:boolean}>`
   color:${ props => props.online ? 'black' : 'white'};
   background-color: ${ props => props.online ? 'var(--global-bg-color)' : 'crimson'};
   padding: 16px;
   border-bottom: 1px solid #eee;
   transition: background-color 0.5s ease;
`;
