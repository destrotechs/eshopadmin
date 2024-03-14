import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const PaymentModes = Loadable(lazy(() => import('./modes')));

const modesRoutes = [
  {
    path: '/payment/modes',
    element: <PaymentModes />,
  },
];
export default modesRoutes;
