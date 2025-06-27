import { Store } from '../store';
import type { Assessment, AssessmentSubmission } from '~/types/assessment';

class AssessmentStore extends Store<Assessment> {
  constructor() {
    super('assessments');
  }

  async findByCourse(courseId: string): Promise<Assessment[]> {
    return this.find({ courseId });
  }

  async findPublished(): Promise<Assessment[]> {
    return this.find({ status: 'published' });
  }

  async findUpcoming(): Promise<Assessment[]> {
    const now = new Date();
    const assessments = await this.find({ status: 'published' });
    return assessments.filter(assessment => assessment.dueDate > now);
  }

  async findOverdue(): Promise<Assessment[]> {
    const now = new Date();
    const assessments = await this.find({ status: 'published' });
    return assessments.filter(assessment => assessment.dueDate < now);
  }

  async getSubmissionStats(assessmentId: string): Promise<{
    totalStudents: number;
    submitted: number;
    graded: number;
    late: number;
    missing: number;
    averageScore: number;
  }> {
    // TODO: Implement submission tracking
    return {
      totalStudents: 25,
      submitted: 20,
      graded: 18,
      late: 3,
      missing: 5,
      averageScore: 85
    };
  }
}

export const assessmentStore = new AssessmentStore(); 