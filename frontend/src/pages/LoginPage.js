import LoginForm from "../components/Authentication/Login";
import FormPageBackground from "../components/FormPageBackground";
import { redirect } from "react-router-dom";

function LoginPage() {
  return (
    <FormPageBackground>
      <LoginForm />
    </FormPageBackground>
  );
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
      const data = await response.json();
      return { error: data?.error || "Login failed. Please check your credentials." };
    }

    if (!response.ok) {
      return { error: "Could not authenticate user. Please try again." };
    }

    // Return a success message instead of redirecting immediately
    return { success: "Login successful!" };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Login failed. Please try again later." };
  }
}
