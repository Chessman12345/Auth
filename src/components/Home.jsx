import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Добро пожаловать</h1>
      <Link to="/register">
        <button>Зарегистрироваться</button>
      </Link>
      <Link to="/signin">
        <button>Войти</button>
      </Link>
    </div>
  );
};

export default Home;
