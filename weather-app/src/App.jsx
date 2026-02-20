import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    setWeather(null);
    setLoading(true);

    try {
      const res = await fetch(
        `https://wttr.in/${city}?format=j1`
      );

      if (!res.ok) {
        setError("Could not fetch weather");
        setLoading(false);
        return;
      }

      const data = await res.json();

      const current = data.current_condition[0];
      setWeather({
        temp: current.temp_C,
        humidity: current.humidity,
        condition: current.weatherDesc[0].value,
      });
    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Weather App (wttr.in)</h2>

        <div style={styles.row}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
          />
          <button onClick={getWeather} style={styles.button}>
            Search
          </button>
        </div>

        {loading && <p style={styles.loader}>Loading...</p>}

        {error && <p style={styles.error}>{error}</p>}

        {weather && (
          <div style={styles.result}>
            <h3>{city}</h3>
            <p>🌡 Temperature: {weather.temp}°C</p>
            <p>💧 Humidity: {weather.humidity}%</p>
            <p>☁ Condition: {weather.condition}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4ff",
    fontFamily: "Arial",
  },
  card: {
    width: "350px",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
  loader: {
    marginTop: "10px",
    color: "#4f46e5",
    fontWeight: "bold",
  },
  error: {
    marginTop: "10px",
    color: "red",
  },
  result: {
    marginTop: "15px",
    background: "#eef2ff",
    padding: "10px",
    borderRadius: "8px",
  },
};

export default App;