import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

const URL = "http://localhost:4000/people/";

const Main = (props) => {
  const [people, setPeople] = useState(null);

  // Hunter extra
  const [ person, setPerson ] = useState(undefined)

  const findPerson = (id) => {
    setPerson(people.find((p) => {
      return person._id === id
    }))
  }

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // MAKING POST REQUEST
    const response = await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    const createdPerson = await response.json();
    setPeople((prev) => [...prev, createdPerson]);
  };

  const updatePeople = async (person, id) => {
    // make post request to create people
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
    getPeople()
  }

  const deletePeople = async (id) => {
    // make post to create people
    await fetch(URL + id, {
      method: "delete",
    });
    // update list of people
    getPeople();
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={
        <Index 
          people={people} 
          createPeople={createPeople}
          findPerson={findPerson}
         />} />
        <Route 
        path="/people/:id" 
        element={
          <Show
            people={people}
            person={person}
            updatePeople={updatePeople}
            deletePeople={deletePeople}
           />} 
          />
      </Routes>
    </main>
  );
};

export default Main;
