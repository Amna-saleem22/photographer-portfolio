export function generateAutoCaption(imageSrc, category = 'Photography') {
  if (!imageSrc) return { alt: 'Gallery Image', caption: 'Photography' };
  
  const filename = imageSrc.split('/').pop();
  const nameWithoutExt = filename.split('.').slice(0, -1).join(' ');
  const cleanName = nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\d+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const titleCase = cleanName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const isGeneric = cleanName.length < 3 || /^(img|dsc)$/i.test(cleanName);
  
  if (isGeneric) {
    return {
      alt: `${category} portfolio image by Alexandre Studio`,
      caption: category
    };
  }

  return {
    alt: `${titleCase} — ${category} by Alexandre Studio`,
    caption: titleCase
  };
}