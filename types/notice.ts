export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'academic' | 'event' | 'emergency' | 'reminder';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  authorId: string;
  authorName: string;
  targetAudience: 'all' | 'students' | 'staff' | 'admin' | 'specific';
  targetRoles?: string[]; // specific roles to target
  targetUsers?: string[]; // specific user IDs
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isPinned: boolean;
  attachments: NoticeAttachment[];
  readBy: string[]; // user IDs who have read this notice
  createdAt: Date;
  updatedAt: Date;
}

export interface NoticeAttachment {
  id: string;
  title: string;
  type: 'document' | 'image' | 'video' | 'link';
  url?: string;
  filePath?: string;
  uploadedAt: Date;
}

export interface NoticeRead {
  id: string;
  noticeId: string;
  userId: string;
  readAt: Date;
}

export interface NoticeCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
} 