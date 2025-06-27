export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'quiz' | 'assignment' | 'exam' | 'project';
  dueDate: Date;
  maxScore: number;
  weight: number; // percentage of final grade
  instructions: string;
  attachments: AssessmentAttachment[];
  status: 'draft' | 'published' | 'closed';
  allowLateSubmission: boolean;
  latePenalty: number; // percentage penalty per day
  createdAt: Date;
  updatedAt: Date;
}

export interface AssessmentAttachment {
  id: string;
  title: string;
  type: 'document' | 'image' | 'video' | 'link';
  url?: string;
  filePath?: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface AssessmentSubmission {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: Date;
  submittedLate: boolean;
  lateDays: number;
  score?: number;
  maxScore: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late' | 'missing';
  attachments: SubmissionAttachment[];
  gradedBy?: string;
  gradedAt?: Date;
}

export interface SubmissionAttachment {
  id: string;
  title: string;
  type: 'document' | 'image' | 'video' | 'link';
  url?: string;
  filePath?: string;
  uploadedAt: Date;
}

export interface AssessmentQuestion {
  id: string;
  assessmentId: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'file-upload';
  options?: string[]; // for multiple choice
  correctAnswer?: string;
  points: number;
  order: number;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  studentId: string;
  startedAt: Date;
  completedAt?: Date;
  answers: AssessmentAnswer[];
  score?: number;
  maxScore: number;
  status: 'in-progress' | 'completed' | 'abandoned';
}

export interface AssessmentAnswer {
  questionId: string;
  answer: string;
  isCorrect?: boolean;
  points?: number;
} 