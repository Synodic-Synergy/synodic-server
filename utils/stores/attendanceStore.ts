import { Store } from '../store';
import type { Attendance, AttendanceReport } from '~/types/attendance';

class AttendanceStore extends Store<Attendance> {
  constructor() {
    super('attendance');
  }

  async findByCourse(courseId: string): Promise<Attendance[]> {
    return this.find({ courseId });
  }

  async findByDate(courseId: string, date: Date): Promise<Attendance | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const allAttendance = await this.find({ courseId });
    
    return allAttendance.find(record => {
      const recordDate = new Date(record.date);
      return recordDate >= startOfDay && recordDate <= endOfDay;
    }) || null;
  }

  async findByStudent(studentId: string, courseId?: string): Promise<Attendance[]> {
    const attendance = await this.find({});
    
    return attendance.filter(record => {
      if (courseId && record.courseId !== courseId) return false;
      return record.students.some(student => student.studentId === studentId);
    });
  }

  async getStudentAttendance(studentId: string, courseId: string): Promise<{
    totalSessions: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    tardy: number;
    attendanceRate: number;
  }> {
    const attendance = await this.findByStudent(studentId, courseId);
    
    let totalSessions = 0;
    let present = 0;
    let absent = 0;
    let late = 0;
    let excused = 0;
    let tardy = 0;

    attendance.forEach(record => {
      const studentRecord = record.students.find(s => s.studentId === studentId);
      if (studentRecord) {
        totalSessions++;
        switch (studentRecord.status) {
          case 'present':
            present++;
            break;
          case 'absent':
            absent++;
            break;
          case 'late':
            late++;
            break;
          case 'excused':
            excused++;
            break;
          case 'tardy':
            tardy++;
            break;
        }
      }
    });

    const attendanceRate = totalSessions > 0 ? ((present + excused) / totalSessions) * 100 : 0;

    return {
      totalSessions,
      present,
      absent,
      late,
      excused,
      tardy,
      attendanceRate
    };
  }

  async getCourseAttendanceReport(courseId: string): Promise<AttendanceReport[]> {
    const attendance = await this.findByCourse(courseId);
    const studentStats = new Map<string, AttendanceReport>();

    // Initialize student stats
    attendance.forEach(record => {
      record.students.forEach(student => {
        if (!studentStats.has(student.studentId)) {
          studentStats.set(student.studentId, {
            studentId: student.studentId,
            studentName: student.studentName,
            courseId,
            courseName: '', // TODO: Get from course store
            totalSessions: 0,
            present: 0,
            absent: 0,
            late: 0,
            excused: 0,
            tardy: 0,
            attendanceRate: 0,
            lastAttendance: undefined
          });
        }

        const stats = studentStats.get(student.studentId)!;
        stats.totalSessions++;
        
        switch (student.status) {
          case 'present':
            stats.present++;
            break;
          case 'absent':
            stats.absent++;
            break;
          case 'late':
            stats.late++;
            break;
          case 'excused':
            stats.excused++;
            break;
          case 'tardy':
            stats.tardy++;
            break;
        }

        if (student.timeIn && (!stats.lastAttendance || student.timeIn > stats.lastAttendance)) {
          stats.lastAttendance = student.timeIn;
        }
      });
    });

    // Calculate attendance rates
    studentStats.forEach(stats => {
      stats.attendanceRate = stats.totalSessions > 0 
        ? ((stats.present + stats.excused) / stats.totalSessions) * 100 
        : 0;
    });

    return Array.from(studentStats.values());
  }
}

export const attendanceStore = new AttendanceStore(); 