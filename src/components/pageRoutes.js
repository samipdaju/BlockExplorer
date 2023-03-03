const pageRoutes = {
  dashboard: "/",
  blockDetails: "/block-details",
  transactionDetails: "/transaction-details",
  singleBlock: "/block",
  addressDetails: "/address-details",
};

const formatAsChildRoute = (url, parentUrl) => {
  return url.replace(parentUrl, "").substring(1);
};

export { pageRoutes, formatAsChildRoute };
