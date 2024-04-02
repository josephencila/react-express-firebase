import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContextProvider";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./route/PrivateRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AuthContextProvider />}>
        <Route path="/" element={<SignUpPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
