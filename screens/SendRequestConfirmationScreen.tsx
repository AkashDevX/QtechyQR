import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal,ScrollView } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import ReactNativeBiometrics from 'react-native-biometrics';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';

type SendRequestConfirmationRouteProp = RouteProp<RootStackParamList, 'SendRequestConfirmation'>;

const SendRequestConfirmationScreen = ({ route }:any) => {
  const navigation = useNavigation();
  const { recipientName, paymentCode, amount, currency, walletType = 'TuPay Wallet',
    accountNumber = '070-1111-0000', } = route.params;
    
  const [modalVisible, setModalVisible] = useState(false);
  const navigateToReceipt = () => {
    setModalVisible(false);
    navigation.navigate('Receipt');
  };
  
  const [activeTab, setActiveTab] = useState('Scan');

  const tabs = [
    { icon: 'home-outline', label: 'Home' },
    { icon: 'compass-outline', label: 'Browse' },
    { icon: 'scan-outline', label: 'Scan' }, 
    { icon: 'wallet-outline', label: 'Wallet' },
    { icon: 'qr-code-outline', label: 'My QR' },
  ];

  const handleNextPress = async () => {
    const isAvailable = await LocalAuthentication.hasHardwareAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  
    if (!isAvailable || !isEnrolled) {
      alert('Biometric authentication not available.');
      return;
    }
    
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirm Face ID to proceed',
      fallbackLabel: 'Use Passcode',
    });
  
    if (result.success) {
      setModalVisible(true);
    } else {
      alert('Authentication cancelled or failed');
    }
  };

  
    return (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerGradient}>
  <TouchableOpacity onPress={() => {}} style={styles.backButton}>
    <Ionicons name="chevron-back" size={24} color="#777" />
  </TouchableOpacity>
  <Text style={styles.header}>Send Request</Text>
  <TouchableOpacity style={styles.createButton}>
    <Text style={styles.createButtonText}>Cancel</Text>
  </TouchableOpacity>
</View>

      <Text style={styles.sectionHeader}>Review & Send</Text>
    
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Recipient Section */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Send To</Text>
              <Text style={styles.accountName}>{recipientName}</Text>
              <Text style={styles.walletType}>{walletType}</Text>
              <Text style={styles.accountNumber}>{accountNumber}</Text>
              <Text style={styles.amount}>{amount}</Text>
            </View>
    
            {/* Sender Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Send From</Text>
              <Text style={styles.accountName}>{recipientName}.</Text>
              <Text style={styles.walletType}>{walletType}</Text>
              <Text style={styles.accountNumber}>{accountNumber}</Text>
            </View>
    
            {/* Description Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                Check the account number are correct. We only use these details to process payments, 
                not the account name. If they're incorrect, you could pay the wrong account and may 
                be unable to get your money back.
              </Text>
            </View>
    
            {/* Next Button */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
          <View style={styles.checkmarkBackground}>
          <Text style={styles.checkmark}>✔️</Text>
        </View>
           <Text style={styles.successTitle}>Successful!</Text>
      <Text style={styles.successMessage}>You have Download Your Receipt</Text>
            <TouchableOpacity
               onPress={navigateToReceipt}
              style={styles.okButton}
            >
              <Text style={{ color: '#fff' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    
         
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
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      headerGradient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#f8f8f8',
        marginTop:50,
        marginBottom:30,
        borderRadius:20,
      },
      backButton: {
        padding: 8,
      },
      header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
      },
      createButton: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
      createButtonText: {
        color: 'red',
        fontSize: 14,
        fontWeight: '500',
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#a160f8',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#f8f8f8',
        borderRadius:20,
        padding:10,
        width:150,
        marginLeft:120
      },
      scrollContent: {
        padding: 16,
        paddingBottom: 80,
      },
      section: {
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 16,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
      },
      accountName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign:'right'
      },
      walletType: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
        textAlign:'right'
      },
      accountNumber: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        textAlign:'right'
      },
      amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign:'right'
      },
      descriptionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
      },
      nextButton: {
        backgroundColor: '#a160f8',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
      },
      nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f3f3f3',
        paddingVertical: 10,
        marginBottom:20,
        marginTop:20,
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
      
      modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 24,
        alignItems: 'center',
      },
      successIconContainer: {
        backgroundColor: '#a160f8',
        borderRadius: 50,
        padding: 16,
        marginBottom: 16,
      },
      checkmarkBackground: {
        backgroundColor: '#a160f8',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkmark: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
      },
      successTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
      },
      successMessage: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 24,
      },
      doneButton: {
        backgroundColor: '#a160f8', 
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 48,
      },
      doneButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
  okButton: {
    marginTop: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#a160f8',
    borderRadius: 8,
  },
    });
    
    export default SendRequestConfirmationScreen;