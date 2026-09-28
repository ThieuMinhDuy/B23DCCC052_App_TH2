import React, { useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StudentForm } from '../components/StudentForm';
import { StudentContext } from '../context/StudentContext';
import { Student } from '../types/Student';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const AddStudentScreen = ({ navigation }: Props) => {
  const { students, addStudent } = useContext(StudentContext);

  const handleSubmit = (student: Student) => {
    if (students.some(s => s.id === student.id)) {
      Alert.alert('Lỗi', 'Mã sinh viên đã tồn tại!');
      return;
    }
    addStudent(student);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StudentForm onSubmit={handleSubmit} submitLabel="Thêm sinh viên" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }
});
