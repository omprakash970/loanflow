import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    navigate("/");
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login as
          </h2>

          {["ADMIN", "LENDER", "BORROWER", "ANALYST"].map((role) => (
              <button
                  key={role}
                  onClick={() => handleLogin(role)}
                  className="w-full mb-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {role}
              </button>
          ))}
        </div>
      </div>
  );
}