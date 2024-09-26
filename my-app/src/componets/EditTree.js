import React, { useState, useEffect } from "react";
import "./EditTree.css";

function EditTree({ treeId, setEditing, setTrees }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  // Lấy dữ liệu cây hiện tại khi component được mount
  useEffect(() => {
    fetch(`https://nodejs-mongodb-example-5.onrender.com/trees/${treeId}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setImg(data.img);
      })
      .catch((error) => console.error("Error fetching tree:", error));
  }, [treeId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTree = { name, description, img };

    fetch(`https://nodejs-mongodb-example-5.onrender.com/trees/${treeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTree),
    })
      .then(() => {
        setTrees((prevTrees) =>
          prevTrees.map((tree) =>
            tree.id === treeId ? { ...tree, ...updatedTree } : tree
          )
        );
        setEditing(false); // Đóng form sửa sau khi cập nhật thành công
      })
      .catch((error) => console.error("Error updating tree:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="edit-tree-form">
      <h2>Edit Tree</h2>
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
        placeholder="Image URL"
        value={img}
        onChange={(e) => setImg(e.target.value)}
        required
      />
      <button type="submit">Update Tree</button>
      <button type="button" onClick={() => setEditing(false)}>
        Cancel
      </button>
    </form>
  );
}

export default EditTree;

