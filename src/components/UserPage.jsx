import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth, database } from "../firebase/config";

import DefaultUserAvatar from "../../image/default user avatar.jpg";

const UserPage = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const snapshot = await get(ref(database, `users/${uid}`));

        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setTimeout(fetchUserData, 2000);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setError("Ошибка загрузки данных!");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Возвращаем на главную
  };

  if (loading) return <h2>Загрузка...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
  if (!userData)
    return <h2 style={{ color: "red" }}>Пользователь не найден!</h2>;

  return (
    <div>
      <h2>Добро пожаловать, {userData.email}</h2>
      <img
        src={userData.photoURL || DefaultUserAvatar}
        width="100"
        height="100"
        style={{ borderRadius: "50%" }}
      />
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Выйти
      </button>
    </div>
  );
};

export default UserPage;
