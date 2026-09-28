import React, { useContext, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StudentContext } from '../context/StudentContext';
import { StudentCard } from '../components/StudentCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const StudentListScreen = ({ navigation }: Props) => {
  const { students } = useContext(StudentContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(
    (s) =>
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo mã hoặc tên SV..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentCard 
            student={item} 
            onPress={() => navigation.navigate('StudentDetail', { id: item.id })} 
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Không tìm thấy sinh viên nào.</Text>}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddStudent')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#666',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  fabIcon: {
    fontSize: 32,
    color: 'white',
    marginTop: -2,
  }
});
