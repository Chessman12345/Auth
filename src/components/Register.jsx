import { useState } from "react";
import { auth, database, googleProvider } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await set(ref(database, `users/${user.uid}`), {
        email: user.email,
        uid: user.uid,
        photoURL: null,
        password: password,
      });

      navigate(`/user/${user.uid}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await set(ref(database, `users/${user.uid}`), {
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL || null,
      });

      navigate(`/user/${user.uid}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Подтверждение пароля"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
      <button onClick={handleGoogleSignIn}>Войти через Google</button>
    </div>
  );
};

export default Register;
