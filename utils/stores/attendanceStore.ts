import { Store } from '../store';
import type { AttendanceRecord, AttendanceSession, AttendanceStats } from '~/types/attendance';

class AttendanceRecordStore extends Store<AttendanceRecord> {
  constructor() {
    super('attendance-records');
  }

  async findByCourse(courseId: string): Promise<AttendanceRecord[]> {
    const records = await this.find({});
    return records.filter((record: AttendanceRecord) => record.courseId === courseId);
  }

  async findByStudent(studentId: string): Promise<AttendanceRecord[]> {
    const records = await this.find({});
    return records.filter((record: AttendanceRecord) => record.studentId === studentId);
  }

  async findByDate(date: Date): Promise<AttendanceRecord[]> {
    const records = await this.find({});
    const targetDate = date.toDateString();
    return records.filter((record: AttendanceRecord) => new Date(record.date).toDateString() === targetDate);
  }

  async findByCourseAndDate(courseId: string, date: Date): Promise<AttendanceRecord[]> {
    const records = await this.findByCourse(courseId);
    const targetDate = date.toDateString();
    return records.filter((record: AttendanceRecord) => new Date(record.date).toDateString() === targetDate);
  }

  async getStudentAttendanceStats(courseId: string, studentId: string): Promise<AttendanceStats> {
    const records = await this.findByCourse(courseId);
    const studentRecords = records.filter((record: AttendanceRecord) => record.studentId === studentId);
    
    const totalSessions = studentRecords.length;
    const presentCount = studentRecords.filter((r: AttendanceRecord) => r.status === 'present').length;
    const absentCount = studentRecords.filter((r: AttendanceRecord) => r.status === 'absent').length;
    const lateCount = studentRecords.filter((r: AttendanceRecord) => r.status === 'late').length;
    const excusedCount = studentRecords.filter((r: AttendanceRecord) => r.status === 'excused').length;
    
    const attendanceRate = totalSessions > 0 ? (presentCount / totalSessions) * 100 : 0;
    const lastAttendance = studentRecords.length > 0 
      ? new Date(Math.max(...studentRecords.map((r: AttendanceRecord) => new Date(r.date).getTime())))
      : new Date();

    return {
      courseId,
      studentId,
      totalSessions,
      presentCount,
      absentCount,
      lateCount,
      excusedCount,
      attendanceRate,
      lastAttendance
    };
  }
}

class AttendanceSessionStore extends Store<AttendanceSession> {
  constructor() {
    super('attendance-sessions');
  }

  async findByCourse(courseId: string): Promise<AttendanceSession[]> {
    const sessions = await this.find({});
    return sessions.filter((session: AttendanceSession) => session.courseId === courseId);
  }

  async findByTeacher(teacherId: string): Promise<AttendanceSession[]> {
    const sessions = await this.find({});
    return sessions.filter((session: AttendanceSession) => session.teacherId === teacherId);
  }

  async getActiveSession(courseId: string): Promise<AttendanceSession | null> {
    const sessions = await this.findByCourse(courseId);
    return sessions.find((session: AttendanceSession) => session.isActive) || null;
  }

  async endSession(sessionId: string): Promise<AttendanceSession> {
    const session = await this.findOne({ id: sessionId });
    if (!session) {
      throw new Error('Session not found');
    }
    
    const updatedSession: AttendanceSession = {
      ...session,
      isActive: false,
      endTime: new Date().toISOString(),
      updatedAt: new Date()
    };
    
    const result = await this.update(sessionId, updatedSession);
    if (!result) {
      throw new Error('Failed to end attendance session');
    }
    return result;
  }
}

export const attendanceRecordStore = new AttendanceRecordStore();
export const attendanceSessionStore = new AttendanceSessionStore(); 