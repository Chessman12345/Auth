import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { ref, update } from "firebase/database";
import { auth, database } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Письмо для сброса пароля отправлено! Проверьте почту.");

      update(ref(database, users), {
        [`${email.replace(".", "_")}/passwordResetRequested`]: true,
      });

      setTimeout(() => navigate("/signin"), 5000);
    } catch (error) {
      console.log("Ошибка: " + error.message);
    }
  };

  return (
    <div>
      <h2>Сброс пароля</h2>
      <input
        type="email"
        placeholder="Введите email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Отправить письмо</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
