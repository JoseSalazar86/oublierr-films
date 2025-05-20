import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const useApi = (endpoint, params = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-ES${params}`;
        const res = await fetch(url);
        const json = await res.json();
        setData(json.results || json);
      } catch (err) {
        console.error("Error en la API:", err);
        setError("Hubo un error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint, params]);

  return { data, loading, error };
}

export const fetchBusqueda = async (endpoint, extraParams = "") => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=es-ES${extraParams}`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.results || [];
  } catch (error) {
    console.error("Error en búsqueda:", error);
    return [];
  }
};

export default useApi;
