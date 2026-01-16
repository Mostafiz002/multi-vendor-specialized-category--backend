export const generateUniqueSlug = async (
  baseSlug: string,
  model: any,
  field = "slug"
) => {
  let slug = baseSlug;
  let count = 1;

  while (await model.findUnique({ where: { [field]: slug } })) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
};
