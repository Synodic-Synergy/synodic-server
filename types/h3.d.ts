declare module 'h3' {
  export interface H3Event {
    node: {
      req: any;
      res: any;
    };
    context: any;
    path: string;
  }

  export function defineEventHandler(handler: (event: H3Event) => Promise<any> | any): any;
  export function readBody<T>(event: H3Event): Promise<T>;
  export function createError(options: { statusCode: number; message: string }): Error;
  export function getRequestHeader(event: H3Event, name: string): string | undefined;
} 