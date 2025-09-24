/* Global Imports */
import React, { FC, PropsWithChildren } from 'react';

/* Application Level Imports */
import * as Hooks from '@/hooks';

/* Local Imports */
import { ButtonWrapper, ButtonWrapperProps } from './Button.styled';


interface ButtonProps extends PropsWithChildren, ButtonWrapperProps { }



const Button: FC<ButtonProps> = (props) => {

   return(
   <ButtonWrapper data-testid="Button" {...props} />
   );

}

/**
 * USAGE: Button description to complete.
 * @example
 * <Button /> 
 */
const ButtonMemo = React.memo(Button, (prevProps, nextProps) => {
   /*
   Compare props to prevent unnecessary re-renders
   return true if props are equal
   return false if props are not equal
   */
   console.log(prevProps, nextProps)
   return prevProps.children === nextProps.children;
});
ButtonMemo.displayName = 'Button Memoized';

export default ButtonMemo;
