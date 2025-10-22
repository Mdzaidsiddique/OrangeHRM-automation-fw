export const Helpers = {
  generateRandomName(prefix = 'Emp') {
    return `${prefix}_${Math.floor(Math.random() * 10000)}`;
  },

  getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  },

  log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
};
