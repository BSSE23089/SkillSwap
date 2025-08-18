// LoginPage.jsx
import LoginForm from "../../components/Authentication/Login";
import FormPageBackground from "../../components/Authentication/FormPageBackground";
import API_URL from "../../config/api";

// 👇 import store + actions
import store from "../../store/store"; 
import { loginSuccess } from "../../store/authSlice";
import { setUserProfile } from "../../store/userSlice";

function LoginPage() {
  return (
    <FormPageBackground>
      <LoginForm />
    </FormPageBackground>
  );
}

export default LoginPage;

// React Router action (executed on form POST)
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // 🔹 Login request
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      credentials: "include", // important for cookies
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("🔥 Backend response:", data);

    if (!response.ok) {
      return { error: data?.error || "Could not authenticate user." };
    }

    // 🔹 Fetch profile (cookie automatically included)
    const profileRes = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!profileRes.ok) {
      const text = await profileRes.text();
      throw new Error(`Profile fetch failed: ${profileRes.status} - ${text}`);
    }

    const profileData = await profileRes.json();
    console.log("🔥 Profile data:", profileData);

    // ✅ Dispatch to Redux
    store.dispatch(
      loginSuccess({ 
        user: profileData.user, 
        token: null // cookie is stored in browser, no need to keep token
      })
    );

    store.dispatch(setUserProfile(profileData.user));

    // ✅ Return to useActionData (for navigation/messages)
    return {
      success: true,
      user: profileData.user,
      message: "Login successful!",
    };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Login failed. Please try again later." };
  }
}
