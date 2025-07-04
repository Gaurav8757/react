import { createBrowserRouter, RouterProvider } from "react-router";
import { Suspense } from "react";

import ErrorPage from "./components/errorspage/ErrorPage.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
// own loader to fetch data
import UserDetails, { Loader as UserLoader } from "./components/usersdetail/UserDetails.jsx";
// get/post data from loader and action
import Loader, { Action } from "./components/loaderdata/Loader.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />,    // Sidebar has div id = details inside added <Outlet/> to render children path and its elements as side div changeable like dashboard.
      errorElement: <ErrorPage />,
      loader: Loader,   // use as functions not components GET DATA
      action: Action,  // use as functions not components POST DATA
      children: [
        {
          path: "users/:contactId",
          element: <UserDetails />,
          loader: UserLoader
        },
      ],
    },
    {
      path: "/app",
      element: <div>Hi! User</div>,
    },
  ]);
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-2xl text-blue-700 font-bold">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;


