import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContextProvider";

import RootLayout from "./RootLayout";

import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

import PrivateRoute from "./route/PrivateRoute";
import PublicRoute from "./route/PublicRoute";
import VerificationPage from "./pages/VerificationPage";
import { PasswordValidationProvider } from "./context/PasswordValidationContextProvider";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AuthContextProvider />}>
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />

          <Route element={<PublicRoute />}>
            
            <Route element={<PasswordValidationProvider />}>
              <Route path="/sign-up"  element={<SignUpPage />} />
            </Route>

            <Route path="/sign-in" element={<SignInPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/verify" element={<VerificationPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
