import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        type: 'applicant'
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:80/capstone-project/api/applicants.php', inputs)
            .then(response => {
                console.log(response.data);
                navigate('/');
            })
            .catch(error => {
                console.error("There was an error submitting the form!", error);
            });
    }

    return (
        <div>
            <h1>Applicants</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="hidden" id="type" name="type" value={inputs.type} />
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile:</label>
                    <input type="tel" id="mobile" name="mobile" onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
