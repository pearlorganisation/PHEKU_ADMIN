import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutComponent from "./components/Layout/LayoutComponent";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRoles from "./pages/Roles/CreateRoles/CreateRoles";
import ListRoles from "./pages/Roles/ListRoles/ListRoles";
import EditRole from "./pages/EditRole/EditRole";
import Login from "./pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <LayoutComponent />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },    
      {
        path: "roles",  
        element: <ListRoles />,
      },
      {
        path: "roles/:id",  
        element: <EditRole />,
      },
      {
        path: "create-roles",
        element: <CreateRoles />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
