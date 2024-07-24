import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {url} from './URL';

const AdminWalletDashboard = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [allWallet, setAllWallet] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const RequestDetails = student => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const AcceptDetails = async item => {
    try {
      console.log('item', item);
      const data = {
        aridNo: item.studentarid,
        amount: item.walletAmount,
        reqID: item.reqID,
      };
      var formdata = new FormData();
      formdata.append('aridNo', item.studentarid);
      formdata.append('amount', item.walletAmount);
      formdata.append('reqID', item.reqID);

      console.log('list ', data);
      const response = await fetch(url + 'EventInfo/AcceptWalletRequest', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      });
      if (response.ok) {
        var ans = await response.json();
        Alert.alert(ans);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AllStudentwallet = async () => {
    try {
      console.log('Starting ');
      var response = await fetch(url + 'EventInfo/AllWallet', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const ans = await response.json();
        setAllWallet(ans);
        console.log('Request', ans);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllStudentwallet();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Admin Wallet Dashboard</Text>

      <Text style={styles.transactionsTitle}>Student Requests:</Text>
      <FlatList
        data={allWallet}
        // keyExtractor={item => item.ReqID.toString()}
        renderItem={({item}) => (
          <View style={styles.transaction}>
            <Text>
              <Text style={styles.boldText}>{item.studentname}</Text> wants to
              add RS <Text style={styles.boldText}>{item.walletAmount}</Text> to
              the wallet.
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => AcceptDetails(item)}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => RequestDetails(item)}>
                <Text style={styles.buttonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {selectedStudent && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Student Details</Text>
              <Text style={styles.modalText}>
                Name: {selectedStudent.studentname}
              </Text>
              <Text style={styles.modalText}>
                Wallet Amount: {selectedStudent.walletAmount}
              </Text>
              <Text style={styles.modalText}>
                Student Arid: {selectedStudent.studentarid}
              </Text>
              <Text style={styles.modalText}>
                Batch: {selectedStudent.studentbatch}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#83f2cd',
    flex: 1,
    padding: wp('5%'),
  },
  headerText: {
    fontSize: wp('8%'),
    color: '#333',
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  transactionsTitle: {
    fontSize: wp('6%'),
    fontWeight: '600',
    marginBottom: hp('2%'),
    color: '#666',
  },
  transaction: {
    padding: wp('4%'),
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    marginBottom: hp('1.5%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: hp(2),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: '#2196f3',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4%'),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('80%'),
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    padding: wp('5%'),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#333',
  },
  modalText: {
    fontSize: wp('4.5%'),
    marginBottom: hp('1%'),
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#f44336',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
});

export default AdminWalletDashboard;
