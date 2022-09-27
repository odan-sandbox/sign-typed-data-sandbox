import { ethers } from "ethers";
import { useState, useEffect } from "react";

import { useSignTypedData } from "../hooks/useSignTypedData";

export default function Home() {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.listAccounts().then((accounts) => {
      setAddress(accounts[0]);
    });
  }, []);

  const { signUsingEthers, signUsingWeb3, signature } = useSignTypedData();

  return (
    <div>
      <div>
        {address ? (
          <div>connected</div>
        ) : (
          <button onClick={() => signUsingEthers()}>Connect</button>
        )}
        <div>address: {address}</div>
      </div>

      <div>
        <div>signature: {signature}</div>
        <button onClick={() => signUsingEthers()}>Sign using ethers</button>
        <button onClick={() => signUsingWeb3()}>Sign using web3</button>
      </div>
    </div>
  );
}
