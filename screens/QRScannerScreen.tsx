import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const QRScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!isScanning) return;
    
    setIsScanning(false); 
    const qrData = data.split(':');
    const paymentData = {
      code: qrData[1] || '456 566',
      name: (qrData[2] || 'Alex Devid').replace(/([A-Z])/g, ' $1').trim(),
      amount: qrData[3] || '',
      currency: qrData[4] === 'LKR' ? 'Sri Lankan Rupees' : 'USD'
    };

    // Navigate to QR Payment screen
    navigation.replace('QRPayment', {
      paymentCode: paymentData.code.match(/.{1,3}/g)?.join(' ') || paymentData.code,
      recipient: paymentData.name,
      defaultAmount: paymentData.amount,
      currency: paymentData.currency
    });
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission required</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
      />
      
    
      <View style={styles.overlay}>
        <View style={styles.scanFrame} />
        <Text style={styles.scanText}>Align QR code within frame</Text>
      </View>

      {!isScanning && (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.processingText}>Processing payment...</Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
  },
  scanText: {
    marginTop: 20,
    color: '#FFF',
    fontSize: 16,
  },
  processingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  processingText: {
    color: '#FFF',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default QRScannerScreen;