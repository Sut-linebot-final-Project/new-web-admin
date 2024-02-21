// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import ResponsiveDrawer from './components/drawer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
// import Home from './page/Home'

import Intent from './page/Intent'
import Layout from './layout/Layout'
import Training from './page/Training'
import Detail from './page/Detail'
import Login from './page/Login'
import User from './page/user/User'
import React from 'react'
import Home from './page/home/Home'
import SignUp from './page/SignUp/SignUpForm'

function App() {
  const [token, setToken] = React.useState<String>("");



  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);

    }
  }, []);



  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },


    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/intent",
          element: <Intent />,
        },
        {
          path: "/Detail/:id",
          element: <Detail />
        },
        {
          path: "/newintent",
          element: <Detail />
        },
        {
          path: "/Training",
          element: <Training />
        },
        {
          path: "/User",
          element: <User />
        },

      ],
    },
  ]);
  if (!token) {
    // window.location.replace('/login');
    return <Login />;
  } else {
    return (
      <RouterProvider router={router} />
      // <>
      //   <BrowserRouter>
      //     <Routes>
      //       <Route path='/' element={<Login />}></Route>
      //     </Routes>
      //   </BrowserRouter>


      //   <BrowserRouter>
      //     <Layout>
      //       <Routes>
      //         <Route path='/' element={<Dashboard />}></Route>
      //         <Route path='/Dashboard' element={<Dashboard />}></Route>
      //         <Route path='/Intent' element={<Intent />}></Route>
      //         <Route path='/Training' element={<Training />}></Route>
      //         <Route path='/Detail/:id' element={<Detail />}></Route>
      //       </Routes>
      //     </Layout>
      //   </BrowserRouter>


      // </>


    )
  }
}

export default App
