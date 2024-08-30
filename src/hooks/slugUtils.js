// utils/slugUtils.js

/**
 * Generate a slug from a given title.
 * @param {string} title - The title to generate the slug from.
 * @returns {string} - The generated slug.
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove non-alphanumeric characters except hyphens
};
