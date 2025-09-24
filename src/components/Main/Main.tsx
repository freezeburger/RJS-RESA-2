/* Global Imports */
import React, { FC } from 'react';

/* Application Level Imports */
import * as Hooks from '@/hooks';

/* Local Imports */
import { MainWrapper } from './Main.styled';


interface MainProps extends React.PropsWithChildren { }


const Main: FC<MainProps> = (props) => {

   // Hooks.useGloblaEvent('click',()=> console.log('click event'));

   return(
   <MainWrapper data-testid="Main" {...props}/>
   );

}

/**
 * USAGE: Main description to complete.
 * @example
 * <Main /> 
 */
const MainMemo = React.memo(Main, (prevProps, nextProps) => {
   /*
   Compare props to prevent unnecessary re-renders
   return true if props are equal
   return false if props are not equal
   */
   console.log(prevProps, nextProps)
   return true;
});
MainMemo.displayName = 'Main Memoized';

export default MainMemo;
