
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletHomeScreen from './screens/WalletHomeScreen';
import AddressBook from './screens/AddressBook';
import ContactDetails from './screens/ContactDetails';
import SendRequestScreen from './screens/SendRequestScreen';
import { useCameraPermissions, CameraView } from 'expo-camera';
import React, { useState } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import QRScannerScreen from './screens/QRScannerScreen';
import QRPaymentScreen from './screens/QRPaymentScreen';
import SendRequestConfirmationScreen from './screens/SendRequestConfirmationScreen';
import PaymentReceiptScreen from './screens/PaymentReceiptScreen';

export type RootStackParamList = {
  WalletHome: undefined;
  AddressBook:undefined;
  ContactDetails: { contactId: string };
  SendRequest: undefined;
  QRScanner: undefined;
  QRPayment: {
    paymentCode: string;
    recipient: string;
    defaultAmount: string;
    currency: string;
  };
  SendRequestConfirmation: {
    recipientName: string;
    paymentCode: string;
    amount: string;
    currency: string;
  };
  Receipt: undefined;
  
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isReady, setIsReady] = useState(false);

  
  useState(() => {
    (async () => {
      await requestPermission();
      setIsReady(true);
    })();
  }, );

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Camera permission is required to scan QR codes</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen 
          name="WalletHome" 
          component={WalletHomeScreen}
          options={{ 
            title: 'My Wallet',
            headerShown: false
          }}
        />
        <Stack.Screen name="AddressBook" component={AddressBook}   options={{ headerShown: false }}/>
        <Stack.Screen 
          name="ContactDetails" 
          component={ContactDetails}
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="SendRequest" 
          component={SendRequestScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="QRScanner" 
          component={QRScannerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="QRPayment" 
          component={QRPaymentScreen}
          options={{ 
            headerShown: false
          }}
        />
        <Stack.Screen name="Receipt" component={PaymentReceiptScreen} options={{ headerShown: false }}/>
        <Stack.Screen 
          name="SendRequestConfirmation" 
          component={SendRequestConfirmationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}