export interface Course {
  id: string;
  title: string;
  description: string;
  content: string; // markdown content
  teacherId: string;
  teacherName: string;
  students: string[]; // student IDs
  studentCount: number;
  resources: CourseResource[];
  schedule: CourseSchedule[];
  status: 'active' | 'inactive' | 'draft';
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  maxStudents: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseResource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'assignment';
  url?: string;
  filePath?: string;
  description: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface CourseSchedule {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  room: string;
  type: 'lecture' | 'lab' | 'discussion' | 'exam';
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: Date;
  status: 'active' | 'dropped' | 'completed';
  grade?: string;
  progress: number; // 0-100
}

export interface CourseProgress {
  courseId: string;
  studentId: string;
  completedLessons: string[];
  completedAssignments: string[];
  overallProgress: number;
  lastAccessed: Date;
} 