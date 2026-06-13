let counter = 0;

export function generateId(prefix = 'id') {
  counter += 1;
  return `${prefix}-${counter}-${Date.now().toString(36)}`;
}
