import { useState } from 'react';

function Form() {
  const initialPersons = [
    { id: 0, firstName: 'Marta', lastName:'Colvin Andrade', email: 'MartaCol@hotmail.com'},
    { id: 1, firstName: 'Lamidi', lastName:'Olonade Fakeye', email: 'LamidiOlo@hotmail.com'},
    { id: 2, firstName: 'Louise', lastName:'Nevelson', email: 'LouiseNev@hotmail.com'},
  ];  

  const [person, setPerson] = useState({firstName: '', lastName: '', email: ''});
  const [persons, setPersons] = useState(initialPersons);
  const [nextId, setNextId] = useState(3);

  function onAddHandler(firstName,lastName,email){
    const insertAt = 1;
    const nextPersons = [...persons.slice(0, insertAt),{id: nextId, firstName: firstName, lastName:lastName, email: email},...persons.slice(insertAt)];
    setPersons(nextPersons);
    setNextId(nextId+1)
  }

  function onDeleteHandler(id){
    setPersons(persons.filter(person => person.id !== id));
  }

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <><section>
        <h1>Add to List</h1>
            <label>
                First name:
                <input
                placeholder={'Barbara'}
                value={person.firstName}
                onChange={handleFirstNameChange}
                />
            </label>
            <label>
                Last name:
                <input
                placeholder={'Hepworth'}
                value={person.lastName}
                onChange={handleLastNameChange}
                />
            </label>
            <label>
                Email:
                <input
                placeholder={'bhepworth@sculpture.com'}
                value={person.email}
                onChange={handleEmailChange}
                />
            </label>
            <button onClick={() => onAddHandler(person.firstName,person.lastName,person.email)}>Click to add</button>
            <p>
                {person.firstName}{' '}
                {person.lastName}{' '}
                {person.email ? '(' :''}{person.email}{person.email ? ')' :''}
            </p>
            <ul>
              {persons.map(person => (
                <li key={person.id}>{person.firstName} {person.lastName} ({person.email})
                  <button onClick={() => {onDeleteHandler(person.id)}}>Delete</button>
                </li>))}
              
            </ul>
      </section>
    </>
  );
}

export default Form