import React, { createContext, useState, ReactNode } from 'react';
import { Student } from '../types/Student';

interface StudentContextProps {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, updatedStudent: Student) => void;
  deleteStudent: (id: string) => void;
}

export const StudentContext = createContext<StudentContextProps>({
  students: [],
  addStudent: () => {},
  updateStudent: () => {},
  deleteStudent: () => {},
});

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'B23DCCC001',
      name: 'Nguyễn Văn A',
      dob: '01/01/2005',
      gender: 'Nam',
      email: 'nva@example.com',
      phone: '0123456789',
      className: 'D23CQCN01',
      faculty: 'CNTT',
      gpa: 8.6,
    },
    {
      id: 'B23DCCC002',
      name: 'Trần Thị B',
      dob: '02/02/2005',
      gender: 'Nữ',
      email: 'ttb@example.com',
      phone: '0987654321',
      className: 'D23CQCN02',
      faculty: 'CNTT',
      gpa: 7.5,
    },
    {
      id: 'B23DCCC003',
      name: 'Lê Hoàng C',
      dob: '15/05/2005',
      gender: 'Nam',
      email: 'lhc@example.com',
      phone: '0901234567',
      className: 'D23CQCN01',
      faculty: 'CNTT',
      gpa: 9.2,
    },
    {
      id: 'B23DCCC004',
      name: 'Phạm Thị D',
      dob: '20/10/2005',
      gender: 'Nữ',
      email: 'ptd@example.com',
      phone: '0912345678',
      className: 'D23CQCN03',
      faculty: 'CNTT',
      gpa: 6.8,
    },
    {
      id: 'B23DCCC005',
      name: 'Hoàng Văn E',
      dob: '08/08/2005',
      gender: 'Nam',
      email: 'hve@example.com',
      phone: '0923456789',
      className: 'D23CQCN02',
      faculty: 'CNTT',
      gpa: 4.5,
    }
  ]);

  const addStudent = (student: Student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (id: string, updatedStudent: Student) => {
    setStudents(students.map((s) => (s.id === id ? updatedStudent : s)));
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
