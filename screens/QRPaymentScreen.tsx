import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const QRPaymentScreen = ({ route }:any) => {
  const [activeTab, setActiveTab] = useState('Scan');

  const tabs = [
    { icon: 'home-outline', label: 'Home' },
    { icon: 'compass-outline', label: 'Browse' },
    { icon: 'scan-outline', label: 'Scan' }, 
    { icon: 'wallet-outline', label: 'Wallet' },
    { icon: 'qr-code-outline', label: 'My QR' },
  ];

  const navigation = useNavigation();
  const { paymentCode, recipient, defaultAmount, currency } = route.params || {
    paymentCode: '456 566',
    recipient: 'Alex Devid',
    defaultAmount: '',
    currency: 'Sri Lankan Rupees'
  };

  const [amount, setAmount] = useState(defaultAmount);
  const [description, setDescription] = useState('');

  const handleApply = () => {
    navigation.navigate('SendRequestConfirmation', {
      recipientName: recipient,
      paymentCode: paymentCode,
      amount: amount,
      currency: currency
    });
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.headerGradient}>
  <TouchableOpacity onPress={() => {}} style={styles.backButton}>
    <Ionicons name="chevron-back" size={24} color="#777" />
  </TouchableOpacity>
  <Text style={styles.header}>QR Payment</Text>
  <TouchableOpacity style={styles.createButton}>
    <Text style={styles.createButtonText}>Cancel</Text>
  </TouchableOpacity>
</View>


      
      <View style={styles.paymentCodeContainer}>
        <Text style={styles.paymentCodeLabel}>{recipient} Payment Code</Text>
         <Ionicons name="qr-code" size={200} color="#f1e9ff" />
        <Text style={styles.paymentCode}>{paymentCode}</Text>
        <Text style={styles.recipient}>Paying To: {recipient}</Text>
      </View>
      

     
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
        />
      </View>

     
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />
      </View>

     
      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>

     
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
    backgroundColor: '#FFF',
    paddingBottom: 60,
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
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
  paymentCodeContainer: {
    backgroundColor: '#261f33', 
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: 360,
    height: 390,
    marginLeft:20,
  },
  paymentCodeLabel: {
    marginTop: 10,
    marginBottom:10,
    fontWeight:'500',
    color: '#f1e9ff',
    fontSize: 20,
    letterSpacing: 2.5,
  },
  paymentCode: {
    marginTop: 10,
    marginBottom:10,
    fontWeight:'500',
    color: '#f1e9ff',
    fontSize: 20,
    letterSpacing: 2.5,
  },
  recipient: {
    marginTop: 10,
    marginBottom:10,
    fontWeight:'500',
    color: '#f1e9ff',
    fontSize: 20,
    letterSpacing: 2.5,
  },
  inputContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  inputLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
  },
  applyButton: {
    backgroundColor: '#a160f8',
    margin: 16,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f3f3f3',
    paddingVertical: 10,
    marginBottom:50,
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
});

export default QRPaymentScreen;