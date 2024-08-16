// Generic interface for database clients
export interface DatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
