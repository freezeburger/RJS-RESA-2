/* Global Imports */
import React, { FC } from 'react';

/* Application Level Imports */
import * as Hooks from '@/hooks';

/* Local Imports */
import { DataGridWrapper } from './DataGrid.styled';


interface DataGridProps { }


const DataGrid: FC<DataGridProps> = () => {

   // Hooks.useGloblaEvent('click',()=> console.log('click event'));

   return(
   <DataGridWrapper data-testid="DataGrid">
      DataGrid Component
   </DataGridWrapper>
   );

}

/**
 * USAGE: DataGrid description to complete.
 * @example
 * <DataGrid /> 
 */
const DataGridMemo = React.memo(DataGrid, (prevProps, nextProps) => {
   /*
   Compare props to prevent unnecessary re-renders
   return true if props are equal
   return false if props are not equal
   */
   console.log(prevProps, nextProps)
   return true;
});
DataGridMemo.displayName = 'DataGrid Memoized';

export default DataGridMemo;
