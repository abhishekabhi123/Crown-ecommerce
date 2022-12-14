/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-empty-function */

import { useState } from 'react'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  // console.log(formFields)

  const resetForm = () => {
    setFormFields(defaultFormFields)
  }
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response)
      resetForm()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong password':
          alert('incorrect email for password')
          break
        case 'auth/user not found':
          alert('no user associated with this email address')
          break
        default:
          console.log(error)
      }
    }
  }
  const handleChange = (event) => {
    const { name, value } = ({ event } = event.target)
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'> Sign in</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google
          </Button>
        </div>
      </form>
    </div>
  )
}
export default SignInForm
