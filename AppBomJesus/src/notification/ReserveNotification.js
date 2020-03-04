import PushNotification from 'react-native-push-notifications';

export default {
    configure () {
        PushNotification.configure({
            onNotification (notification) {
                console.log("Notificação recebida",notification)
            }
        })
        return PushNotification
    }
}