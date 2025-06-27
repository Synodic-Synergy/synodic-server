import { Store } from '../store';
import type { Notice } from '~/types/notice';

class NoticeStore extends Store<Notice> {
  constructor() {
    super('notices');
  }

  async findActive(): Promise<Notice[]> {
    const now = new Date();
    const notices = await this.find({ isActive: true });
    return notices.filter(notice => notice.startDate <= now && notice.endDate >= now);
  }

  async findByAuthor(authorId: string): Promise<Notice[]> {
    return this.find({ authorId });
  }

  async findByCategory(category: Notice['category']): Promise<Notice[]> {
    return this.find({ category });
  }

  async findPinned(): Promise<Notice[]> {
    const activeNotices = await this.findActive();
    return activeNotices.filter(notice => notice.isPinned);
  }

  async findForUser(userId: string, userRole: string): Promise<Notice[]> {
    const activeNotices = await this.findActive();
    
    return activeNotices.filter(notice => {
      // Check target audience
      if (notice.targetAudience === 'all') return true;
      if (notice.targetAudience === userRole) return true;
      if (notice.targetAudience === 'specific' && notice.targetUsers?.includes(userId)) return true;
      
      return false;
    });
  }

  async markAsRead(noticeId: string, userId: string): Promise<boolean> {
    const notice = await this.findOne({ id: noticeId });
    if (!notice) return false;

    if (!notice.readBy.includes(userId)) {
      notice.readBy.push(userId);
      await this.update(noticeId, notice);
    }

    return true;
  }

  async getUnreadCount(userId: string, userRole: string): Promise<number> {
    const userNotices = await this.findForUser(userId, userRole);
    return userNotices.filter(notice => !notice.readBy.includes(userId)).length;
  }
}

export const noticeStore = new NoticeStore(); 