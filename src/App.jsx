import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutComponent from "./components/Layout/LayoutComponent";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRoles from "./pages/Roles/CreateRoles/CreateRoles";
import ListRoles from "./pages/Roles/ListRoles/ListRoles";
import EditRole from "./pages/EditRole/EditRole";
import Login from "./pages/Login/Login";
import ListBlogs from "./pages/ListBlogs/ListBlogs";
import CreateBlogs from "./pages/CreateBlogs/CreateBlogs";
import CreateBlogCategory from "./pages/CreateBlogCategory/CreateBlogCategory";
import ListBlogCategory from "./pages/ListBlogCategory/ListBlogCategory";
import EditBlog from "./pages/EditBlog/EditBlog";
import CourseSpecialization from "./pages/Course/CourseSpecialization";
import CourseLevel from "./pages/Course/CourseLevel";
import CourseSpecializationList from "./pages/Course/CourseSpecializationList";
import EditCourseSpecialization from "./pages/Course/EditCourseSpecialization";
import ViewBlog from "./pages/ViewBlogs/ViewBlogs";
import EditBlogCategory from "./pages/EditBlogCategory/EditBlogCategory";
import { useSelector } from "react-redux";
import CourseLevelList from "./pages/Course/CourseLevelList";
import AddCourse from "./pages/Course/AddCourse/AddCourse";
import ListUniversities from "./pages/Universities/ListUniversities";
import CreateUniversity from "./pages/Universities/CreateUniversity";
import ListAllCourses from "./pages/Course/ListAllCourses";

const AppRoutes =()=>{
  const { isAdminLoggedIn } = useSelector((state)=>state.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAdminLoggedIn?<LayoutComponent /> : <Login />,
      children:isAdminLoggedIn ? [
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

        {
          path: "blogs",
          element: <ListBlogs />,
        },
        {
          path: "viewBlog/:id",
          element: <ViewBlog />,
        },
        {
          path: "create-blogs",
          element: <CreateBlogs />,
        },
        {
          path: "create-blogCat",
          element: <CreateBlogCategory />,
        },
        {
          path: "blogCategories",
          element: <ListBlogCategory />,
        },
        {
          path: "blogCategories/:id",
          element: <EditBlogCategory />,
        },
        {
          path: "editblog/:slug",
          element: <EditBlog />,
        },
        {
          path: "specialization",
          element: <CourseSpecialization />,
        },
        {
          path: "course-level",
          element: <CourseLevel />,
        },
        {
          path: "specialization-list",
          element: <CourseSpecializationList />,
        },
        {
          path: "specialization-list/:id",
          element: <EditCourseSpecialization />,
        },
        {
          path:"course-level-list",
          element:<CourseLevelList />
        },
        { 
          path:"add-course",
          element: <AddCourse />
        },
        {
          path:"get-all-universities",
          element:<ListUniversities />
        },
        {
          path:"create-university",
          element:<CreateUniversity />
        },
        {
          path:"list-all-courses",
          element:<ListAllCourses />
        }
      ]:[],
    },
    
  ]);

  return <RouterProvider router={router} />
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/dashboard",
//     element: <LayoutComponent />,
//     children: [
//       {
//         index: true,
//         element: <Dashboard />,
//       },
//       {
//         path: "roles",
//         element: <ListRoles />,
//       },
//       {
//         path: "roles/:id",
//         element: <EditRole />,
//       },
//       {
//         path: "create-roles",
//         element: <CreateRoles />,
//       },

//       {
//         path: "blogs",
//         element: <ListBlogs />,
//       },
//       {
//         path: "viewBlog/:id",
//         element: <ViewBlog />,
//       },
//       {
//         path: "create-blogs",
//         element: <CreateBlogs />,
//       },
//       {
//         path: "create-blogCat",
//         element: <CreateBlogCategory />,
//       },
//       {
//         path: "blogCategories",
//         element: <ListBlogCategory />,
//       },
//       {
//         path: "blogCategories/:id",
//         element: <EditBlogCategory />,
//       },
//       {
//         path: "editblog/:slug",
//         element: <EditBlog />,
//       },
//       {
//         path: "specialization",
//         element: <CourseSpecialization />,
//       },
//       {
//         path: "course-level",
//         element: <CourseLevel />,
//       },
//       {
//         path: "specialization-list",
//         element: <CourseSpecializationList />,
//       },
//       {
//         path: "specialization-list/:id",
//         element: <EditCourseSpecialization />,
//       },
//     ],
//   },
// ]);

function App() {
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <AppRoutes />
    </>
  );
}

export default App;
