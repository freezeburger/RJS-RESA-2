/* Global Imports */
import  { FC } from 'react';

/* Application Level Imports */
import * as UI from '@/components';
import * as Features from '@/containers';
import * as Hooks from '@/hooks';

/* Local Imports */
import './Home.style.css';


interface HomeProps {}

const Home: FC<HomeProps> = () => {

   Hooks.useDocumentTitle('Home View');

   return (
   <div className="Home" data-testid="Home">
      <UI.Header>Home</UI.Header>
      <UI.Main>Home Content</UI.Main>
      <UI.Footer />
   </div>
   )
};

export default Home;
