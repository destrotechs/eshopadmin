import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const AppUsers =  Loadable(lazy(() => import('./allusers/allusers')));
const EditUser =  Loadable(lazy(() => import('./allusers/edituser')));
const Orders =  Loadable(lazy(() => import('./orders')));

const userRoutes = [
    {
      path: '/users/all',
      element:<AppUsers/>,
    },
    {
      path: '/orders/all',
      element:<Orders/>,
    },
    {
      path: '/users/edit/:user',
      element:<EditUser />,
    }
];
export default userRoutes;