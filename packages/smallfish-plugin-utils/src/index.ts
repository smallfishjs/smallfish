export const isUrl = (url: string) => /^(http:|https:)?\/\//.test(url);

export default {
  isUrl,
}
