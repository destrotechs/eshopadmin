import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppUsers = Loadable(lazy(() => import('./allusers/allusers')));
const SystemUsers = Loadable(lazy(() => import('./allusers/systemusers')));
const Roles = Loadable(lazy(() => import('./allusers/roles')));
const UserRoles = Loadable(lazy(() => import('./allusers/userroles')));
const RoleRights = Loadable(lazy(() => import('./allusers/role_rights')));
const Rights = Loadable(lazy(() => import('./allusers/rights')));
const EditUser = Loadable(lazy(() => import('./allusers/edituser')));
const Orders = Loadable(lazy(() => import('./orders')));
const Order = Loadable(lazy(() => import('./vieworder')));

const userRoutes = [
  {
    path: '/customers/all',
    element: <AppUsers />,
  },
  {
    path: '/users/all',
    element: <SystemUsers />,
  },
  {
    path: '/roles',
    element: <Roles />,
  },
  {
    path: '/user/roles',
    element: <UserRoles />,
  },
  {
    path: '/rights/all',
    element: <Rights />,
  },
  {
    path: '/role/rights',
    element: <RoleRights />,
  },
  {
    path: '/orders/all',
    element: <Orders />,
  },
  {
    path: '/order/:id',
    element: <Order />,
  },
  {
    path: '/user/edit/:id',
    element: <EditUser />,
  },
];
export default userRoutes;
