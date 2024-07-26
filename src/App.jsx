import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
const key = "737a2a02372e2430345c2fd6515fc51b";

const geocodingAPI = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los datos de la API");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error al obtener datos: ", err.message);
  }
};

const currentAPI = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) console.log("Error al obtener datos de la API");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error al obtener datos: ", err.message);
  }
};

function App() {
  const [country, setCountry] = useState("");
  const [coordenadas, setCoordenadas] = useState(null);
  const [idCiudad, setIdCiudad] = useState("");
  const [widgetKey, setWidgetKey] = useState(0);

  const añadirCiudad = (ciudad) => {
    setCountry(ciudad);
  };
  const añadirCoordenadas = (lat, lon) => {
    setCoordenadas({ lat, lon });
  };

  useEffect(() => {
    if (idCiudad) {
      window.myWidgetParam = [
        {
          id: 11,
          cityid: idCiudad,
          appid: "737a2a02372e2430345c2fd6515fc51b",
          units: "metric",
          containerid: "openweathermap-widget-11",
        },
      ];

      const script = document.createElement("script");
      script.async = true;
      script.charset = "utf-8";
      script.src =
        "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
      document.body.appendChild(script);

      setWidgetKey((prevKey) => prevKey + 1);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [idCiudad]);

  useEffect(() => {
    if (coordenadas) {
      const latitud = coordenadas.lat;
      const longitud = coordenadas.lon;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${key}&lang=sp, es`;
      currentAPI(url).then((datos) => {
        setIdCiudad(datos.id);
      });
    }
  }, [coordenadas]);

  useEffect(() => {
    if (country) {
      const limit = "5";
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=${limit}&appid=${key}`;

      geocodingAPI(url).then((data) => {
        const ciudad = data.filter((datos) => datos.local_names);
        const { lat, lon } = ciudad[0];

        añadirCoordenadas(lat, lon);
      });
    }
  }, [country]);

  return (
    <>
      <Header />
      <Home ciudad={añadirCiudad} />
      <div className="widget" key={widgetKey} id="openweathermap-widget-11"></div>
    </>
  );
}

export default App;
