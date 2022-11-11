import { useState } from "react";

import Button from '../button/button.component'

import FormInput from "../form-input/form-input.component";

import { signInAuthWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } 
from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss'

//created an object
const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    //useState will track the activity of the fields
    //You pass the object to defaultFormFields
    const [formFields, setFormFields] = useState(defaultFormFields);
    //destructuring the form values to use inside the code
    const {email, password} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        // console.log(response);
        //createUserDocumentFromAuth(user);
    }
  

    const handleSubmit = async (event) => {
        //preventDefault- we are saying that we dont want any default handling of the system after form is submit
       //We need to match emails and check if user is 
        event.preventDefault();    

        try {       
            const response = await signInAuthWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated to this email');
                    break;
                default: console.log(error);
            }          
        }
    };

    //create a function to handle the input event, pass it to the inputs
    //the inputs have to have a name, so the function can recognize what field changed
    //the value also needs to be in the input, so that we get what the user wrote
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };


    return (
        <div className="sign-up-container">
        <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email"
                type="email" 
                onChange={handleChange}  
                name="email" value={email} required />
                <FormInput label="Password"
                type="password" 
                onChange={handleChange}  
                name="password" value={password} required />
                <div className="buttons-container">
                 <Button type='submit'>Sign In</Button>
                 <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;