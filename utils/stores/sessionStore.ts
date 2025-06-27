import { Store } from '../store';
import type { AuthSession } from '~/types/auth';

class SessionStore extends Store<AuthSession> {
  constructor() {
    super('sessions');
  }

  async findByUserId(userId: string): Promise<AuthSession[]> {
    return this.find({ userId });
  }

  async findBySessionId(sessionId: string): Promise<AuthSession | null> {
    return this.findOne({ id: sessionId });
  }

  async findByRefreshToken(refreshToken: string): Promise<AuthSession | null> {
    return this.findOne({ refreshToken });
  }

  async findActiveSessions(userId: string): Promise<AuthSession[]> {
    const sessions = await this.findByUserId(userId);
    return sessions.filter(session => session.isActive && session.expiresAt > new Date());
  }

  async deactivateSession(sessionId: string): Promise<boolean> {
    const session = await this.findBySessionId(sessionId);
    if (!session) return false;

    await this.update(sessionId, { isActive: false });
    return true;
  }

  async deactivateAllUserSessions(userId: string): Promise<number> {
    const sessions = await this.findActiveSessions(userId);
    let deactivatedCount = 0;

    for (const session of sessions) {
      await this.update(session.id, { isActive: false });
      deactivatedCount++;
    }

    return deactivatedCount;
  }

  async cleanupExpiredSessions(): Promise<number> {
    const allSessions = await this.find({});
    const now = new Date();
    let deletedCount = 0;

    for (const session of allSessions) {
      if (session.expiresAt < now) {
        await this.delete(session.id);
        deletedCount++;
      }
    }

    return deletedCount;
  }

  async createSession(sessionData: Omit<AuthSession, 'id' | 'createdAt'>): Promise<AuthSession> {
    return this.create({
      ...sessionData,
      createdAt: new Date()
    });
  }

  async updateSessionActivity(sessionId: string): Promise<boolean> {
    const session = await this.findBySessionId(sessionId);
    if (!session) return false;

    // Extend session by 7 days
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 7);

    await this.update(sessionId, { 
      expiresAt: newExpiresAt
    });
    return true;
  }

  async getSessionStats(userId: string): Promise<{
    totalSessions: number;
    activeSessions: number;
    expiredSessions: number;
  }> {
    const sessions = await this.findByUserId(userId);
    const now = new Date();

    return {
      totalSessions: sessions.length,
      activeSessions: sessions.filter(s => s.isActive && s.expiresAt > now).length,
      expiredSessions: sessions.filter(s => s.expiresAt <= now).length
    };
  }
}

export const sessionStore = new SessionStore(); 