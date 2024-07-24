import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Signup from './Signup';

import Page1 from './Page1';
import Page2 from './Page2';
import Pending from './Pending';

import Completedevents from './Completedevents';
import Invitiliat from './Invitiliat';
import Upcomingevent from './Upcomingevent';

import Chiefguest from './Chiefguest';
import QrCode from './QrCode';
import Createeventfaculty from './Createeventfaculty';
import Createeventsociety from './Createeventsociety';
import CreateBothevent from './CreateBothevent';
import ChooseDecipline from './ChooseDecipline';
import ChooseSemester from './ChooseSemester';
import ChooseSection from './ChooseSection';
import DetailsOfPendingEvents from './DetailsOfPendingEvents';
import DetailofUpcomingEvents from './DetailofUpcomingEvents';
import DetailsofCompletedEvents from './DetailsofCompletedEvents';
import StudentDeshbord from './StudentDeshbord';
import StudentInvitation from './StudentInvitation';
import InvitationDetails from './InvitationDetails';
import StudentWalletScreen from './StudentWalletScreen';
import AdminWalletDashboard from './AdminWalletDashboard';
import InvitiGuest from './InvitiGuest';
import PaymentPay from './PaymentPay';

const Stack = createNativeStackNavigator();
export default function Appp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={false}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="Home" component={Page1} />
        <Stack.Screen name="Create Event" component={Page2} />
        <Stack.Screen name="Pending Events" component={Pending} />

        <Stack.Screen name="Completed Events" component={Completedevents} />
        <Stack.Screen name="Inviti list" component={Invitiliat} />
        <Stack.Screen name="Upcoming Events" component={Upcomingevent} />
        <Stack.Screen name="Choose Decipline" component={ChooseDecipline} />
        <Stack.Screen name="Choose Semester" component={ChooseSemester} />
        <Stack.Screen name="Chief Guest Details" component={Chiefguest} />
        <Stack.Screen name="QR Code" component={QrCode} />
        <Stack.Screen name="Faculty Event" component={Createeventfaculty} />
        <Stack.Screen name="Society Event" component={Createeventsociety} />
        <Stack.Screen name="Create Event Both" component={CreateBothevent} />
        <Stack.Screen name="Choose Section" component={ChooseSection} />
        <Stack.Screen name="Student Wallet" component={StudentWalletScreen} />
        <Stack.Screen name="Inviti Guest" component={InvitiGuest} />
        <Stack.Screen name="Payment Pay" component={PaymentPay} />
        <Stack.Screen
          name="Admin Wallet Dashboard"
          component={AdminWalletDashboard}
        />
        <Stack.Screen
          name="Pendings Events Details"
          component={DetailsOfPendingEvents}
        />
        <Stack.Screen
          name="Upcoming Events Details"
          component={DetailofUpcomingEvents}
        />
        <Stack.Screen
          name="Completed Events Details"
          component={DetailsofCompletedEvents}
        />
        <Stack.Screen name="Student Dashboard" component={StudentDeshbord} />
        <Stack.Screen name="Invitation" component={StudentInvitation} />
        <Stack.Screen name="InvitationDetails" component={InvitationDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
