import SignUpForm from "../components/Authentication/Signup";
import { redirect } from "react-router-dom";

function SignUpPage() {
  return <SignUpForm />;
}

export default SignUpPage;

export async function action({ request }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const bio = formData.get("bio");
  const role = formData.get("role");

  try {
    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, bio, role })
    });

    // Handle server-side validation errors (if any)
    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw new Error("Could not register user");
    }

    // If successful, redirect to login page
    return redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    // You can return some error response or show a message in your form
    return null;
  }
}
