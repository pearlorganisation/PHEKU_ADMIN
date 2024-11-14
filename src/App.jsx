import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutComponent from "./components/Layout/LayoutComponent";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRoles from "./pages/Roles/CreateRoles/CreateRoles";
import ListRoles from "./pages/Roles/ListRoles/ListRoles";
import EditRole from "./pages/EditRole/EditRole";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path:"/create-roles",
        element: <CreateRoles />
      },
      {
        path:"/roles",
        element: <ListRoles />
      },
      {
        path:"/roles/:id",
        element: <EditRole />
      }
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
