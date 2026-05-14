import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleDelete(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedToys = toys.filter((toy) => toy.id !== id);
        setToys(updatedToys);
      });
  }
  function handleLike(id) {
    const toyToLike = toys.find((toy) => toy.id === id);
    const updatedToy = { ...toyToLike, likes: toyToLike.likes + 1 };

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedToy),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedToys = toys.map((toy) =>
          toy.id === id ? data : toy
        );
        setToys(updatedToys);
      });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm toys={toys} setToys={setToys} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDelete={handleDelete} handleLike={handleLike} />
    </>
  );
}

export default App;
