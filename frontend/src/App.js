import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpPage, { action as signupAction } from "./pages/SignUpPage";
import LoginPage, { action as loginAction } from "./pages/LoginPage";
import RootLayout from "./components/RootLayout";
import DashboardHome from "./pages/DashboardHome";
import Discover from "./pages/Discover";
import PostSkill from "./pages/PostSkill";

function App() {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <RootLayout />,
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "discover", element: <Discover /> },
        { path: "postSkill", element: <PostSkill /> },
      ],
    },
    { path: "/", element: <SignUpPage />, action: signupAction },
    { path: "/login", element: <LoginPage />, action: loginAction },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
