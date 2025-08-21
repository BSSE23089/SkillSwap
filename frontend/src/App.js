import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpPage, { action as signupAction } from "./pages/Authentication/SignUpPage";
import LoginPage, { action as loginAction } from "./pages/Authentication/LoginPage";
import RootLayout from "./components/RootLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Discover from "./pages/Discover/Discover";
import PostSkill from "./pages/PostSkill/PostSkill";
import ProfilePage from "./pages/Profile/ProfilePage"; 


function App() {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <RootLayout />,
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "discover", element: <Discover /> },
        { path: "postSkill", element: <PostSkill /> },
        { path: "mySkills", element: <ProfilePage /> }, 
      ],
    },
    { path: "/", element: <SignUpPage />, action: signupAction },
    { path: "/login", element: <LoginPage />, action: loginAction },
  ]);

  return (
   
      <RouterProvider router={router} />
   
  );
}

export default App;
