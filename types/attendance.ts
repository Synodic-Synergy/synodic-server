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
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late' | 'excused' | 'tardy';
  timeIn?: Date;
  timeOut?: Date;
  notes?: string;
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