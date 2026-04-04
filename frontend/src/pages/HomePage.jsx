import { useEffect, useState } from "react";

function HomePage() {
  const [message, setMessage] = useState("Loading backend message...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/test")
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