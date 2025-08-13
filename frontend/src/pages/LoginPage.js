import LoginForm from "../components/Authentication/Login";
import { redirect } from "react-router-dom";

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    // Handle server-side validation errors
    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw new Error("Could not authenticate user");
    }

    // Optionally, get the token from the response
    const data = await response.json();
    console.log("Login successful, token:", data.token);
    // You can store token in localStorage or context here if needed
    // localStorage.setItem("token", data.token);

    // Redirect to dashboard on successful login
    return redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    // Return null or handle error display in your form
    return null;
  }
}
