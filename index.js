import { AppRegistry } from 'react-native';
import React, { useEffect } from 'react';
import RootNavigator from './src/navigators/RootNavigator';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { name as appName } from './app.json';
import reduxStore from './src/redux/reducer/index';
import { PersistGate } from 'redux-persist/integration/react';
import { setupHttpConfig } from './src/utils/http';
import OneSignal from 'react-native-onesignal';
export default App = () => {

  const { store, persistor } = reduxStore();
  useEffect(() => {
    setupHttpConfig();
  }, []);
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("c414a2f1-3fa1-49e0-bd72-be75bfdade06");
    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData
      console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
