import { useState } from 'react';
import  { useDispatch } from 'react-redux';


import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


import './sign-up-form.styles.scss';



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;
    const dispatch = useDispatch();

    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handlerSubmit = async (event) => {
        event.preventDefault();

      if(password !== confirmPassword ){
          alert("passwords do not match");

          return;
      }
      try {
        const {user} = await createAuthUserWithEmailAndPassword(email, password);

        await createUserDocumentFromAuth(user, {displayName});
        
        //dispatch(signUpStart(email, password, displayName));
        resetFormFields();
      }catch(error){
          if(error.code === 'auth/email-already-in-use'){
              alert('Cannot create user, email already in use');
          }else {
            console.log('User creation encounteres and error',error);
          }
      }
    };


    const handlerChange = (event) => {
        const  {name, value} = event.target;
        setFormFields({...formFields, [name]: value });
    }

    return (
        <div className='sign-up-container'>
            <h2>Don´t have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handlerSubmit}>
                <FormInput label='Display Name' type='text' required onChange={handlerChange} name="displayName" value={displayName}/>

                <FormInput label='Email'  type='email' required onChange={handlerChange} name="email" value={email}/>

                <FormInput label='Password' type='password' required onChange={handlerChange} name="password" value={password}/>

                <FormInput label='Confirm Password' type='password' required onChange={handlerChange}name="confirmPassword" value={confirmPassword}/>

                <Button  type='submit'>Sign Up</Button>



            </form>
        </div>
    );
};

export default SignUpForm;