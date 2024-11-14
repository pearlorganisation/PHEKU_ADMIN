import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutComponent from "./components/Layout/LayoutComponent";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRoles from "./pages/Roles/CreateRoles/CreateRoles";
import ListRoles from "./pages/Roles/ListRoles/ListRoles";
import ListBlogs from "./pages/ListBlogs/ListBlogs";
import CreateBlogs from "./pages/CreateBlogs/CreateBlogs";
import CreateBlogCategory from "./pages/CreateBlogCategory/CreateBlogCategory";
import ListBlogCategory from "./pages/ListBlogCategory/ListBlogCategory";

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
        path: "/create-roles",
        element: <CreateRoles />,
      },
      {
        path: "/roles",
        element: <ListRoles />,
      },
      {
        path: "/blogs",
        element: <ListBlogs />,
      },
      {
        path: "/create-blogs",
        element: <CreateBlogs />,
      },
      {
        path: "/create-blogCat",
        element: <CreateBlogCategory />,
      },
      {
        path: "/blogCategories",
        element: <ListBlogCategory />,
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
