/* Global Imports */
import React, { FC } from 'react';

/* Application Level Imports */
import * as Hooks from '@/hooks';

/* Local Imports */
import { HeaderWrapper } from './Header.styled';


interface HeaderProps{ 
   children: string;
}


const Header: FC<HeaderProps> = ({children}) => {

   const online = Hooks.useOnlineStatus();

   return(
   <HeaderWrapper data-testid="Header" online={online}>
      {children}
   </HeaderWrapper>
   );

}

/**
 * USAGE: Header description to complete.
 * @example
 * <Header /> 
 */
const HeaderMemo = React.memo(Header, (prevProps, nextProps) => {
   /*
   Compare props to prevent unnecessary re-renders
   return true if props are equal
   return false if props are not equal
   */
   console.log(prevProps, nextProps)
   return true;
});
HeaderMemo.displayName = 'Header Memoized';

export default HeaderMemo;
