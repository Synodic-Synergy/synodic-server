import { Store } from '../store';
import type { User } from '~/types/user';

class UserStore extends Store<User> {
  constructor() {
    super('users');
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }

  async isAdminExists(): Promise<boolean> {
    const admin = await this.findOne({ role: 'admin' });
    return !!admin;
  }
}

export const userStore = new UserStore(); 