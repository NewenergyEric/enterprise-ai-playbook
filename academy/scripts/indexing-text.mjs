/**
 * Lossy text extraction for search indexing and font character collection.
 * Input is trusted, repository-authored markup. This is NOT an HTML sanitizer:
 * output must remain text, never be inserted into HTML or assigned to innerHTML.
 * Spaces preserve word boundaries and avoid joining fragments across a tag.
 */
export function indexingText(markup) {
  return markup.replace(/<[^>]+>/g, ' ');
}
