import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import PokemonPage from "../pages/Pokemon"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>Error 404 - Not Found</h1>,
  },
  {
    path: "/pokemon",
    element: <PokemonPage />,
    children: [
      {
        path: ":id",
        element: <PokemonPage />,
      },
    ],
  }
]);

function AppRoutes() {
  return <RouterProvider router={routes} />;
}

export default AppRoutes;
