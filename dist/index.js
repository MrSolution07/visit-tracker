"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsistencyKey = void 0;
const DEFAULT_KEY = 'consistency-key';
/**
 * A tiny library to track how consistently users run your app
 * and how often they use specific features (e.g. button presses).
 */
class ConsistencyKey {
    constructor(storage, key = DEFAULT_KEY) {
        this.storage = storage || globalThis.localStorage;
        this.key = key;
    }
    getToday() {
        return new Date().toISOString().split('T')[0];
    }
    load() {
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
        return JSON.parse(data);
    }
    save(record) {
        this.storage.setItem(this.key, JSON.stringify(record));
    }
    markRun() {
        const today = this.getToday();
        const record = this.load();
        if (!record.daysUsed.includes(today)) {
            record.daysUsed.push(today);
            record.totalDays = record.daysUsed.length;
            if (record.lastDate) {
                const lastDate = new Date(record.lastDate);
                const diff = (new Date(today).getTime() - lastDate.getTime()) /
                    (1000 * 60 * 60 * 24);
                if (diff === 1) {
                    record.currentStreak += 1;
                }
                else if (diff > 1) {
                    record.currentStreak = 1;
                    record.gaps += 1;
                }
            }
            else {
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
    getRecord() {
        return this.load();
    }
    getDaysUsed() {
        return this.load().daysUsed;
    }
    trackEvent(eventName) {
        const record = this.load();
        if (!record.events[eventName]) {
            record.events[eventName] = 0;
        }
        record.events[eventName] += 1;
        this.save(record);
        return record.events[eventName];
    }
    getEventCount(eventName) {
        const record = this.load();
        return record.events[eventName] || 0;
    }
    reset() {
        this.storage.removeItem(this.key);
    }
}
exports.ConsistencyKey = ConsistencyKey;
