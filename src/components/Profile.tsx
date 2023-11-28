'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import CustomButton from "./CustomButton";

export default function Profile() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  return (
    <CustomButton
      title={"Conecte a Carteira"}
      containerStyles="w-30 h-10 m-8 rounded-full bg-green-400"
      textStyles="text-black text-[16px] font-bold"
      handleClick={() => connect()}
    />
  );
}