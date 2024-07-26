import { useRef } from "react";
import styles from "./Home.module.css";

const Home = (props) => {
  const inputRef = useRef(null);
  const { ciudad } = props;

  return (
    <section className={styles.container}>
      <label>Ingrese el nombre de la cuidad</label>
      <input ref={inputRef} className={styles.input} />
      <button className={styles.boton} onClick={() => ciudad(inputRef.current.value)}>
        Enviar
      </button>
    </section>
  );
};

export default Home;
