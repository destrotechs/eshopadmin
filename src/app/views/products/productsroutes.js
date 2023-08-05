import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const Products =  Loadable(lazy(() => import('./allproducts')));
const Categories =  Loadable(lazy(() => import('./categories')));
const SubCategories =  Loadable(lazy(() => import('./subcategories')));

const productRoutes = [
    {
      path: '/products/all',
      element:<Products/>,
    },
    {
      path: '/categories/all',
      element:<Categories/>,
    },
    {
      path: '/subcategories/all',
      element:<SubCategories/>,
    },
    
];
export default productRoutes;