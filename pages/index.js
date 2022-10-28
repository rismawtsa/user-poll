import React, { useState } from "react";
const config = [
  {
    name: "Frontend Development",
    id: "frontend_development",
  },
  {
    name: "Software Development",
    id: "software_development",
  },
  {
    name: "Cloud Services",
    id: "cloud_services",
  },
  {
    name: "Machine Learning",
    id: "machine_learning",
  },
];

const handleClick = async (id) => {
  try {
    const response = await fetch("/api/createVote");
    const result = await response.json();
    console.log({ result });
  } catch (error) {
    console.log({ error });
  }
};

function HomePage() {
  return (
    <>
      <h2>The New Stack</h2>
      <div>
        {config.map((item) => {
          const { name, id } = item;

          return (
            <button
              key={id}
              style={{ marginRight: "1rem" }}
              onClick={() => handleClick(id)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
