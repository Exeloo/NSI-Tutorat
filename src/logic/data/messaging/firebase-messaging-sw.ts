import { getToken, onMessage } from 'firebase/messaging'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'
import { app } from '../firebase'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
  })
}

const messaging = getMessaging(app)
getToken(messaging, { vapidKey: 'BN1kk2VKkL4n3IL36Iq4-0uOX34HtWcixAF7156eBDPNu7w-TcpAnBFgxN39NucxT3QcUP4cl1sqEGeK9Es3rJ0' })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log('Good')
    }
    else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.')
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err)
    // ...
  })

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload)
  // ...
})

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  }

  self.registration.showNotification(notificationTitle,
    notificationOptions)
})
