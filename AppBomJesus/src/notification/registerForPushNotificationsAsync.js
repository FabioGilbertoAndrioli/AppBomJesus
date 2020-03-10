import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';

const PUSH_ENDPOINT = 'http://10.19.1.31:8000/api/reserves';

export default async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  console.log(token)
  //POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        'token':token
    },body: JSON.stringify({
      token: {
        value: token,
      }
    }),
  })
  .then(res => res.json())
  .then( res => {
    console.log(token)
  });
}