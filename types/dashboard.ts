export interface Course {
  id: string;
  title: string;
  description: string;
  studentCount?: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Assessment {
  id: string;
  title: string;
  dueDate: string;
  submissionCount?: number;
}

export interface Schedule {
  id: string;
  courseTitle: string;
  time: string;
  room: string;
  attendanceCount?: number;
}

export interface DashboardData {
  courses: Course[];
  pendingAssessments: Assessment[];
  newNotices: Notice[];
  activeNotices: Notice[];
  todayClasses: Schedule[];
  recentCourses: Course[];
  recentNotices: Notice[];
  upcomingAssessments: Assessment[];
  todaySchedule: Schedule[];
} 