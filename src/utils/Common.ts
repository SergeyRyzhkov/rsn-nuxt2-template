export const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const copyToClipboard = (text) => {
  if (text) {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    return text;
  }
  return null;
};
