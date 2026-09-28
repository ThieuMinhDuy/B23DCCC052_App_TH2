import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StudentProvider } from './src/context/StudentContext';

import { StudentListScreen } from './src/screens/StudentListScreen';
import { StudentDetailScreen } from './src/screens/StudentDetailScreen';
import { AddStudentScreen } from './src/screens/AddStudentScreen';
import { EditStudentScreen } from './src/screens/EditStudentScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <StudentProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StudentList">
          <Stack.Screen 
            name="StudentList" 
            component={StudentListScreen} 
            options={{ title: 'Danh sách sinh viên' }} 
          />
          <Stack.Screen 
            name="StudentDetail" 
            component={StudentDetailScreen} 
            options={{ title: 'Chi tiết sinh viên' }} 
          />
          <Stack.Screen 
            name="AddStudent" 
            component={AddStudentScreen} 
            options={{ title: 'Thêm sinh viên' }} 
          />
          <Stack.Screen 
            name="EditStudent" 
            component={EditStudentScreen} 
            options={{ title: 'Chỉnh sửa sinh viên' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StudentProvider>
  );
}

export default App;
