// Generate unique IDs for various purposes
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};