import {useState} from 'react'
import { Link } from "react-router-dom"

const Index = (props) => {

  const [newForm, setNewForm] = useState({
    name: '',
    image: '',
    title: ''
  })

  const handleChange = (event) => {
    setNewForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.createPeople(newForm)
  }


  const loaded = () => {
    return props.people.map((person) => {
      return (
        <div key={person._id} className="person">
          <Link to={`/people/${person._id}`}>
            <h1>{person.name}</h1>
          </Link>
          <img src={person.image} alt={person.name} />
          <h3>{person.title}</h3>
        </div>
      )
    })
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }

  return (
    <section>
      <h2>Create a New Person</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          value={newForm.name}
          name='name'
          placeholder='Name'
          onChange={handleChange}
        />
        <input 
          type='text'
          value={newForm.image}
          name='image'
          placeholder='Image URL'
          onChange={handleChange}
        />
        <input 
          type='text'
          value={newForm.title}
          name='title'
          placeholder='Title'
          onChange={handleChange}
        />
        <input type='Submit' value="Create Person" />
      </form>
      <h2>People</h2>
      {props.people ? loaded() : loading()}
    </section>
    
  )
}

export default Index