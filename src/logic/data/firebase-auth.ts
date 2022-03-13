// import { GoogleAuthProvider, getRedirectResult } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { auth, db } from './firebase'
// import { User } from '~/logic/data/datas/User.firebase'

export const loadUserInfos = async() => {
  const userRef = doc(db, 'user', auth.currentUser?.uid as string)

  let user: DocumentData | undefined
  try {
    user = (await getDoc(userRef)).data()
  }
  catch (e) {
    user = undefined
  }

  return {
    id: auth.currentUser?.uid,
    data: user,
  }
}

// export const defineRedirect = () => {
//   getRedirectResult(auth)
//     .then(async(result) => {
//       // This gives you a Google Access Token. You can use it to access Google APIs.
//       if (!result) return failToConnect()
//
//       const credential = GoogleAuthProvider.credentialFromResult(result)
//       if (!credential) return
//
//       const token = credential.accessToken
//
//
//       // The signed-in user info.
//       const resultUser = result.user
//       const userDoc = new User(resultUser.uid)
//       await userDoc.set({
//         name: resultUser.displayName,
//       })
//       // const userData = await userDoc.get
//       // user.value = {id: , data: }
//     }).catch((error) => {
//     // Handle Errors here.
//       const errorCode = error.code
//       console.log(errorCode)
//       const errorMessage = error.message
//       console.log(errorMessage)
//       // The email of the user's account used.
//       const email = error.email
//       console.log(email)
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error)
//     // ...
//     })
// }
