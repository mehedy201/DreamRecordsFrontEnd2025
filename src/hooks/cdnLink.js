export const cdnLink = (key) => {
  const cdnBase =
    import.meta.env.VITE_CDN_BASE_URL ||
    process.env.REACT_APP_CDN_BASE_URL ||
    "";

  if (!key) return "";
  // console.log('link', `${cdnBase.replace(/\/$/, "")}/${key.replace(/^\//, "")}`)
  return `${cdnBase.replace(/\/$/, "")}/${key.replace(/^\//, "")}`;
};