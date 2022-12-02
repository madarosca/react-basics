import { useState, useEffect, ChangeEvent } from 'react'
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'
import { getData } from './utils/data.utils'
import './App.css'

export type User = {
    id: string;
    name: string;
    email: string;
}

const App = () => {
    const [searchField, setSearchField] = useState('')
    const [monsters, setMonsters] = useState<User[]>([])
    const [filteredMonsters, setFilteredMonsters] = useState(monsters)

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getData<User[]>('https://jsonplaceholder.typicode.com/users')
            setMonsters(users)
        }

        fetchUsers()
    }, [])

    useEffect(() => {
        const newFilteredMonsters = monsters.filter(({ name }) => {
            return name.toLocaleLowerCase().includes(searchField)
        })

        setFilteredMonsters(newFilteredMonsters)
    }, [monsters, searchField])

    const onSearchChange = (event:ChangeEvent<HTMLInputElement>): void => {
        const searchFieldString = event.target.value.toLocaleLowerCase()
        setSearchField(searchFieldString)
    }

	return (
		<div className='App'>
			<h1 className='app-title'>React basics</h1>
			<SearchBox placeholder='Search monsters' className='monsters-search-box' onChangeHandler={onSearchChange} />
			<CardList monsters={filteredMonsters} />
		</div>
	)
}

export default App
