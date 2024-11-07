import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LayoutComponent from "./components/Layout/LayoutComponent"
import HomePage from "./pages/Homepage/HomePage"

 



const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,

    children:[
      {
        index: true,
        element: <HomePage />
      }
    ]
  }
])


function App() {

  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App
