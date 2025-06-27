import { userStore } from '../utils/stores/userStore.js';
import { courseStore } from '../utils/stores/courseStore.js';
import { assessmentStore } from '../utils/stores/assessmentStore.js';
import { noticeStore } from '../utils/stores/noticeStore.js';
import { attendanceStore } from '../utils/stores/attendanceStore.js';
import { authService } from '../utils/auth.js';

async function initializeData() {
  console.log('Initializing sample data...');

  // Create admin user
  const adminPassword = await authService.hashPassword('admin123!');
  const admin = {
    id: crypto.randomUUID(),
    email: 'admin@synodic.edu',
    password: adminPassword,
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await userStore.create(admin);
  console.log('Created admin user');

  // Create staff users
  const staffPassword = await authService.hashPassword('staff123!');
  const staff1 = {
    id: crypto.randomUUID(),
    email: 'john.doe@synodic.edu',
    password: staffPassword,
    firstName: 'John',
    lastName: 'Doe',
    role: 'staff',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await userStore.create(staff1);

  const staff2 = {
    id: crypto.randomUUID(),
    email: 'jane.smith@synodic.edu',
    password: staffPassword,
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'staff',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await userStore.create(staff2);
  console.log('Created staff users');

  // Create student users
  const studentPassword = await authService.hashPassword('student123!');
  const students = [
    {
      id: crypto.randomUUID(),
      email: 'alice.johnson@synodic.edu',
      password: studentPassword,
      firstName: 'Alice',
      lastName: 'Johnson',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: crypto.randomUUID(),
      email: 'bob.wilson@synodic.edu',
      password: studentPassword,
      firstName: 'Bob',
      lastName: 'Wilson',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: crypto.randomUUID(),
      email: 'charlie.brown@synodic.edu',
      password: studentPassword,
      firstName: 'Charlie',
      lastName: 'Brown',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  for (const student of students) {
    await userStore.create(student);
  }
  console.log('Created student users');

  // Create courses
  const course1 = {
    id: crypto.randomUUID(),
    title: 'Introduction to Computer Science',
    description: 'A comprehensive introduction to programming and computer science fundamentals',
    content: '# Introduction to Computer Science\n\nThis course covers the basics of programming...',
    teacherId: staff1.id,
    teacherName: `${staff1.firstName} ${staff1.lastName}`,
    students: [students[0].id, students[1].id],
    studentCount: 2,
    resources: [],
    schedule: [
      {
        id: crypto.randomUUID(),
        dayOfWeek: 1, // Monday
        startTime: '09:00',
        endTime: '10:30',
        room: 'Room 101',
        type: 'lecture'
      },
      {
        id: crypto.randomUUID(),
        dayOfWeek: 3, // Wednesday
        startTime: '14:00',
        endTime: '15:30',
        room: 'Lab 201',
        type: 'lab'
      }
    ],
    status: 'active',
    category: 'Computer Science',
    level: 'beginner',
    maxStudents: 30,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await courseStore.create(course1);

  const course2 = {
    id: crypto.randomUUID(),
    title: 'Advanced Mathematics',
    description: 'Advanced mathematical concepts and problem-solving techniques',
    content: '# Advanced Mathematics\n\nThis course covers advanced mathematical topics...',
    teacherId: staff2.id,
    teacherName: `${staff2.firstName} ${staff2.lastName}`,
    students: [students[1].id, students[2].id],
    studentCount: 2,
    resources: [],
    schedule: [
      {
        id: crypto.randomUUID(),
        dayOfWeek: 2, // Tuesday
        startTime: '10:00',
        endTime: '11:30',
        room: 'Room 202',
        type: 'lecture'
      },
      {
        id: crypto.randomUUID(),
        dayOfWeek: 4, // Thursday
        startTime: '15:00',
        endTime: '16:30',
        room: 'Room 202',
        type: 'discussion'
      }
    ],
    status: 'active',
    category: 'Mathematics',
    level: 'intermediate',
    maxStudents: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await courseStore.create(course2);
  console.log('Created courses');

  // Create assessments
  const assessment1 = {
    id: crypto.randomUUID(),
    courseId: course1.id,
    title: 'Programming Fundamentals Quiz',
    description: 'A quiz covering basic programming concepts',
    type: 'quiz',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    maxScore: 100,
    weight: 20,
    instructions: 'Complete the quiz within the time limit. Show all your work.',
    attachments: [],
    status: 'published',
    allowLateSubmission: false,
    latePenalty: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await assessmentStore.create(assessment1);

  const assessment2 = {
    id: crypto.randomUUID(),
    courseId: course2.id,
    title: 'Calculus Assignment',
    description: 'Problem set on differential calculus',
    type: 'assignment',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    maxScore: 50,
    weight: 15,
    instructions: 'Solve all problems and show your work clearly.',
    attachments: [],
    status: 'published',
    allowLateSubmission: true,
    latePenalty: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await assessmentStore.create(assessment2);
  console.log('Created assessments');

  // Create notices
  const notice1 = {
    id: crypto.randomUUID(),
    title: 'Welcome to the New Academic Year',
    content: 'Welcome all students and staff to the new academic year! We have exciting things planned.',
    category: 'general',
    priority: 'medium',
    authorId: admin.id,
    authorName: `${admin.firstName} ${admin.lastName}`,
    targetAudience: 'all',
    targetRoles: [],
    targetUsers: [],
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isActive: true,
    isPinned: true,
    attachments: [],
    readBy: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await noticeStore.create(notice1);

  const notice2 = {
    id: crypto.randomUUID(),
    title: 'Library Hours Extended',
    content: 'The library will now be open until 10 PM on weekdays.',
    category: 'academic',
    priority: 'low',
    authorId: staff1.id,
    authorName: `${staff1.firstName} ${staff1.lastName}`,
    targetAudience: 'students',
    targetRoles: [],
    targetUsers: [],
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    isActive: true,
    isPinned: false,
    attachments: [],
    readBy: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await noticeStore.create(notice2);
  console.log('Created notices');

  // Create attendance records
  const attendance1 = {
    id: crypto.randomUUID(),
    courseId: course1.id,
    date: new Date(),
    students: [
      {
        studentId: students[0].id,
        studentName: `${students[0].firstName} ${students[0].lastName}`,
        status: 'present',
        notes: ''
      },
      {
        studentId: students[1].id,
        studentName: `${students[1].firstName} ${students[1].lastName}`,
        status: 'late',
        notes: 'Arrived 5 minutes late'
      }
    ],
    takenBy: staff1.id,
    takenAt: new Date(),
    notes: 'Good attendance overall'
  };
  await attendanceStore.create(attendance1);
  console.log('Created attendance records');

  console.log('Sample data initialization complete!');
  console.log('\nTest Accounts:');
  console.log('Admin: admin@synodic.edu / admin123!');
  console.log('Staff: john.doe@synodic.edu / staff123!');
  console.log('Student: alice.johnson@synodic.edu / student123!');
}

// Run the initialization
initializeData().catch(console.error); 