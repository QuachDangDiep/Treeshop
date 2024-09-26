import React, { useState } from "react";
import EditTree from "./EditTree";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Import các icon sửa và xóa
import "./TreeList.css";

function TreeList({ trees, setTrees }) {
  const [editingTreeId, setEditingTreeId] = useState(null);

  const handleDelete = (id) => {
    fetch(`https://nodejs-mongodb-example-5.onrender.com/trees/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTrees(trees.filter((tree) => tree.id !== id));
      })
      .catch((error) => console.error("Error deleting tree:", error));
  };

  const handleEdit = (id) => {
    setEditingTreeId(id);
  };

  return (
    <div>
      {editingTreeId ? (
        <EditTree
          treeId={editingTreeId}
          setEditing={setEditingTreeId}
          setTrees={setTrees}
        />
      ) : (
        <>
          <h2>Menu</h2>
          <ul>
            {trees.map((tree) => (
              <li key={tree.id}>
                <h3>{tree.name}</h3>
                <p>{tree.description}</p>
                <img src={tree.img} alt={tree.name} width="100" />
                <button onClick={() => handleEdit(tree.id)}>
                  <FontAwesomeIcon icon={faEdit} /> {/* Icon sửa */}
                </button>
                <button onClick={() => handleDelete(tree.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} /> {/* Icon xóa */}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TreeList;
