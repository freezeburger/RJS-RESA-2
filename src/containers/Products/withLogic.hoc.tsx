/* Global Imports */
import { FC } from 'react';

/* Application Imports */
// Add any necessary imports here

/* Local Imports */
import { ProductsProps } from './Products.types';
import { useLogic } from "./useLogic.hook";

export const withLogic = (Component:FC<ProductsProps>) => {

    return (props:object) => {
        const logic = useLogic();
        return <Component logic={logic} {...props}/>
    }
}