import LoginForm from "../../components/Authentication/Login";
import FormPageBackground from "../../components/Authentication/FormPageBackground";

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
  credentials: "include", // must match backend
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
})
    const data = await response.json();
    console.log("🔥 Backend response:", data);

    if (!response.ok) {
      return { error: data?.error || "Could not authenticate user. Please try again." };
    }

    // ✅ No need to store token in localStorage (cookie handles it)
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Login failed. Please try again later." };
  }
}
