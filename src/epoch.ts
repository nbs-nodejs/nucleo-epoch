export class Epoch {
    private readonly t: number;
    private readonly dt: Date;

    constructor(t?: Date | number | string) {
        if (!t) {
            // If t is empty, then set to now
            this.dt = new Date();
        } else if (t instanceof Date) {
            // If t is a date, then set dt
            this.dt = t;
        } else if (typeof t === "string") {
            // If t is a string, then parse date string
            this.dt = new Date(t);
        } else {
            // Else t is epoch
            this.dt = toDate(t);
            this.t = t;
            return;
        }

        // Set epoch timestamp value
        this.t = toUnixEpoch(this.dt);
    }

    getDate(): Date {
        return this.dt;
    }

    getEpoch(): number {
        return this.t;
    }

    add(sec: number): Epoch {
        return new Epoch(this.t + sec);
    }

    isGreaterThan(t: Date | Epoch | number): boolean {
        if (typeof t === "number") {
            return this.t > t;
        }

        if (t instanceof Date) {
            t = new Epoch(t);
        }
        return this.t > t.getEpoch();
    }

    isGreaterThanEqual(t: Date | Epoch | number): boolean {
        if (typeof t === "number") {
            return this.t >= t;
        }

        if (t instanceof Date) {
            t = new Epoch(t);
        }
        return this.t >= t.getEpoch();
    }

    isLessThan(t: Date | Epoch | number): boolean {
        if (typeof t === "number") {
            return this.t < t;
        }

        if (t instanceof Date) {
            t = new Epoch(t);
        }
        return this.t < t.getEpoch();
    }

    isLessThanEqual(t: Date | Epoch | number): boolean {
        if (typeof t === "number") {
            return this.t <= t;
        }

        if (t instanceof Date) {
            t = new Epoch(t);
        }
        return this.t <= t.getEpoch();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    toJSON() {
        return this.t;
    }

    printYear(): string {
        return this.dt.getUTCFullYear().toString();
    }

    printMonth(): string {
        return (this.dt.getUTCMonth() + 1).toString().padStart(2, "0");
    }

    printDay(): string {
        return this.dt.getUTCDate().toString().padStart(2, "0");
    }

    printHours(): string {
        return this.dt.getUTCHours().toString().padStart(2, "0");
    }

    printMinutes(): string {
        return this.dt.getUTCMinutes().toString().padStart(2, "0");
    }

    printSeconds(): string {
        return this.dt.getUTCSeconds().toString().padStart(2, "0");
    }

    static readonly MINUTE = 60;
    static readonly HOUR = 3600;
    static readonly DAY = 86400;
}

export function toDate(t: number): Date {
    const dt = new Date(0);
    dt.setUTCSeconds(t);
    return dt;
}

export function toUnixEpoch(d: Date): number {
    return Math.round(d.getTime() / 1000);
}

export function since(t: Date | number): string {
    // If t is a Date, then convert to number
    if (t instanceof Date) {
        t = toUnixEpoch(t);
    }

    // Get elapsed seconds
    let secs = toUnixEpoch(new Date()) - t;

    // Get minutes
    let minutes = Math.floor(secs / 60);

    // Get hours
    let hours = Math.floor(minutes / 60);

    // Get days
    const days = Math.floor(hours / 24);

    // Init string
    let since = "";

    if (days > 0) {
        since += `${days}d `;
        hours = hours % 24;
    }

    if (hours > 0) {
        since += `${hours}h `;
        minutes = minutes % 60;
    }

    if (minutes > 0) {
        since += `${minutes}m `;
        secs = secs % 60;
    }

    since += `${secs}s`;

    return since;
}
