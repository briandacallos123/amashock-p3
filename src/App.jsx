import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Homelayout from './layout/Homelayout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import DashboardMerchant, { loader as MerchantLoader } from './pages/merchant/dashboard';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { action as actionLogin } from './pages/auth/login';
import { action as registerLogin } from './pages/auth/register';
import { action as productAction } from './pages/merchant/create';

import { loader as HomeLoader } from './layout/Homelayout';

import DashboardLayout from './layout/DashboardLayout';
import Create from './pages/merchant/create';
import HomePage, {loader as HomeMainLoader} from './pages/home';
import ProductView, {loader as ProductLoader} from './section/product/product-view';
import Logout, {loader as LogoutLoader} from './pages/auth/logout';
import Checkout from './pages/checkout/Checkout';
import Address, {action as AddressAction} from './pages/checkout/Address';
import Payment from './pages/checkout/Payment';
import CDashboardLayout from './layout/CDashboardLayout';
import Dashboard from './pages/customer/Dashboard';
import Orders, {loader as CustomerLoader} from './pages/customer/Orders';
import Profile, {loader as ProfileCustomerL, action as ProfileCustomerA} from './pages/customer/Profile';
import MerchantProfile, {loader as MerchantLoaderProfile, action as MerchantActionUpdate} from './pages/merchant/Profile';
import MerchantOrders, {loader as MerchantOrderLoader} from './pages/merchant/Orders';
import ViewOrder,{loader as OrderViewLoader } from './pages/customer/ViewOrder';
import DataContext from './context/data';

const initialOptions = {
  "client-id": "Ade90ExOQRf0oSF1PDxbAmrh7x3t9KsKyRv2aH-p0RD5sXM6EJXtGMwICl567C5sREE6uJgAN5TqyGFH",
  currency: "PHP",
  intent: "capture",
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout/>,
    loader:HomeLoader,
    children:[
      {
        index:true,
        element:<HomePage/>,
        loader:HomeMainLoader
      },
      {
        path:"login",
        element:<Login/>,
        action:actionLogin
      },
      {
        path:"register",
        element:<Register/>,
        action:registerLogin
      },
      {
        path:"logout",
        element:<Logout/>,
        loader:LogoutLoader
      },
      {
        path:"product/view/:id",
        element:<ProductView/>,
        loader:ProductLoader
      },
      {
        path:"product/checkout",
        element:<Checkout/>,
      },
      {
        path:"product/checkout/address",
        element:<Address/>,
        action:AddressAction
      },
      {
        path:"product/checkout/payment",
        element:(
          <PayPalScriptProvider options={initialOptions}>
              <Payment/>
            </PayPalScriptProvider>
        ),
        action:AddressAction
      },
      {
        path:"/customer",
        element:<CDashboardLayout/>,
        children:[
          {
            index:true,
            element:<Dashboard/>,
          },
          {
            path:"orders",
            element:<Orders/>,
            loader:CustomerLoader
          },
          {
            path:"view/:id",
            element:<ViewOrder/>,
            loader:OrderViewLoader
          },
          {
            path:"profile",
            element:<Profile/>,
            loader:ProfileCustomerL,
            action:ProfileCustomerA
          }

        ]
      },
      {
        path:"merchant",
        element:<DashboardLayout/>,
        children:[
          {
            index:true,
            element:<DashboardMerchant/>,
            loader:MerchantLoader,

          },
          {
            path:"orders",
            element:<MerchantOrders/>,
            loader:MerchantOrderLoader
          },
          {
            path:"profile",
            element:<MerchantProfile/>,
            loader:MerchantLoaderProfile,
            action:MerchantActionUpdate
          },
          {
            path:"view/:id",
            element:<ViewOrder/>,
            loader:OrderViewLoader
          },
          {
            path:"create-product",
            element:<Create/>,
            action:productAction
          },
         
        ]
      },
    ]
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

const App = () => {
  return (
    <DataContext>
      <RouterProvider router={router} />
    </DataContext>
  )
}

export default App