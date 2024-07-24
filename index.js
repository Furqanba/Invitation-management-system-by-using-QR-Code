/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Appp from './Screens/Appp';
import test from './Screens/test';

import Page2 from './Screens/Page2';
import Createeventfaculty from './Screens/Createeventfaculty';
import Createeventsociety from './Screens/Createeventsociety';
import CreateBothevent from './Screens/CreateBothevent';
import ChooseDecipline from './Screens/ChooseDecipline';
import ChooseSemester from './Screens/ChooseSemester';
import StudentDeshbord from './Screens/StudentDeshbord';
import StudentInvitation from './Screens/StudentInvitation';
import AdminWalletDashboard from './Screens/AdminWalletDashboard';
import GuardScanning from './Screens/GuardScanning';

AppRegistry.registerComponent(appName, () => GuardScanning);
