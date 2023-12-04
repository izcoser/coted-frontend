import { Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";

const ActualValue = ({ lastDate, lastValue, lastApy, lastTimestamp }: any) => {
  const [remaining, setRemaining] = useState<string>("00:00:00");

  useEffect(() => {
    const interval = setInterval(
      () => setRemaining(calculateRemainingTime(Number(lastTimestamp))),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-start">
      <div className="max-w-md border-2 rounded-xl bg-white shadow-lg mx-2 p-4 space-y-4">
        <div className="flex flex-row space-x-2 items-center">
          <h2 className="text-lg font-bold">Taxa média</h2>
          <Tooltip
            content={
              <span className="max-w-[32ch] block text-justify">
                Taxa média (rendimento anual) calculado a partir de 3
                fornecedores independentes.
              </span>
            }
            placement="right"
            style={"light"}
            className=""
          >
            <button type="button" className="">
              <img src="https://smartcontract.imgix.net/icons/info.svg?auto=compress%2Cformat" />
            </button>
          </Tooltip>
        </div>
        <p className="text-gray-700 font-bold text-center">{`${lastApy}%`}</p>
      </div>

      <div className="max-w-md border-2 rounded-xl bg-white shadow-lg mx-2 p-4 space-y-4">
        <div className="flex flex-row space-x-2 items-center">
          <h2 className="text-lg font-bold">Valor Unitário Atual</h2>
          <Tooltip
            content={
              <span className="max-w-[32ch] block text-justify">
                Valor médio calculado a partir de 3 fornecedores independentes.
              </span>
            }
            placement="right"
            style={"light"}
            className=""
          >
            <button type="button" className="">
              <img src="https://smartcontract.imgix.net/icons/info.svg?auto=compress%2Cformat" />
            </button>
          </Tooltip>
        </div>
        <p className="text-gray-700 font-bold text-center">{`R$ ${lastValue}`}</p>
      </div>

      <div className="max-w-md border-2 rounded-xl bg-white shadow-lg mx-2 p-4 space-y-4">
        <div className="flex flex-row space-x-2 items-center">
          <h2 className="text-lg font-bold">Última Atualização</h2>
          <Tooltip
            content={
              <span className="max-w-[32ch] block text-justify">
                Esta é a data da última atualização do preço do título on-chain.
              </span>
            }
            placement="right"
            style={"light"}
            className=""
          >
            <button type="button" className="">
              <img src="https://smartcontract.imgix.net/icons/info.svg?auto=compress%2Cformat" />
            </button>
          </Tooltip>
        </div>
        <p className="text-gray-700 font-bold text-center">{lastDate}</p>
      </div>

      <div className="max-w-md border-2 rounded-xl bg-white shadow-lg mx-2 p-4 space-y-4">
        <div className="flex flex-row space-x-2 items-center">
          <h2 className="text-lg font-bold">Respostas dos Oráculos</h2>
          <Tooltip
            content={
              <span className="max-w-[32ch] block text-justify">
                O número de oráculos que forneceu dados para este título nas
                últimas 2 horas. O cálculo do preço médio requer no mínimo 3
                oráculos.
              </span>
            }
            placement="right"
            style={"light"}
            className=""
          >
            <button type="button" className="">
              <img src="https://smartcontract.imgix.net/icons/info.svg?auto=compress%2Cformat" />
            </button>
          </Tooltip>
        </div>
        <p className="text-gray-700  font-bold text-center">3/3</p>
      </div>

      <div className="max-w-md border-2 rounded-xl bg-white shadow-lg mx-2 p-4 space-y-4">
        <div className="flex flex-row space-x-2 items-center">
          <h2 className="text-lg font-bold">Tempo Até a Próxima Atualização</h2>
          <Tooltip
            content={
              <span className="max-w-[32ch] block text-justify">
                Uma nova média de preços e taxas é calculada e escrita onchain a
                cada 30 minutos, desde que no mínimo 3 oráculos tenham reportado
                preços.
              </span>
            }
            placement="right"
            style={"light"}
            className=""
          >
            <button type="button" className="">
              <img src="https://smartcontract.imgix.net/icons/info.svg?auto=compress%2Cformat" />
            </button>
          </Tooltip>
        </div>
        <p className="text-gray-700 font-bold text-center">{remaining}</p>
      </div>
    </div>
  );
};

function formatTime(seconds: number) {
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = [padZero(minutes), padZero(remainingSeconds)].join(":");

  return formattedTime;
}

function padZero(number: number) {
  return number.toString().padStart(2, "0");
}

function calculateRemainingTime(unixTimestamp: number) {
  const now = Math.floor(Date.now() / 1000);
  const difference = 1800 - (now - unixTimestamp);
  if (difference <= 0) {
    return "00:00:00";
  }

  return formatTime(difference);
}

export default ActualValue;
