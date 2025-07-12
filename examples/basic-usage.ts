// examples/basic-usage.ts
// this is a memory storage for the browser we just simulate for testing purposes
class MemoryStorage implements Storage {
    private store: Record<string, string> = {};
  
    get length(): number {
      return Object.keys(this.store).length;
    }
  
    clear(): void {
      this.store = {};
    }
  
    key(index: number): string | null {
      const keys = Object.keys(this.store);
      return keys[index] ?? null;
    }
  
    getItem(key: string): string | null {
      return this.store[key] ?? null;
    }
  
    setItem(key: string, value: string): void {
      this.store[key] = value;
    }
  
    removeItem(key: string): void {
      delete this.store[key];
    }
  }
  
  import { ConsistencyKey } from '../src';
  
  const memoryStorage = new MemoryStorage();
  const tracker = new ConsistencyKey(memoryStorage);
  
  tracker.markRun();
  tracker.trackEvent('open_settings');
  
  console.log(tracker.getRecord());
  console.log(`'open_settings' used: ${tracker.getEventCount('open_settings')}`);