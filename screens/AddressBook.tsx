import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
type Contact = {
    id: string;
    name: string;
    phone: string;
    country: string;
    currency: string;
};

const AddressBook = () => {
  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10&nat=us,gb,ca');
      const data = await response.json();
      
      const formattedContacts = data.results.map((user: any, index: number) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        phone: user.phone.replace(/\D/g, '').slice(0, 8).replace(/(\d{4})(\d{4})/, '$1 $2'),
        country: user.location.country,
        currency: `${user.location.country}  Dollars` 
      }));
        
        setContacts(formattedContacts);
      } catch (err) {
        setError('Failed to fetch contacts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
    // contact.email.toLowerCase().includes(searchText.toLowerCase())
  );
  const [activeTab, setActiveTab] = useState('Scan');

  const tabs = [
    { icon: 'home-outline', label: 'Home' },
    { icon: 'compass-outline', label: 'Browse' },
    { icon: 'scan-outline', label: 'Scan' }, 
    { icon: 'wallet-outline', label: 'Wallet' },
    { icon: 'qr-code-outline', label: 'My QR' },
  ];



  const renderItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity  onPress={() => navigation.navigate('ContactDetails', { contactId: item.id })}>
    <View style={styles.contactContainer}>
      <View style={styles.leftSection}>
        <Ionicons name="person" size={24} color="#444" style={styles.icon} />
        <View>
          <Text style={styles.name}># {item.name}</Text>
          <Text style={styles.country}>{item.country}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.currency}>{item.currency}</Text>
        
      </View>
    </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      <View style={styles.headerGradient}>
  <TouchableOpacity onPress={() => {}} style={styles.backButton}>
    <Ionicons name="chevron-back" size={24} color="#777" />
  </TouchableOpacity>
  <Text style={styles.header}>Address Book</Text>
  <TouchableOpacity style={styles.createButton}>
    <Text style={styles.createButtonText}>Create</Text>
  </TouchableOpacity>
</View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search By Name or Email"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No contacts found</Text>
          </View>
        }
      />
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
        paddingTop: 40,
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
      contactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      },
      leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e5e5e5', 
      },
      
      rightSection: {
        alignItems: 'flex-end',
      },
      icon: {
        marginRight: 15,
      },
      name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginBottom: 3,
      },
      country: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
      },
      phone: {
        fontSize: 16,
        fontWeight: '500',
        color: '#444',
        marginBottom: 3,
      },
      currency: {
        fontSize: 14,
        color: '#666',
      },
  
  searchContainer: {
    paddingHorizontal: 15,
    marginBottom: 30,
    
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  list: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
    
  },
  contactItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nameContainer: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-end',
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
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  createButtonText: {
    color: '#a160f8',
    fontSize: 14,
    fontWeight: '500',
  },
  
});

export default AddressBook;