import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type WalletDetails = {
  walletName: string;
  walletId: string;
  country: string;
  mobileNumber: string;
  emailAddress: string;
};

type ContactDetailsProps = {
  route: RouteProp<RootStackParamList, 'ContactDetails'>;
};

const ContactDetailsScreen = ({ route }: ContactDetailsProps) => {
  const { contactId } = route.params;
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const navigation = useNavigation();
   const [activeTab, setActiveTab] = useState('Scan');

  const tabs = [
    { icon: 'home-outline', label: 'Home' },
    { icon: 'compass-outline', label: 'Browse' },
    { icon: 'scan-outline', label: 'Scan' }, 
    { icon: 'wallet-outline', label: 'Wallet' },
    { icon: 'qr-code-outline', label: 'My QR' },
  ];


  const fetchWalletDetails = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${Math.floor(Math.random() * 10) + 1}`);
      const data = await response.json();
      
      setWalletDetails({
        walletName: data.name,
        walletId: '077 ' + data.id.toString().padStart(6, '0').replace(/(\d{3})(\d{3})/, '$1 $2'),
        country: 'Sri Lanka',
        mobileNumber: '+94 ' + data.phone.replace(/\D/g, '').slice(0, 9).replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3'),
        emailAddress: data.email
      });
    } catch (err) {
      setError('Failed to fetch wallet details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletDetails();
  }, [contactId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerGradient}>
          <TouchableOpacity onPress={() => {}} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#777" />
          </TouchableOpacity>
          <Text style={styles.header}>Send Request</Text>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionHeader}>My Wallet Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Wallet Name :</Text>
          <Text style={styles.detailValue}>{walletDetails?.walletName}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Wallet ID :</Text>
          <Text style={styles.detailValue}>{walletDetails?.walletId}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Country :</Text>
          <Text style={styles.detailValue}>{walletDetails?.country}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Mobile Number :</Text>
          <Text style={styles.detailValue}>{walletDetails?.mobileNumber}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email Address :</Text>
          <Text style={styles.detailValue}>{walletDetails?.emailAddress}</Text>
        </View>
        
        <TouchableOpacity style={styles.nextButton}   onPress={() => navigation.navigate('SendRequest')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
      
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
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
    width:250
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    width: 120,
    fontSize: 16,
    color: '#666',
    marginBottom:20,
    marginRight:30
  },
  detailValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    borderWidth:1,
    textAlign:'center'
  },
  nextButton: {
    backgroundColor: '#a160f8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
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
  headerGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
    marginTop:30,
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
    
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  createButtonText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ContactDetailsScreen;