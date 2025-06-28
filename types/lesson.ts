export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string; // markdown content
  order: number;
  teacherId: string;
  teacherName: string;
  status: 'draft' | 'published' | 'archived';
  estimatedDuration: number; // in minutes
  resources: LessonResource[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonResource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'assignment' | 'quiz';
  url?: string;
  filePath?: string;
  description: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface LessonProgress {
  id: string;
  lessonId: string;
  studentId: string;
  isCompleted: boolean;
  completedAt?: Date;
  timeSpent: number; // in minutes
  lastAccessed: Date;
}

export interface LessonSubmission {
  id: string;
  lessonId: string;
  studentId: string;
  content: string;
  attachments: string[];
  submittedAt: Date;
  gradedAt?: Date;
  grade?: number;
  feedback?: string;
} 