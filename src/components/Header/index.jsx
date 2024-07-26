import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.contenedor}>
      <div className={styles.cajaImagen}>
        <Link to="/">
          <img
            className={styles.logo}
            src="https://static.vecteezy.com/system/resources/previews/024/295/648/non_2x/weather-graphic-clipart-design-free-png.png"
            alt="Logo"
          />
        </Link>
      </div>
      <div className={styles.texto}>
        <h1>Aplicación del clima</h1>
      </div>
    </header>
  );
};

export default Header;
