import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
const Login = () => {

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // ✅ STRICT CHECK
            const adminEmails = [
                "pondaraudaykumar1970@gmail.com"
            ];

            if (
                !user.email.endsWith("@nist.edu") &&
                !adminEmails.includes(user.email)
            ) {
                await signOut(auth);
                alert("Only NIST students or authorized admins allowed ❌");
                return;
            }

            // ✅ SAVE USER
            localStorage.setItem("user", JSON.stringify(user));

            // ✅ REDIRECT
            window.location.href = "/";

        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    return (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

    {/* CARD */}
    <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          🍽️ Mess System
        </h1>
        <p className="text-gray-400 text-sm">
          Smart food feedback platform
        </p>
      </div>

      {/* HERO STRIP */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl mb-6 text-center shadow-md">
        <p className="text-white font-medium">
          Welcome Back 👋
        </p>
        <p className="text-xs text-white/80">
          Login with your college account
        </p>
      </div>

      {/* LOGIN BUTTON */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 bg-gray-800 border border-gray-700 text-white py-3 rounded-lg hover:bg-gray-700 transition shadow-md"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
        />
        Sign in with Google
      </button>

      {/* FOOTER */}
      <p className="text-xs text-gray-500 text-center mt-6">
        Only @nist.edu accounts allowed
      </p>

    </div>
  </div>
);
};

export default Login;