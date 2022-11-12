import { useState } from "react";

import Button from '../button/button.component'

import FormInput from "../form-input/form-input.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


import './sign-up-form.styles.scss'

//created an object
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    //useState will track the activity of the fields
    //You pass the object to defaultFormFields
    const [formFields, setFormFields] = useState(defaultFormFields);
    //destructuring the form values to use inside the code
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        //preventDefault- we are saying that we dont want any default handling of the system after form is submit
       //We need to match emails and check if user is 
        event.preventDefault();
        if(password !== confirmPassword) {
            alert ("Passwords do not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
           
            await createUserDocumentFromAuth(user, {displayName} );
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else {
                console.log('user creation encountered an error', error);
            }
            
        }
    }

    //create a function to handle the input event, pass it to the inputs
    //the inputs have to have a name, so the function can recognize what field changed
    //the value also needs to be in the input, so that we get what the user wrote
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };


    return (
        <div className="sign-up-container">
        <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label="Display Name"
                type="text" onChange={handleChange} 
                name="displayName" 
                value={displayName} required />
                <FormInput label="Email"
                type="email" 
                onChange={handleChange}  
                name="email" value={email} required />
                <FormInput label="Password"
                type="password" 
                onChange={handleChange}  
                name="password" value={password} required />
                <FormInput label="Confirm Password"
                type="password" 
                onChange={handleChange}  
                name="confirmPassword" value={confirmPassword} required />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;