import React, { useState } from "react";
import "./TreeForm.css";

function TreeForm({ setTrees }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTree = { name, description, img };

    fetch("https://nodejs-mongodb-example-5.onrender.com/trees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTree),
    })
      .then((response) => response.json())
      .then((data) => {
        setTrees((prevTrees) => [...prevTrees, data]);
        setName("");
        setDescription("");
        setImg("");
      })
      .catch((error) => console.error("Error adding tree:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tree Shop</h2>
      <input
        type="text"
        placeholder="Tree Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Img"
        value={img}
        onChange={(e) => setImg(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TreeForm;