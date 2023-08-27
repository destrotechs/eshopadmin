import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const Products =  Loadable(lazy(() => import('./allproducts')));
const Categories =  Loadable(lazy(() => import('./categories')));
const SubCategories =  Loadable(lazy(() => import('./subcategories')));
const EditBox =  Loadable(lazy(() => import('../assets/editor')));
const EditProduct =  Loadable(lazy(() => import('./editproduct')));

const productRoutes = [
    {
      path: '/products/all',
      element:<Products/>,
    },
    {
      path: '/edit/product/:id',
      element:<EditProduct/>,
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