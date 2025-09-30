/* Global Imports */
import { FC } from 'react';

/* Application Imports */
// import * as UI from '@/components';
import * as Hooks from '@/hooks';

/* Local Imports */
import './Products.style.css';
import { ProductsProps } from './Products.types';

type FormInputs = {
   example: string
   exampleRequired: string
 }

const Products: FC<ProductsProps> = ({logic}) => {

   /**
    * This is an example of how to use react-hook-form in your component.
    * Replace or remove as needed.
    * @see https://react-hook-form.com/get-started
    */
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = Hooks.useForm<FormInputs>();

   const onSubmit = (data: FormInputs) => {
      console.log(data);
   }
   return (
      <>
         { JSON.stringify }
      </>
   )
};

export default Products;
