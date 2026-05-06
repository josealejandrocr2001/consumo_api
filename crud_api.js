import React, { useState, useEffect } from "react";

const App = () => {
  const [datos, setDatos] = useState({});
  const url = "https://api.ingejei.com/maurinho";

  //READ
  const getDatos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setDatos(data);
  };

  useEffect(() => {
    getDatos();
  }, []);

  //CREATE
  const createDato = async (nuevoNombre) => {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nuevoNombre })
    });
    getDatos();
  };

  //UPDATE
  const updateDato = async (id, nombreActualizado) => {
    await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreActualizado })
    });
    getDatos();
  };

  //DELETE
  const deleteDato = async (id) => {
    await fetch(`${url}/${id}`, {
      method: 'DELETE'
    });
    getDatos();
  };

  return (
    <div>
      <h1>CRUD Maurinho</h1>
      <button onClick={() => createDato("Nuevo Registro")}>Agregar</button>
      
      <ul>
        {Object.values(datos).map((item) => (
          <li key={item.id}>
            {item.nombre}
            <button onClick={() => updateDato(item.id, "Editado")}>Editar</button>
            <button onClick={() => deleteDato(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;