import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const Show = (props) => {
  const params = useParams()
  // invoke useNavigate() by assigning to variable
  const navigate = useNavigate()
  const id = params.id;
  const people = props.people;

  const person = people.find((person) => {
    return person._id === id
  });

  const [ updateForm, setUpdateForm] = useState({
    name: person.name,
    title: person.title,
    image: person.image
  })

  const handleChange = (event) => {
    setUpdateForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.updatePeople(updateForm, params.id)
  }
  
  const handleDelete = () => {
    props.deletePeople(params.id);
    navigate("/")
  }

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt="person's name" />
      <button onClick={handleDelete} id='delete-person'> DELETE PERSON </button>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          value={updateForm.name}
          name='name'
          placeholder='Name'
          onChange={handleChange}
        />
        <input 
          type='text'
          value={updateForm.image}
          name='image'
          placeholder='Image URL'
          onChange={handleChange}
        />
        <input 
          type='text'
          value={updateForm.title}
          name='title'
          placeholder='Title'
          onChange={handleChange}
        />
        <input type='Submit' value="Update Person" />
      </form>
    </div>

  )
}

export default Show