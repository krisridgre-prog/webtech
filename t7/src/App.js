import { Component } from 'react';

class Student extends Component {
    render() {
        return (
            <h2>Student Name: {this.props.name}</h2>
        );
    }
}

function App() {
    return <Student name="Krishna" />;
}

export default App;