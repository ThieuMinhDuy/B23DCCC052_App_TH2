import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StudentForm } from '../components/StudentForm';
import { StudentContext } from '../context/StudentContext';
import { Student } from '../types/Student';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any, any>;
};

export const EditStudentScreen = ({ navigation, route }: Props) => {
  const { id } = route.params as { id: string };
  const { students, updateStudent } = useContext(StudentContext);

  const student = students.find(s => s.id === id);

  if (!student) {
    return <View style={styles.center}><Text>Không tìm thấy</Text></View>;
  }

  const handleSubmit = (updatedStudent: Student) => {
    updateStudent(id, updatedStudent);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StudentForm initialData={student} onSubmit={handleSubmit} submitLabel="Cập nhật" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
