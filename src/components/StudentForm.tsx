import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { Student } from '../types/Student';

interface Props {
  initialData?: Student;
  onSubmit: (student: Student) => void;
  submitLabel: string;
}

export const StudentForm = ({ initialData, onSubmit, submitLabel }: Props) => {
  const [formData, setFormData] = useState<Student>(
    initialData || {
      id: '',
      name: '',
      dob: '',
      gender: '',
      email: '',
      phone: '',
      className: '',
      faculty: '',
      gpa: 0,
    }
  );

  const handleChange = (name: keyof Student, value: string) => {
    if (name === 'gpa') {
      const numericVal = value.replace(/[^0-9.]/g, '');
      setFormData({ ...formData, gpa: numericVal as unknown as number }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateAndSubmit = () => {
    if (!formData.id || !formData.name || !formData.className) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ Mã sinh viên, Họ tên và Lớp');
      return;
    }
    const gpaValue = parseFloat(formData.gpa.toString());
    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 10) {
      Alert.alert('Lỗi', 'GPA phải từ 0 đến 10');
      return;
    }
    onSubmit({ ...formData, gpa: gpaValue });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mã sinh viên *</Text>
        <TextInput
          style={styles.input}
          value={formData.id}
          onChangeText={(val) => handleChange('id', val)}
          editable={!initialData} 
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Họ và tên *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(val) => handleChange('name', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ngày sinh</Text>
        <TextInput
          style={styles.input}
          value={formData.dob}
          onChangeText={(val) => handleChange('dob', val)}
          placeholder="DD/MM/YYYY"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Giới tính</Text>
        <TextInput
          style={styles.input}
          value={formData.gender}
          onChangeText={(val) => handleChange('gender', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(val) => handleChange('email', val)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={(val) => handleChange('phone', val)}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Lớp *</Text>
        <TextInput
          style={styles.input}
          value={formData.className}
          onChangeText={(val) => handleChange('className', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Khoa</Text>
        <TextInput
          style={styles.input}
          value={formData.faculty}
          onChangeText={(val) => handleChange('faculty', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>GPA (0-10)</Text>
        <TextInput
          style={styles.input}
          value={formData.gpa.toString()}
          onChangeText={(val) => handleChange('gpa', val)}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={validateAndSubmit}>
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  inputGroup: { marginBottom: 16 },
  label: { marginBottom: 8, fontWeight: 'bold', color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
