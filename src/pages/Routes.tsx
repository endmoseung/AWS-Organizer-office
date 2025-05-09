import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ROUTE_PATH } from "../constants/route";
import { ErrorPage } from "./ErrorPage";
import { HomePage } from "./HomePage";
import { ImageEditorPage } from "./ImageEditorPage";
import { ManagementPage } from "./ManagementPage";
import { PageLayout } from "./PageLayout";
import { PresentFormPage } from "./PresentFormPage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <PageLayout>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: ROUTE_PATH.MANAGEMENT,
        element: <ManagementPage />,
      },
      {
        path: ROUTE_PATH.PRESENT_FORM,
        element: <PresentFormPage />,
      },
      {
        path: ROUTE_PATH.IMAGE_EDITOR,
        element: <ImageEditorPage />,
      },
      {
        path: ROUTE_PATH.HOME,
        element: <HomePage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
