import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StudentContext } from '../context/StudentContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { getStudentClassification } from '../utils/helpers';

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any, any>;
};

export const StudentDetailScreen = ({ navigation, route }: Props) => {
  const { id } = route.params as { id: string };
  const { students, deleteStudent } = useContext(StudentContext);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy sinh viên</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa sinh viên này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          deleteStudent(student.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <DetailRow label="Mã sinh viên" value={student.id} />
        <DetailRow label="Họ và tên" value={student.name} />
        <DetailRow label="Ngày sinh" value={student.dob} />
        <DetailRow label="Giới tính" value={student.gender} />
        <DetailRow label="Email" value={student.email} />
        <DetailRow label="Số điện thoại" value={student.phone} />
        <DetailRow label="Lớp" value={student.className} />
        <DetailRow label="Khoa" value={student.faculty} />
        <DetailRow label="GPA" value={student.gpa.toString()} />
        <DetailRow label="Xếp loại" value={getStudentClassification(student.gpa)} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editBtn]}
          onPress={() => navigation.navigate('EditStudent', { id: student.id })}
        >
          <Text style={styles.btnText}>Chỉnh sửa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.deleteBtn]} onPress={handleDelete}>
          <Text style={styles.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: { width: 120, fontWeight: 'bold', color: '#555' },
  value: { flex: 1, color: '#333' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editBtn: { backgroundColor: '#ffc107' },
  deleteBtn: { backgroundColor: '#dc3545' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
