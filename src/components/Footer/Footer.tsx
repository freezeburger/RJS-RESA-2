/* Global Imports */
import React, { FC } from 'react';

/* Application Level Imports */
import * as Hooks from '@/hooks';

/* Local Imports */
import { FooterWrapper } from './Footer.styled';


interface FooterProps { }


const Footer: FC<FooterProps> = () => {

   return(
   <FooterWrapper data-testid="Footer">
         <pre>
Parc d'activités de la Bretonnière
16 rue Augustin Fresnel

85600 Montaigu-Vendée

France

Tel : +33 (0)2 51 24 70 00

Email : info@resa.fr
         </pre>
   </FooterWrapper>
   );

}

/**
 * USAGE: Footer description to complete.
 * @example
 * <Footer /> 
 */
const FooterMemo = React.memo(Footer, (prevProps, nextProps) => {
   /*
   Compare props to prevent unnecessary re-renders
   return true if props are equal
   return false if props are not equal
   */
   console.log(prevProps, nextProps)
   return true;
});
FooterMemo.displayName = 'Footer Memoized';

export default FooterMemo;
