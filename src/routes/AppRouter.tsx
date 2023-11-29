import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import PokemonPage from "../pages/Pokemon"
import Error404 from "../pages/404"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
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
