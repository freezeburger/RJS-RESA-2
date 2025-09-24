/* Global Imports */
import { FC } from 'react';

/* Application Imports */
// import * as UI from '@/components';
import * as Hooks from '@/hooks';

/* Local Imports */
import './Flight.style.css';
import { FlightProps } from './Flight.types';

type FormInputs = {
   iata: string
}

const Flight: FC<FlightProps> = ({ logic }) => {

   /**
    * This is an example of how to use react-hook-form in your component.
    * Replace or remove as needed.
    * @see https://react-hook-form.com/get-started
    */
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = Hooks.useForm<FormInputs>();

   const onSubmit = (data: FormInputs) => {
      console.log(data);
      logic.filter(data.iata);
   }
   return (
      <>
         <div className="Flight" data-testid="Flight">

            Flight Component

            <hr />
            {/* Similar to the example above, you can add more fields as needed or remove completely */}
            <form onSubmit={handleSubmit(onSubmit)}>

               {/* register your input into the hook by invoking the "register" function */}
               <input defaultValue="" {...register("iata")} />

               {/* errors will return when field validation fails  */}
               {errors.iata && <span>This field is required</span>}

               <input type="submit" />
               <button type="button" onClick={() =>{reset();  logic.filter('')}}>Show All</button>
            </form>

            <hr />
            <div>{logic.feedback}</div>
            <ul>
               {
                  logic.flights.map(item => (
                     <li key={item.id}>
                        {item.flight.iata} {item.flight.number} - {item.flight_status}
                        <button onClick={() => logic.remove(item)}>Remove</button>
                     </li>
                  ))
               }
            </ul>

         </div>
      </>
   )
};

export default Flight;
