import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/home";
import RecipeDetail from "../pages/details";
import { SavedRecipesGrid } from "../components/saved-recipes-grid";
import CategoriesPage from "../pages/categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/recipe/:id", element: <RecipeDetail /> },
      { path: "/favorites", element: <SavedRecipesGrid /> },
      { path: "/categories", element: <CategoriesPage /> },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
