import React from 'react';
import SearchBox from './SearchBox'
import CardList from './CardList';
import {robots} from './Robots';
import './App.css';
import Scroll from './Scroll';

class App extends React.Component {
	constructor(){
	super();
	this.state={searchfield: '',
				robots: []}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(resopnse => resopnse.json())
		.then(users => this.setState({robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
			
	}
	
render(){
	const filteredRobots = this.state.robots.filter(robots =>{
			return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		});

	if(this.state.robots.length === 0){
		return <h1>LOADING...</h1>
	} else {
	return( <div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<CardList robots={filteredRobots}/>
				</Scroll>
			</div>)
		}
	}
}

export default App;
