import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/layout";
import Home from "../pages/home";
import RecipeDetail from "../pages/details";
import { SavedRecipesGrid } from "../components/saved-recipes-grid";
import CategoriesPage from "../pages/categories";
import CategoryMealsPage from "../pages/category-meals-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/recipe/:id", element: <RecipeDetail /> },
      { path: "/favorites", element: <SavedRecipesGrid /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/category/:categoryName", element: <CategoryMealsPage /> },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
