import { Store } from '../store';
import type { LoginAttempt } from '~/types/auth';

class LoginAttemptStore extends Store<LoginAttempt> {
  constructor() {
    super('login_attempts');
  }

  async findByEmail(email: string): Promise<LoginAttempt[]> {
    return this.find({ email });
  }

  async findByIP(ipAddress: string): Promise<LoginAttempt[]> {
    return this.find({ ipAddress });
  }

  async getRecentAttempts(email: string, timeWindow: number): Promise<LoginAttempt[]> {
    const attempts = await this.findByEmail(email);
    const cutoffTime = new Date(Date.now() - timeWindow);
    
    return attempts.filter(attempt => attempt.timestamp > cutoffTime);
  }

  async getRecentAttemptsByIP(ipAddress: string, timeWindow: number): Promise<LoginAttempt[]> {
    const attempts = await this.findByIP(ipAddress);
    const cutoffTime = new Date(Date.now() - timeWindow);
    
    return attempts.filter(attempt => attempt.timestamp > cutoffTime);
  }

  async recordAttempt(attemptData: Omit<LoginAttempt, 'id' | 'timestamp'>): Promise<LoginAttempt> {
    return this.create({
      ...attemptData,
      timestamp: new Date()
    });
  }

  async isAccountLocked(email: string, maxAttempts: number, lockoutDuration: number): Promise<{
    isLocked: boolean;
    remainingTime?: number;
    attemptsRemaining?: number;
  }> {
    const recentAttempts = await this.getRecentAttempts(email, lockoutDuration);
    const failedAttempts = recentAttempts.filter(attempt => !attempt.success);

    if (failedAttempts.length >= maxAttempts) {
      const oldestAttempt = failedAttempts[failedAttempts.length - 1];
      const lockoutEndTime = new Date(oldestAttempt.timestamp.getTime() + lockoutDuration);
      const remainingTime = Math.max(0, lockoutEndTime.getTime() - Date.now());

      return {
        isLocked: remainingTime > 0,
        remainingTime: remainingTime > 0 ? remainingTime : undefined
      };
    }

    return {
      isLocked: false,
      attemptsRemaining: maxAttempts - failedAttempts.length
    };
  }

  async isIPBlocked(ipAddress: string, maxAttempts: number, lockoutDuration: number): Promise<{
    isBlocked: boolean;
    remainingTime?: number;
    attemptsRemaining?: number;
  }> {
    const recentAttempts = await this.getRecentAttemptsByIP(ipAddress, lockoutDuration);
    const failedAttempts = recentAttempts.filter(attempt => !attempt.success);

    if (failedAttempts.length >= maxAttempts) {
      const oldestAttempt = failedAttempts[failedAttempts.length - 1];
      const lockoutEndTime = new Date(oldestAttempt.timestamp.getTime() + lockoutDuration);
      const remainingTime = Math.max(0, lockoutEndTime.getTime() - Date.now());

      return {
        isBlocked: remainingTime > 0,
        remainingTime: remainingTime > 0 ? remainingTime : undefined
      };
    }

    return {
      isBlocked: false,
      attemptsRemaining: maxAttempts - failedAttempts.length
    };
  }

  async cleanupOldAttempts(maxAge: number): Promise<number> {
    const allAttempts = await this.find({});
    const cutoffTime = new Date(Date.now() - maxAge);
    let deletedCount = 0;

    for (const attempt of allAttempts) {
      if (attempt.timestamp < cutoffTime) {
        await this.delete(attempt.id);
        deletedCount++;
      }
    }

    return deletedCount;
  }

  async getSecurityStats(email: string, timeWindow: number): Promise<{
    totalAttempts: number;
    successfulAttempts: number;
    failedAttempts: number;
    successRate: number;
    lastAttempt?: Date;
  }> {
    const attempts = await this.getRecentAttempts(email, timeWindow);
    const successfulAttempts = attempts.filter(a => a.success).length;
    const failedAttempts = attempts.filter(a => !a.success).length;

    return {
      totalAttempts: attempts.length,
      successfulAttempts,
      failedAttempts,
      successRate: attempts.length > 0 ? (successfulAttempts / attempts.length) * 100 : 0,
      lastAttempt: attempts.length > 0 ? attempts[attempts.length - 1].timestamp : undefined
    };
  }
}

export const loginAttemptStore = new LoginAttemptStore(); 