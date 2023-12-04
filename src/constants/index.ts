export const DEPLOY_TIME = 1701715438;

export const addresses: Record<string, `0x${string}`> = {
  PRICE_AGGREGATOR_ADDRESS: "0xe10c2e06f944cb1ddb18ca478534bf55015bfe20",
  PRE_TOKEN_ADDRESS: "0x0000000000000000000000000000000000000000",
  SELIC_TOKEN_ADDRESS: "0x0000000000000000000000000000000000000001",
  IPCA_TOKEN_ADDRESS: "0x0000000000000000000000000000000000000002",
};

export const CONTRACT_EXAMPLE: string = `
          pragma solidity 0.8.20;
          interface IPriceAggregator {
            struct FinalReport {
              uint256 avgApy;
              uint256 medApy;
              uint256 avgPrice;
              uint256 medPrice;
              uint256 timestamp;
              uint80 sources;
          }

            function getLatestRound(address token) external view returns (FinalReport memory priceReport);
          }

          contract GetPrice {
            address aggregator = 0xe10c2e06f944cb1ddb18ca478534bf55015bfe20;
            address tokenPrefixado = 0x0000000000000000000000000000000000000000;
            address tokenSelic = 0x0000000000000000000000000000000000000001;
            address tokenIpca = 0x0000000000000000000000000000000000000002;

            function getPrice(address token) external view {
                IPriceAggregator.PriceReport memory priceReport = IPriceAggregator(
                    aggregator
                ).getLatestRound(token);
                uint256 average = priceReport.avgPrice;
                uint256 median = priceReport.medPrice;
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
