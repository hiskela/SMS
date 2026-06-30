import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
function Login() {
  const navigate = useNavigate();
const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setServerError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!form.username.trim())
      newErrors.username = "Username is required";

    if (!form.password)
      newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        form
      );

     
login(res.data.user);
  localStorage.setItem("token", res.data.token);

navigate("/dashboard");
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
        "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black/35 to-indigo-100 flex justify-center items-center p-4">

      <div className=" space-y-5 bg-gradient-to-b from-white to-indigo-100 shadow-lg border rounded-2xl w-full max-w-md p-8 ">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          School Management System
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to continue
        </p>

        {serverError && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {serverError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 outline-none ${
                errors.username
                  ? "border-red-500"
                  : "focus:border-blue-600"
              }`}
            />

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>

          <div>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 pr-12 outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "focus:border-blue-600"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={20}/>
                ) : (
                  <Eye size={20}/>
                )}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:bg-gray-400 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <ClipLoader
                  size={18}
                  color="#fff"
                />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;