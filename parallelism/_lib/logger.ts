export const logger = {
  lastLog: 0,

  timeElapsed() {
    const now = performance.now();
    const elapsed = now - this.lastLog;
    this.lastLog = now;
    return `${Math.round(elapsed)} ms`;
  },

  logWorker: function (message: string) {
    console.log(`[${this.timeElapsed()}]    \t[Worker]    \t${message}`);
  },

  logQueue: function (message: string) {
    console.log(`[${this.timeElapsed()}]    \t[Queue]    \t${message}`);
  }
}