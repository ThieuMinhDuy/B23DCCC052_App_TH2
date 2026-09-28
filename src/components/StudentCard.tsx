import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Student } from '../types/Student';
import { getStudentClassification } from '../utils/helpers';

interface Props {
  student: Student;
  onPress: () => void;
}

export const StudentCard = ({ student, onPress }: Props) => {
  const classification = getStudentClassification(student.gpa);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.id}>{student.id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Lớp:</Text>
        <Text style={styles.value}>{student.className}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>GPA:</Text>
        <Text style={[styles.value, styles.gpa]}>{student.gpa}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Xếp loại:</Text>
        <Text style={[styles.value, classification === 'Yếu' ? styles.danger : styles.success]}>{classification}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  id: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 80,
    color: '#666',
  },
  value: {
    flex: 1,
    color: '#333',
    fontWeight: '500'
  },
  gpa: {
    color: '#0056b3',
    fontWeight: 'bold'
  },
  success: {
    color: '#28a745',
    fontWeight: 'bold'
  },
  danger: {
    color: '#dc3545',
    fontWeight: 'bold'
  }
});
