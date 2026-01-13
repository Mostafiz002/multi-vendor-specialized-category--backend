export const buildPrismaFilter = (filters: Record<string, any>) => {
  const where: Record<string, any> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      where[key] = value;
    }
  });

  return where;
};
