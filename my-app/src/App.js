import React, { useState, useEffect } from "react";
import "./App.css"
import TreeList from "./componets/TreeList";
import TreeForm from "./componets/TreeForm";

function App() {
  const [trees, setTrees] = useState([]);

  // Fetch trees from backend
  useEffect(() => {
    fetch("https://nodejs-mongodb-example-5.onrender.com/trees")
      .then((response) => response.json())
      .then((data) => setTrees(data))
      .catch((error) => console.error("Error fetching trees:", error));
  }, []);

  return (
    <div className="App">
      <h1>Tree Shop</h1>
      <TreeForm setTrees={setTrees} />
      <TreeList trees={trees} setTrees={setTrees} />
    </div>
  );
}

export default App;
