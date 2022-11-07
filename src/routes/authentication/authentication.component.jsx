import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const Authentication = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with google </button>
      <SignUpForm />
    </div>
  )
}

export default Authentication