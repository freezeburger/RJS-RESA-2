/* Global Imports */
import React, { FC } from 'react';

/* Application Level Imports */
import * as Hooks from '@/hooks';

/* Local Imports */
import { CardWrapper } from './Card.styled';


interface CardProps { }


const Card: FC<CardProps> = () => {

   // Hooks.useGloblaEvent('click',()=> console.log('click event'));

   return(
   <CardWrapper data-testid="Card">
      Card Component
   </CardWrapper>
   );

}

/**
 * USAGE: Card description to complete.
 * @example
 * <Card /> 
 */
const CardMemo = React.memo(Card, (prevProps, nextProps) => {
   /*
   Compare props to prevent unnecessary re-renders
   return true if props are equal
   return false if props are not equal
   */
   console.log(prevProps, nextProps)
   return true;
});
CardMemo.displayName = 'Card Memoized';

export default CardMemo;
