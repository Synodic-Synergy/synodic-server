declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    ADMIN_SETUP_KEY: string;
    DATA_ENCRYPTION_KEY: string;
    PORT?: string;
    NODE_ENV?: 'development' | 'production';
  }
} 