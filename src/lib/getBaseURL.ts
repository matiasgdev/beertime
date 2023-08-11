export const getBaseURL = (trailingPath = ''): URL => {
  const url = new URL(`/v2/beers${trailingPath}`, 'https://api.punkapi.com');
  return url;
};
