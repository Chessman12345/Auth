import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(`/user/${auth.currentUser.uid}`);
    } catch (error) {
      setError("Ошибка входа: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(`/user/${auth.currentUser.uid}`);
    } catch (error) {
      setError("Ошибка входа через Google: " + error.message);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <input
        type="email"
        placeholder="Введите email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Войти</button>
      <button onClick={handleGoogleSignIn}>Войти через Google</button>

      <Link
        to="/reset-password"
        style={{
          display: "block",
          marginTop: "10px",
          color: "blue",
          textDecoration: "underline",
        }}
      >
        Забыли пароль?
      </Link>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignIn;
