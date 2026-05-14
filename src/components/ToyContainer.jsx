import React from "react";
import ToyCard from "./ToyCard";
import { useState, useEffect } from "react";

function ToyContainer({ toys, handleDelete }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

export default ToyContainer;
