export class Epoch {
    private readonly t: number;

    constructor(t?: Date | number | string) {
        // If t is undefined, then set to now
        if (!t) {
            this.t = toUnixEpoch(new Date());
            return;
        }

        // If t is a Date, then convert to epoch
        if (t instanceof Date) {
            this.t = toUnixEpoch(t);
            return;
        }

        // If t is a string, then parse as string using built-in new Date
        if (typeof t === "string") {
            // If string is empty, then set to now
            if (t === "") {
                this.t = toUnixEpoch(new Date());
                return;
            }

            // Parse string
            const d = new Date(t);
            this.t = toUnixEpoch(d);
            return;
        }

        // Else, set t
        this.t = t;
    }

    getDate(): Date {
        const d = new Date(0);
        d.setUTCSeconds(this.t);
        return d;
    }

    getEpoch(): number {
        return this.t;
    }

    add(sec: number): Epoch {
        return new Epoch(this.t + sec);
    }

    isGreaterThan(t: Date | Epoch): boolean {
        if (t instanceof Date) {
            t = new Epoch(t);
        }
        return this.t > t.getEpoch();
    }

    isGreaterThanEqual(t: Date | Epoch): boolean {
        if (t instanceof Date) {
            t = new Epoch(t);
        }
        return this.t >= t.getEpoch();
    }

    isLessThan(t: Date | Epoch): boolean {
        if (t instanceof Date) {
            t = new Epoch(t);
        }
        return this.t < t.getEpoch();
    }

    isLessThanEqual(t: Date | Epoch): boolean {
        if (t instanceof Date) {
            t = new Epoch(t);
        }
        return this.t <= t.getEpoch();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    toJSON() {
        return this.t;
    }

    static readonly MINUTE = 60;
    static readonly HOUR = 3600;
    static readonly DAY = 86400;
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
