/* Global Imports */
import  { FC } from 'react';

/* Application Level Imports */
import * as UI from '@/components';
import * as Features from '@/containers';
import * as Hooks from '@/hooks';

/* Local Imports */
import './Users.style.css';
import { Column } from '@/components/DataGrid/DataGrid';


interface UsersProps {}

const Users: FC<UsersProps> = () => {

   Hooks.useDocumentTitle('Users View');

   return (
   <div className="Users" data-testid="Users">
      <UI.Header>Users</UI.Header>
      <UI.Main>
         <UserGrid />
      </UI.Main>
      <UI.Footer />
   </div>
   )
};

export default Users;

type User = {
  id: number;
  name: string;
  age: number;
  city: string;
};

const rows: User[] = [
  { id: 1, name: "Alice", age: 28, city: "Paris" },
  { id: 2, name: "Bob", age: 34, city: "Lyon" },
  { id: 3, name: "Charlie", age: 22, city: "Marseille" },
  { id: 4, name: "Diane", age: 45, city: "Bordeaux" },
  { id: 5, name: "Eve", age: 31, city: "Toulouse" },
  { id: 6, name: "Fred", age: 26, city: "Nantes" },
  { id: 7, name: "George", age: 39, city: "Lille" },
  { id: 8, name: "Hannah", age: 29, city: "Nice" },
  { id: 9, name: "Ian", age: 41, city: "Grenoble" },
  { id: 10, name: "Jane", age: 36, city: "Strasbourg" },
];

const columns:Column<User>[] = [
  { key: "id", header: "ID", width: 0.5 },
  { key: "name", header: "Nom", width: 1.5 },
  { key: "age", header: "Âge", width: 1 },
  { key: "city", header: "Ville", width: 1.5 },
] as const;

const UserGrid = () => {

   
  return (
    <div style={{ padding: 20 }}>
      <h2>Exemple DataGrid</h2>
      <UI.DataGrid<User>
        rows={rows}
        columns={columns}
        height={200}
        rowHeight={32}
        initialSort={{ key: "name", dir: "asc" }}
      />
    </div>
  );
}
