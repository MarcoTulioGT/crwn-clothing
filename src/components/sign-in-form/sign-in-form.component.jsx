import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../contexts/user.context';

import { signInWithGooglePopup, createUserDocumentFromAuth, asignInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const sigInWithGoogle = async () => {
         await signInWithGooglePopup();

    }

    const handlerSubmit = async (event) => {
        event.preventDefault();

      try {
          await asignInAuthUserWithEmailAndPassword(email, password);
          resetFormFields();
      }catch(error){
        switch (error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
            default:
              console.log(error);
          }

      }
    };


    const handlerChange = (event) => {
        const  {name, value} = event.target;
        setFormFields({...formFields, [name]: value });
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handlerSubmit}>

                <FormInput label='Email'  type='email' required onChange={handlerChange} name="email" value={email}/>

                <FormInput label='Password' type='password' required onChange={handlerChange} name="password" value={password}/>

               <div className='buttons-container'>
               <Button  type='submit'>Sign In</Button>
               <Button type='button' buttonType='google' onClick={sigInWithGoogle}>Google sign in</Button>
               </div>
            </form>
        </div>
    );
};

export default SignInForm;