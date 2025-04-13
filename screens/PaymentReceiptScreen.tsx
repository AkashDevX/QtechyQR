import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const PaymentReceiptScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
       
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Payment Sent</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
        </View>

       
        <View style={styles.receiptNoContainer}>
          <Text style={styles.receiptNoLabel}>Receipt no</Text>
          <Text style={styles.receiptNoValue}>N311321812284</Text>
        </View>

     
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Send To</Text>
            <View style={styles.iconContainer}>
              {/* <Image
                source={require('./assets/upload_icon.png')} // Replace with your actual icon path
                style={styles.icon}
                resizeMode="contain"
              /> */}
            </View>
          </View>
          <Text style={styles.name}>Andrew A Liu.</Text>
          <Text style={styles.wallet}>TuPay Wallet</Text>
          <Text style={styles.info}>070-1111-0000</Text>
          <Text style={styles.amount}>1000</Text>
        </View>

       
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Send From</Text>
            <View style={styles.iconContainer}>
              {/* <Image
                source={require('./assets/upload_icon.png')} // Replace with your actual icon path
                style={styles.icon}
                resizeMode="contain"
              /> */}
            </View>
          </View>
          <Text style={styles.name}>Andrew A Liu.</Text>
          <Text style={styles.wallet}>TuPay Wallet</Text>
          <Text style={styles.info}>070-1111-0000</Text>
        </View>

        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Description</Text>
          <Text style={styles.detailValue}>Saving</Text>
        </View>

      
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}> {new Date().toLocaleDateString()}</Text>
        </View>

       
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.buttonText}>Download Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.buttonText}>Share My Receipt</Text>
          </TouchableOpacity>
        </View>

        
        <TouchableOpacity style={styles.siriButton}>
          {/* <Image
            source={require('./assets/siri_icon.png')} // Replace with your actual Siri icon path
            style={styles.siriIcon}
            resizeMode="contain"
          /> */}
          <Text style={styles.siriText}>Add To Siri</Text>
        </TouchableOpacity>
        <Text style={styles.siriDescription}>
          Add to Siri so you can ask Siri to transfer to ANDREW LIU
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#a160f8',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#f8f8f8',
        borderRadius:30,
        padding:10,
        width:150,
        marginLeft:120
  },
  closeButton: {
    fontSize: 20,
    color: '#888',
    fontWeight: 'bold',
  },
  receiptNoContainer: {
    marginBottom: 20,
  },
  receiptNoLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  receiptNoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginRight: 10,
  },
  iconContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#777',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign:'right'
  },
  wallet: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
     textAlign:'right'
  },
  info: {
    fontSize: 14,
    color: '#666',
     textAlign:'right'
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
     textAlign:'right'
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  downloadButton: {
    backgroundColor: '#9466FF',
    borderRadius: 10,
    paddingVertical: 15,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 15,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  siriButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  siriIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  siriText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  siriDescription: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default PaymentReceiptScreen;