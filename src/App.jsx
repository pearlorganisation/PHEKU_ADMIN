import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutComponent from "./components/Layout/LayoutComponent";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRoles from "./pages/Roles/CreateRoles/CreateRoles";

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
        path:"create-roles",
        element: <CreateRoles />
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
