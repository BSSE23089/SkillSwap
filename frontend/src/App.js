import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import {action as signupAction} from './pages/SignUpPage' ;
import {action as loginAction} from './pages/LoginPage';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignUpPage/>,
      action: signupAction
    },
    {
      path:'login',
      element: <LoginPage/>,
      action:loginAction
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
