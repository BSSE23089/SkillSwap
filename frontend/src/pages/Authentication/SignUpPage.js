import SignUpForm from "../../components/Authentication/Signup";
import FormPageBackground from "../../components/Authentication/FormPageBackground";
import { redirect } from "react-router-dom";
import API_URL from "../../config/api";
function SignUpPage() {
  return (
    <FormPageBackground>
      <SignUpForm />
    </FormPageBackground>
  );
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
    const response = await fetch(`${API_URL}/api/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, bio, role })
    });

    // Handle server-side validation errors (if any)
    if (response.status === 422) {
      const data = await response.json();
      return { error: data?.error || "Signup failed. Please check your details." };
    }

    if (!response.ok) {
      return { error: "Could not register user. Please try again." };
    }

    // If successful, redirect to login page
    return redirect("/login?signup=success");
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "Signup failed. Please try again later." };
  }
}
