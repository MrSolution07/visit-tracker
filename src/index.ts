export interface ConsistencyRecord {
    totalDays: number;
    currentStreak: number;
    longestStreak: number;
    gaps: number;
    lastDate: string | null;
    daysUsed: string[];
    events: Record<string, number>;
  }
  
  const DEFAULT_KEY = 'consistency-key';
  
  /**
   * A tiny library to track how consistently users run your app
   * and how often they use specific features (e.g. button presses).
   */
  export class ConsistencyKey {
    private storage: Storage;
    private key: string;
  
    constructor(storage?: Storage, key: string = DEFAULT_KEY) {
      this.storage = storage || globalThis.localStorage;
      this.key = key;
    }
  
    private getToday(): string {
      return new Date().toISOString().split('T')[0];
    }
  
    private load(): ConsistencyRecord {
      const data = this.storage.getItem(this.key);
      if (!data) {
        return {
          totalDays: 0,
          currentStreak: 0,
          longestStreak: 0,
          gaps: 0,
          lastDate: null,
          daysUsed: [],
          events: {},
        };
      }
  
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('Failed to parse consistency data. Resetting.', e);
        return {
          totalDays: 0,
          currentStreak: 0,
          longestStreak: 0,
          gaps: 0,
          lastDate: null,
          daysUsed: [],
          events: {},
        };
      }
    }
  
    private save(record: ConsistencyRecord): void {
      this.storage.setItem(this.key, JSON.stringify(record));
    }
  
    markRun(): ConsistencyRecord {
      const today = this.getToday();
      const record = this.load();
  
      if (!record.daysUsed.includes(today)) {
        record.daysUsed.push(today);
        record.totalDays = record.daysUsed.length;
  
        if (record.lastDate) {
          const lastDate = new Date(record.lastDate);
          const diff = Math.floor(
            (new Date(today).getTime() - lastDate.getTime()) /
            (1000 * 60 * 60 * 24)
          );
  
          if (diff === 1) {
            record.currentStreak += 1;
          } else if (diff > 1) {
            record.currentStreak = 1;
            record.gaps += 1;
          }
        } else {
          record.currentStreak = 1;
        }
  
        if (record.currentStreak > record.longestStreak) {
          record.longestStreak = record.currentStreak;
        }
  
        record.lastDate = today;
        this.save(record);
      }
  
      return record;
    }
  
    getRecord(): ConsistencyRecord {
      return this.load();
    }
  
    getDaysUsed(): string[] {
      return this.load().daysUsed;
    }
  
    trackEvent(eventName: string): number {
      const record = this.load();
  
      if (!record.events[eventName]) {
        record.events[eventName] = 0;
      }
      record.events[eventName] += 1;
  
      this.save(record);
      return record.events[eventName];
    }
  
    getEventCount(eventName: string): number {
      const record = this.load();
      return record.events[eventName] || 0;
    }
  
    reset(): void {
      this.storage.removeItem(this.key);
    }
  }