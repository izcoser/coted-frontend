// Profile.tsx

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import CustomButton from "./CustomButton";

const Profile: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const formattedAddress =
    isConnected && address
      ? `${address.slice(0, 4)}...${address.slice(-4)}`
      : "";

  if (isConnected) {
    return (
      <div className="flex flex-col items-center">
        <p className="font-mono font-bold text-base">
          Conectado a {formattedAddress}
        </p>
        <CustomButton
          title="Desconectar"
          containerStyles="ml-auto bg-green-300 rounded-xl shadow-xl"
          textStyles="text-black text-[16px] font-bold"
          handleClick={() => disconnect()}
        />
      </div>
    );
  }

  return (
    <CustomButton
      title="Conecte a Carteira"
      containerStyles="ml-auto bg-green-300 rounded-xl shadow-xl"
      textStyles="text-black text-[16px] font-bold"
      handleClick={() => connect()}
    />
  );
};

export default Profile;
