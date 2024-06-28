import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { useAuth0 } from "react-native-auth0";

export interface PushNotificationState {
    notification?: Notifications.Notification;
    expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotifications = (user): PushNotificationState => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldShowAlert: true,
            shouldSetBadge: false,
        })
    })

    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>();

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    // How can I make it recheck for push notifications?
    async function registerForPushNotificationsAsync(user) {
        let token;
        let user_id = user.sub

        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                console.log("Failed to get push token. Try again");
                return null;
                // setTimeout(async () => {
                //     console.log("Retrying for push notification in 10 seconds")
                //     const { status } = await Notifications.requestPermissionsAsync();
                //     finalStatus = status;
                // }, 10000);
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId,
            });

            console.log("Notification permissions granted with token of: ", expoPushToken)

            if (Platform.OS === "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.HIGH,
                    vibrationPattern: [0, 250, 250, 300],
                    lightColor: "#FF231F7C"
                })
            }

            //store push token on db
            const storePushToken = async (user) => {
                const data = { "user_id": user.sub, "expo_push_token": token.data }
                await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/storeexpopushtoken`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                console.log("/storeexpopushtoken: ", user.sub, " - ", token.data)
            };

            console.log("token: ", token.data)
            console.log("user_id: ", user_id)
            storePushToken(user);

            return token;
        } else {
            console.log("Error. Use a physical devices. Simulators don't work for notifications");
        }
    }

    useEffect(() => {
        registerForPushNotificationsAsync(user).then((token) => {
            setExpoPushToken(token);
        })

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response)
            });

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            )
            Notifications.removeNotificationSubscription(responseListener.current!)
        }

    }, []);

    return {
        expoPushToken,
        notification,
    }

}
