import { useEffect, useState } from "react";

function HomePage() {
  const [message, setMessage] = useState("Loading backend message...");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/login`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage("Failed to connect to backend");
      });
  }, []);

  return (
    <div>
      <h1>Expense Classification App</h1>
      <p>{message}</p>
    </div>
  );
}

export default HomePage;