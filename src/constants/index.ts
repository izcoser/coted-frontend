export const DEPLOY_TIME = 1700776440;

export const addresses: Record<string, `0x${string}`> = {
  PRICE_AGGREGATOR_ADDRESS: "0x903d07fb501017e45d5a73ffba41aafa5413ef07",
  PRE_TOKEN_ADDRESS: "0x0000000000000000000000000000000000000000",
  SELIC_TOKEN_ADDRESS: "0x0000000000000000000000000000000000000001",
  IPCA_TOKEN_ADDRESS: "0x0000000000000000000000000000000000000002",
};

export const CONTRACT_EXAMPLE: string = `interface IPriceAggregator {
  struct PriceReport {
      uint256 unitPrice;
      uint256 timestamp;
      address by;
  }

  function getLatestCompletedRound(
      address token
  ) external view returns (PriceReport memory priceReport);
}

contract GetPrice {
  address aggregator = 0x903d07fb501017e45d5a73ffba41aafa5413ef07;
  address tokenPrefixado = 0x0000000000000000000000000000000000000000;
  address tokenSelic = 0x0000000000000000000000000000000000000001;
  address tokenIpca = 0x0000000000000000000000000000000000000002;

  function getPrice(address token) external view {
      IPriceAggregator.PriceReport memory priceReport = IPriceAggregator(
          aggregator
      ).getLatestCompletedRound(tokenPrefixado);
      uint256 price = priceReport.unitPrice;
      uint256 timestamp = priceReport.timestamp;
  }
}
`;

export const footerLinks = [
  {
    title: "Sobre",
    links: [
      { title: "Como funciona", url: "/" },
      { title: "Parcerias", url: "/" },
    ],
  },
  {
    title: "Tesouro Direto",
    links: [
      { title: "Preços e Taxas", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
    ],
  },
  {
    title: "Redes Sociais",
    links: [
      { title: "Discord", url: "/" },
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "Inova", url: "/" },
    ],
  },
];
