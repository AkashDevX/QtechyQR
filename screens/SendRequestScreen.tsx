import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SendRequestScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Scan');

  const tabs = [
    { icon: 'home-outline', label: 'Home' },
    { icon: 'compass-outline', label: 'Browse' },
    { icon: 'scan-outline', label: 'Scan' }, 
    { icon: 'wallet-outline', label: 'Wallet' },
    { icon: 'qr-code-outline', label: 'My QR' },
  ];


  return (
    <View style={styles.container}>
    
      <View style={styles.headerGradient}>
  <TouchableOpacity onPress={() => {}} style={styles.backButton}>
    <Ionicons name="chevron-back" size={24} color="#777" />
  </TouchableOpacity>
  <Text style={styles.header}>Send Request</Text>
  <TouchableOpacity style={styles.createButton}>
    <Text style={styles.createButtonText}>Cancel</Text>
  </TouchableOpacity>
</View>

      

     
      <View style={styles.walletSection}>
  <View style={styles.walletInfo}>
    <View style={styles.avatarPlaceholder}>
      <View style={styles.circularIcon}>
        <Text style={styles.iconText}>$</Text>
      </View>
    </View>
    <View>
      <Text style={styles.walletName}>Andrew Liu</Text>
      <Text style={styles.walletNumber}>070-1111-1111</Text>
    </View>
  </View>
  <TouchableOpacity style={styles.changeButton}>
    <Text style={styles.changeButtonText}>Change Person</Text>
  </TouchableOpacity>
  <View style={styles.walletDetails}>
    <TouchableOpacity style={styles.detailButton}>
      <Text style={styles.detailText}>Sri Lanka</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.detailButton}>
      <Text style={styles.detailText}>Sri Lankan Rupees</Text>
    </TouchableOpacity>
  </View>
</View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Sri Lanka</Text>
        <Text style={styles.infoLabel}>Sri Lankan Rupees</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
        />
      </View>
      {['Description', 'Reference'].map((label) => (
        <View key={label} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
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
    backgroundColor: '#fff',
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
  headerTime: {
    fontSize: 16,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderColor: '#007AFF',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#a160f8',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
    borderRadius:20,
    padding:10,
    width:250
  },
  
  
  
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
  },
  nextButton: {
    backgroundColor: '#a160f8',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
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
  walletSection: {
    backgroundColor: '#a160f8',
    borderRadius: 15,
    padding: 16,
    margin: 16,
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8c4de6', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  circularIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6d36b3', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  walletName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  walletNumber: {
    color: '#eee',
    fontSize: 14,
  },
  changeButton: {
    backgroundColor: '#8c4de6', 
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
    marginBottom: 12,
    
  },
  changeButtonText: {
   
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  walletDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailButton: {
    backgroundColor: '#9466ff', 
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
  },
  detailText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SendRequestScreen;