import { useState } from "react";
import axios from "axios";

export default function CreateUser() {
    
    const [inputs, setInputs] = useState({})
    const handleChange = (event ) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:80/api/user/save', inputs)
        console.log(inputs);
    }
    return (

        <form onSubmit={handleSubmit}>
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" onChange={handleChange} />
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} />
        </div>
        <div class="form-group">
            <label for="mobile">Mobile:</label>
            <input type="tel" id="mobile" name="mobile" onChange={handleChange} />
        </div>
        <button>Submit</button>
        </form>
    )
}

