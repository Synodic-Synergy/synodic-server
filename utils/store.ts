import { promises as fs } from 'fs';
import path from 'path';
import { encrypt, decrypt } from './encryption';

const DATA_DIR = path.join(process.cwd(), 'data');
const ENCRYPTION_KEY = process.env.DATA_ENCRYPTION_KEY || '';

if (!ENCRYPTION_KEY) {
  throw new Error('DATA_ENCRYPTION_KEY environment variable is required');
}

export class Store<T> {
  private filePath: string;

  constructor(collection: string) {
    this.filePath = path.join(DATA_DIR, `${collection}.json`);
  }

  private async ensureDirectory() {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  private async readFile(): Promise<T[]> {
    try {
      await this.ensureDirectory();
      const data = await fs.readFile(this.filePath, 'utf-8');
      return decrypt(data, ENCRYPTION_KEY);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  private async writeFile(data: T[]): Promise<void> {
    await this.ensureDirectory();
    const encrypted = encrypt(data, ENCRYPTION_KEY);
    await fs.writeFile(this.filePath, encrypted);
  }

  async find(filter: Partial<T>): Promise<T[]> {
    const data = await this.readFile();
    return data.filter(item => 
      Object.entries(filter).every(([key, value]) => 
        item[key as keyof T] === value
      )
    );
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    const data = await this.readFile();
    return data.find(item => 
      Object.entries(filter).every(([key, value]) => 
        item[key as keyof T] === value
      )
    ) || null;
  }

  async create(item: Omit<T, 'id'> & { id?: string }): Promise<T> {
    const data = await this.readFile();
    const newItem = {
      ...item,
      id: item.id || crypto.randomUUID()
    } as T;
    data.push(newItem);
    await this.writeFile(data);
    return newItem;
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const data = await this.readFile();
    const index = data.findIndex(item => (item as any).id === id);
    if (index === -1) return null;

    const updatedItem = {
      ...data[index],
      ...updates,
      updatedAt: new Date()
    };
    data[index] = updatedItem;
    await this.writeFile(data);
    return updatedItem;
  }

  async delete(id: string): Promise<boolean> {
    const data = await this.readFile();
    const index = data.findIndex(item => (item as any).id === id);
    if (index === -1) return false;

    data.splice(index, 1);
    await this.writeFile(data);
    return true;
  }
} 