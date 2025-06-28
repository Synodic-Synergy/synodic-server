import { Store } from '../store';
import type { Lesson, LessonProgress, LessonSubmission } from '~/types/lesson';

class LessonStore extends Store<Lesson> {
  constructor() {
    super('lessons');
  }

  async findByCourse(courseId: string): Promise<Lesson[]> {
    const lessons = await this.find({});
    return lessons.filter((lesson: Lesson) => lesson.courseId === courseId);
  }

  async findByTeacher(teacherId: string): Promise<Lesson[]> {
    const lessons = await this.find({});
    return lessons.filter((lesson: Lesson) => lesson.teacherId === teacherId);
  }

  async findByStatus(status: Lesson['status']): Promise<Lesson[]> {
    const lessons = await this.find({});
    return lessons.filter((lesson: Lesson) => lesson.status === status);
  }

  async getNextOrder(courseId: string): Promise<number> {
    const courseLessons = await this.findByCourse(courseId);
    if (courseLessons.length === 0) return 1;
    return Math.max(...courseLessons.map((lesson: Lesson) => lesson.order)) + 1;
  }

  async reorderLessons(courseId: string, lessonIds: string[]): Promise<void> {
    const lessons = await this.findByCourse(courseId);
    
    for (let i = 0; i < lessonIds.length; i++) {
      const lesson = lessons.find((l: Lesson) => l.id === lessonIds[i]);
      if (lesson) {
        lesson.order = i + 1;
        await this.update(lesson.id, lesson);
      }
    }
  }
}

class LessonProgressStore extends Store<LessonProgress> {
  constructor() {
    super('lesson-progress');
  }

  async findByStudent(studentId: string): Promise<LessonProgress[]> {
    const progress = await this.find({});
    return progress.filter((p: LessonProgress) => p.studentId === studentId);
  }

  async findByLesson(lessonId: string): Promise<LessonProgress[]> {
    const progress = await this.find({});
    return progress.filter((p: LessonProgress) => p.lessonId === lessonId);
  }

  async getStudentProgress(studentId: string, lessonId: string): Promise<LessonProgress | null> {
    const progress = await this.find({});
    return progress.find((p: LessonProgress) => p.studentId === studentId && p.lessonId === lessonId) || null;
  }

  async markComplete(studentId: string, lessonId: string): Promise<LessonProgress> {
    const existing = await this.getStudentProgress(studentId, lessonId);
    
    if (existing) {
      const updatedProgress: LessonProgress = {
        ...existing,
        isCompleted: true,
        completedAt: new Date(),
        lastAccessed: new Date()
      };
      const result = await this.update(existing.id, updatedProgress);
      if (!result) {
        throw new Error('Failed to update lesson progress');
      }
      return result;
    } else {
      const progress: LessonProgress = {
        id: crypto.randomUUID(),
        lessonId,
        studentId,
        isCompleted: true,
        completedAt: new Date(),
        timeSpent: 0,
        lastAccessed: new Date()
      };
      return await this.create(progress);
    }
  }
}

class LessonSubmissionStore extends Store<LessonSubmission> {
  constructor() {
    super('lesson-submissions');
  }

  async findByStudent(studentId: string): Promise<LessonSubmission[]> {
    const submissions = await this.find({});
    return submissions.filter((s: LessonSubmission) => s.studentId === studentId);
  }

  async findByLesson(lessonId: string): Promise<LessonSubmission[]> {
    const submissions = await this.find({});
    return submissions.filter((s: LessonSubmission) => s.lessonId === lessonId);
  }

  async getStudentSubmission(studentId: string, lessonId: string): Promise<LessonSubmission | null> {
    const submissions = await this.find({});
    return submissions.find((s: LessonSubmission) => s.studentId === studentId && s.lessonId === lessonId) || null;
  }
}

export const lessonStore = new LessonStore();
export const lessonProgressStore = new LessonProgressStore();
export const lessonSubmissionStore = new LessonSubmissionStore(); 