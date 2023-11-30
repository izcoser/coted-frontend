import { addresses, DEPLOY_TIME } from "@/constants";
import { priceAggregatorAbi } from "@/abis";
import { useContractReads } from "wagmi";
import { ReportProps } from "@/types";

type PartialCallObj = {
  address: `0x${string}`;
  abi: any;
  functionName: string;
};

type CallObj = PartialCallObj & {
  args: (string | number)[];
};

function getCurrentRound() {
  const roundTime = 7200;
  const now = (new Date() as any) / 1000;
  return Math.ceil((now - DEPLOY_TIME) / roundTime);
}

function createCallArray(
  tokenAddress: `0x${string}`,
  currentRound: number,
  partialCallObj: PartialCallObj
): Array<CallObj> {
  return Array.from(Array(currentRound).keys()).map((i) => ({
    ...partialCallObj,
    args: [tokenAddress, i],
  }));
}

function createCalls(): [Array<CallObj>, number] {
  const priceReport = {
    address: addresses.PRICE_AGGREGATOR_ADDRESS,
    abi: priceAggregatorAbi,
    functionName: "getTokenPriceReports",
  };

  const latestCompletedRound = {
    address: addresses.PRICE_AGGREGATOR_ADDRESS,
    abi: priceAggregatorAbi,
    functionName: "getLatestCompletedRound",
  };

  const currentRound = getCurrentRound();

  const preReportCalls = createCallArray(
    addresses.PRE_TOKEN_ADDRESS,
    currentRound,
    priceReport
  );
  const preLatestRoundCall = {
    ...latestCompletedRound,
    args: [addresses.PRE_TOKEN_ADDRESS],
  };

  const ipcaReportCalls = createCallArray(
    addresses.IPCA_TOKEN_ADDRESS,
    currentRound,
    priceReport
  );
  const ipcaLatestRoundCall = {
    ...latestCompletedRound,
    args: [addresses.IPCA_TOKEN_ADDRESS],
  };

  const selicReportCalls = createCallArray(
    addresses.SELIC_TOKEN_ADDRESS,
    currentRound,
    priceReport
  );
  const selicLatestRoundCall = {
    ...latestCompletedRound,
    args: [addresses.SELIC_TOKEN_ADDRESS],
  };

  const calls = preReportCalls
    .concat(ipcaReportCalls)
    .concat(selicReportCalls)
    .concat(preLatestRoundCall)
    .concat(ipcaLatestRoundCall)
    .concat(selicLatestRoundCall);

  return [calls, currentRound];
}

const parseReports = (data: any): ReportProps[] => {
  if (!data || !Array.isArray(data)) {
    console.error("Invalid data format or empty data.");
    return [];
  }

  let flattenedArray: ReportProps[] = [];

  data.forEach((item) => {
    if (item && item.result && Array.isArray(item.result)) {
      flattenedArray = flattenedArray.concat(
        item.result.map((subItem: any) => ({
          unitPrice: parseUnitPrice(subItem.unitPrice),
          date: epochToLabel(subItem.timestamp.toString()),
          timestamp: subItem.timestamp,
          by: subItem.by,
          status: item.status,
        }))
      );
    }
  });

  return flattenedArray;
};

function epochToLabel(epoch: number): string {
  const date = new Date(epoch * 1000);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, ${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s`;
}

export function parseUnitPrice(n: bigint): string {
  //@ts-ignore
  return n ? Number(n.toString() / 10 ** 8).toFixed(2) : 0;
}

export function usePrices() {
  const [calls, currentRound] = createCalls();
  const { data, isError, isLoading } = useContractReads({
    contracts: calls,
    //staleTime: 300_000,

    onSuccess(data) {
      console.log("Fetched data successfully", data);
    },
  });

  const dataPreReports = data?.slice(0, currentRound);
  const dataIpcaReports = data?.slice(currentRound, 2 * currentRound);
  const dataSelicReports = data?.slice(2 * currentRound, 3 * currentRound);

  const latestRounds = data?.slice(-3);
  const dataPreLatestRound = latestRounds?.[0];
  const dataIpcaLatestRound = latestRounds?.[1];
  const dataSelicLatestRound = latestRounds?.[2];

  const preReports = {
    reports: parseReports(dataPreReports),
    latestRound: dataPreLatestRound?.result as unknown as ReportProps,
  };
  const ipcaReports = {
    reports: parseReports(dataIpcaReports),
    latestRound: dataIpcaLatestRound?.result as unknown as ReportProps,
  };
  const selicReports = {
    reports: parseReports(dataSelicReports),
    latestRound: dataSelicLatestRound?.result as unknown as ReportProps,
  };

  return { preReports, ipcaReports, selicReports, isLoading, isError };
}
