import { Store } from '../store';
import type { Course, CourseEnrollment, CourseProgress } from '~/types/course';

class CourseStore extends Store<Course> {
  constructor() {
    super('courses');
  }

  async findByTeacher(teacherId: string): Promise<Course[]> {
    return this.find({ teacherId });
  }

  async findByStudent(studentId: string): Promise<Course[]> {
    const allCourses = await this.find({});
    return allCourses.filter(course => course.students.includes(studentId));
  }

  async findActive(): Promise<Course[]> {
    return this.find({ status: 'active' });
  }

  async findByCategory(category: string): Promise<Course[]> {
    return this.find({ category });
  }

  async addStudentToCourse(courseId: string, studentId: string): Promise<boolean> {
    const course = await this.findOne({ id: courseId });
    if (!course) return false;

    if (course.students.includes(studentId)) return true; // already enrolled

    if (course.students.length >= course.maxStudents) return false; // course full

    course.students.push(studentId);
    course.studentCount = course.students.length;
    
    await this.update(courseId, course);
    return true;
  }

  async removeStudentFromCourse(courseId: string, studentId: string): Promise<boolean> {
    const course = await this.findOne({ id: courseId });
    if (!course) return false;

    const index = course.students.indexOf(studentId);
    if (index === -1) return false;

    course.students.splice(index, 1);
    course.studentCount = course.students.length;
    
    await this.update(courseId, course);
    return true;
  }

  async getCourseStats(courseId: string): Promise<{
    totalStudents: number;
    activeStudents: number;
    averageProgress: number;
    completionRate: number;
  }> {
    const course = await this.findOne({ id: courseId });
    if (!course) {
      throw new Error('Course not found');
    }

    // TODO: Implement progress tracking
    return {
      totalStudents: course.studentCount,
      activeStudents: course.studentCount, // placeholder
      averageProgress: 75, // placeholder
      completionRate: 85 // placeholder
    };
  }
}

export const courseStore = new CourseStore(); 