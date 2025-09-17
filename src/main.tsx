import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './layout/Main.tsx'
import HomePage from './pages/Home.tsx'
import { store } from './store.ts'
import { Provider } from 'react-redux'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Protect from './pages/Protect.tsx'
import OrdersList from './components/OrdersList.tsx'
import CreateOrder from './pages/CreateOrder.tsx'
import UpdateOrder from './pages/UpdateOrder.tsx'
import History from './components/History.tsx'
import MyOrdersPage from './pages/OrderHistory.tsx'
import MyMatchingsPage from './pages/UserMatchHistory.tsx'
import AllMatchings from './pages/admin/matching.tsx'
import AddProduct from './pages/admin/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path:"/order",
        element:  <Protect> < OrdersList/> </Protect>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path:"/admin",
        element: <Protect adminOnly={true}> <AddProduct/></Protect> 
      },
      {
        path: "/order/create",
        element: <Protect><CreateOrder/></Protect>
      },
      {
        path: "/order/:orderId/edit",
        element: <Protect><UpdateOrder/></Protect>
      },
      {
        path: "/:userId/history",
        element: <Protect><History/></Protect>
      },
      { 
        path: "/my-orders", 
        element: <Protect><MyOrdersPage /></Protect> 
      },
      { 
        path: "/my-matchings", 
        element: <Protect><MyMatchingsPage /></Protect> 
      },
      {
        path:"/admin/matching",
        element: <Protect adminOnly={true}> <AllMatchings/></Protect> 
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
