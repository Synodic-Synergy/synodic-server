export interface Attendance {
  id: string;
  courseId: string;
  date: Date;
  students: AttendanceRecord[];
  takenBy: string;
  takenAt: Date;
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  courseId: string;
  lessonId?: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  lessonId?: string;
  teacherId: string;
  date: Date;
  startTime: string;
  endTime?: string;
  isActive: boolean;
  records: AttendanceRecord[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceStats {
  courseId: string;
  studentId: string;
  totalSessions: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRate: number; // percentage
  lastAttendance: Date;
}

export interface AttendanceReport {
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  totalSessions: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  tardy: number;
  attendanceRate: number; // percentage
  lastAttendance?: Date;
}

export interface AttendanceSettings {
  courseId: string;
  autoMarkAbsent: boolean;
  autoMarkAbsentMinutes: number; // minutes after class starts
  allowLateMarking: boolean;
  lateThresholdMinutes: number;
  requireReasonForAbsence: boolean;
  notifyOnAbsence: boolean;
} 