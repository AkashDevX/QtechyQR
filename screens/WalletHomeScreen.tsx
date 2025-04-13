import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
const Icon = require('react-native-vector-icons/Feather').default;
import { useNavigation } from '@react-navigation/native';


const WalletHomeScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [showScanner, setShowScanner] = useState(false);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
          if (!permission?.granted) {
            await requestPermission();
          }
        })();
      }, []);

  const walletData = {
    name: 'OEC',
    arabicText1: 'بينت',
    arabicText2: 'لذلك',
    number: '458 566',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  const [activeTab, setActiveTab] = useState('Scan');

  const tabs = [
    { icon: 'home-outline', label: 'Home' },
    { icon: 'compass-outline', label: 'Browse' },
    { icon: 'scan-outline', label: 'Scan' }, 
    { icon: 'wallet-outline', label: 'Wallet' },
    { icon: 'qr-code-outline', label: 'My QR' },
  ];

  const handleScanPress = async () => {
    if (!permission) {
      return;
    }

    if (!permission.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          'Permission required',
          'Camera access is needed to scan QR codes',
          [{ text: 'OK' }]
        );
        return;
      }
    }
    setScanned(false);
    setShowScanner(true);
  };


  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setShowScanner(false);
    Alert.alert('QR Code Scanned', `Data: ${data}`);
  };
  

  const handleActionPress = async (action: string) => {
    if (action === 'Send Request') {
      navigation.navigate('AddressBook');
    } else if (action === 'Set Amount') {
      
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      navigation.navigate('QRScanner');
    } else {
      Alert.alert(
        'Permission Required',
        'Please enable camera access to scan QR codes',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() }
        ]
      );
    }
    }
  };

  if (showScanner) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowScanner(false)}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </CameraView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
      <Text style={styles.title}>My wallet</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Icon name="shield" size={20} color="#A78BFA" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="bell" size={20} color="#A78BFA" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="user" size={20} color="#A78BFA" />
        </TouchableOpacity>
      </View>
    </View>
      
      <View style={styles.content}>
        
       
        <TouchableOpacity style={styles.qrContainer} onPress={handleScanPress}>
      <View style={styles.qrCard}>
        <Ionicons name="qr-code" size={200} color="#f1e9ff" />
        <Text style={styles.qrCodeText}>458 566</Text>
      </View>
    </TouchableOpacity>
        
        
        <View style={styles.buttonContainer}>
      
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => handleActionPress('Send Request')}
      >
        <Text style={styles.primaryButtonText}>Send Request</Text>
      </TouchableOpacity>

     
      <TouchableOpacity
        style={styles.outlinedButton}
        onPress={() => handleActionPress('Set Amount')}
      >
        <Text style={styles.outlinedButtonText}>Set Amount</Text>
      </TouchableOpacity>

     
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => handleActionPress('Share')}
      >
        <Ionicons name="share-social-outline" size={20} color="#a160f8" />
      </TouchableOpacity>
    </View>
      </View>
      
     
      <View style={styles.bottomNav}>
      {tabs.map((item, index) => {
        const isCenter = item.label === 'Scan';
        const isActive = activeTab === item.label;

        return (
          <TouchableOpacity
            key={item.label}
            onPress={() => setActiveTab(item.label)}
            style={[styles.navItem, isCenter && styles.centerItem]}
          >
            <View style={isActive ? styles.activeIconCircle : null}>
              <Ionicons
                name={item.icon as any}
                size={24}
                color={isActive ? '#fff' : '#000'}
              />
            </View>
            {!isCenter && (
              <Text
                style={[
                  styles.navText,
                  isActive && { color: '#a160f8' },
                ]}
              >
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#120C1E', 
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A78BFA', 
  },
  
  qrPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  
  walletInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrCard: {
    backgroundColor: '#261f33', 
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: 360,
    height: 390,
  },
  qrCodeText: {
    marginTop: 10,
    color: '#f1e9ff',
    fontSize: 68,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  walletName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  walletText: {
    fontSize: 16,
    marginBottom: 5,
  },
  walletNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    backgroundColor: '#a160f8',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  
  },
  primaryButton: {
    backgroundColor: '#a160f8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight:10
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#a160f8',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  outlinedButtonText: {
    color: '#a160f8',
    fontSize: 14,
    fontWeight: '500',
  },
  iconButton: {
    borderWidth: 1,
    borderColor: '#a160f8',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f3f3f3',
    paddingVertical: 10,
    marginLeft:20,
    marginRight:20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: '#000',
  },
  centerItem: {
    marginTop: -20,
    backgroundColor: '#a160f8',
    padding: 16,
    borderRadius: 50,
    elevation: 5,
  },
  activeIconCircle: {
    backgroundColor: '#a160f8',
    padding: 10,
    borderRadius: 25,
  },
  
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
  },
});

export default WalletHomeScreen;