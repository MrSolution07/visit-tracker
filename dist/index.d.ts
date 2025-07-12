export interface ConsistencyRecord {
    totalDays: number;
    currentStreak: number;
    longestStreak: number;
    gaps: number;
    lastDate: string | null;
    daysUsed: string[];
    events: Record<string, number>;
}
/**
 * A tiny library to track how consistently users run your app
 * and how often they use specific features (e.g. button presses).
 */
export declare class ConsistencyKey {
    private storage;
    private key;
    constructor(storage?: Storage, key?: string);
    private getToday;
    private load;
    private save;
    markRun(): ConsistencyRecord;
    getRecord(): ConsistencyRecord;
    getDaysUsed(): string[];
    trackEvent(eventName: string): number;
    getEventCount(eventName: string): number;
    reset(): void;
}
