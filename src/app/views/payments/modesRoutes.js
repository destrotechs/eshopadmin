import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const PaymentModes = Loadable(lazy(() => import('./modes')));
const Payments = Loadable(lazy(() => import('./payments')));

const modesRoutes = [
  {
    path: '/payment/modes',
    element: <PaymentModes />,
  },
  {
    path: '/payments/all',
    element: <Payments />,
  },
];
export default modesRoutes;
