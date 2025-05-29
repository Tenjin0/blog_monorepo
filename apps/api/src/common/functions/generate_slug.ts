export function generateSlug(title: string): string {
  return title.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
}
