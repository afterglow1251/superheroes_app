export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidId = (id: string): boolean => {
  return /^[0-9]+$/.test(id);
};
