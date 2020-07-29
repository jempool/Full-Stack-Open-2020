import React, { useState, useEffect } from 'react'
import personsServices from "./services/persons"

//Component that renders an input to filter names
const Filter = ({ value, handleFilter }) => (
    <form>
        <div>filter shown with: <input
            value={value}
            onChange={handleFilter}
        /> </div>
    </form>
)

//Component that renders the form to add persons
const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, addPerson }) => (
    <form>
        <div>
            name: <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <div>
                number: <input
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                /></div>
        </div>
        <div>
            <button type="submit" onClick={addPerson}>add</button>
        </div>
    </form>
)

//Component that only renders a person 
const Person = ({ person, deletePerson }) => (
    <div key={person.name}>{person.name}{" "}{person.number}
        <button onClick={() => deletePerson(person)}>delete</button>
    </div>
)

//Component that only renders many persons
const Persons = ({ persons, deletePerson }) => (
    <div>
        {persons.filter(person => person.show).map(person =>
            <Person key={person.name} person={person} deletePerson={deletePerson} />
        )}
    </div>
)

//Component that renders a notification
const Notification = ({ message, classMessage }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={classMessage}>
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [classMessage, setClassMessage] = useState('error')
    const [errorMessage, setErrorMessage] = useState(null)


    //Hook to fetch Persons from 'json-server'
    useEffect(() => {
        personsServices
            .getAll()
            .then(persons => setPersons(persons))
    }, [])

    //Function to 'add' or 'update' a person in the phonebook
    const addPerson = (event) => {
        event.preventDefault()
        const matchedPersons = persons.filter(person => person.name === newName)
        if (matchedPersons.length === 1) {
            const message = `${newName} is already added to phonebook, replace the old number with a new one`
            const replace = window.confirm(message)
            if (replace) {
                personsServices
                    .updatePerson({ ...matchedPersons[0], number: newNumber })
                    .then(response => {
                        const newPersons = persons.filter(person => person.name !== newName)
                        setPersons(newPersons.concat(response))
                        showMessage(`Updated ${response.name}`, "success")
                    })
                    .catch(error => console.log("update failed!"))
            }
        }
        else {
            const newPerson = { name: newName, number: newNumber, show: true }
            personsServices
                .addPerson(newPerson)
                .then(response => {
                    setPersons(persons.concat(response))
                    showMessage(`Added ${newPerson.name}`, "success")
                })
        }
        setNewName("")
        setNewNumber("")
    }

    //Function to 'delete' a person in the phonebook
    const deletePerson = person => {
        const deletePerson = window.confirm(`Delete ${person.name}?`)
        if (deletePerson) {
            personsServices
                .deletePerson(person.id)
                .then(response => {
                    showMessage(`Deleted ${person.name}`, "success")
                    setPersons(persons.filter(newPerson => newPerson.id !== person.id))
                })
                .catch(error => {
                    showMessage(`Information of ${person.name} has already been removed from server`, "error")
                    setPersons(persons.filter(newPerson => newPerson.id !== person.id))
                })
        }
    }

    //Function to filter the persons to show
    const handleFilter = (event) => {
        const filteredPersons = persons.map(person =>
            person.name.toLowerCase().includes(event.target.value.toLowerCase()) ?
                { name: person.name, number: person.number, show: true } :
                { name: person.name, number: person.number, show: false }
        )
        setFilter(event.target.value)
        setPersons(filteredPersons)
    }

    //Function to show a message
    const showMessage = (message, classMessage) => {
        setErrorMessage(message)
        setClassMessage(classMessage)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification
                message={errorMessage}
                classMessage={classMessage}
            />
            <Filter
                value={filter}
                handleFilter={handleFilter}
            />

            <h2>add a new</h2>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                addPerson={addPerson}
            />

            <h2>Numbers</h2>
            <Persons
                persons={persons}
                deletePerson={deletePerson}
            />
        </div>
    )
}

export default App
