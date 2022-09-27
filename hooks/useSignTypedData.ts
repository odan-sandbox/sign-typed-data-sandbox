import { ethers } from "ethers";
import Web3 from "web3";
import { useCallback, useState } from "react";

export function useSignTypedData() {
  const domain = {
    name: "Ether Mail",
    version: "1",
    chainId: 1,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  };

  // The named list of all type definitions
  const types = {
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "string" },
    ],
  };

  // The data to sign
  const value = {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  };

  const [signature, setSignature] = useState(null);

  const signUsingEthers = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer._signTypedData(domain, types, value);
    setSignature(signature);

    console.log("ethers", signature);
  }, []);

  const signUsingWeb3 = useCallback(async () => {
    const web3 = new Web3(window.ethereum as any);

    const provider = web3.currentProvider as any;

    const accounts = await web3.eth.getAccounts();

    const msgParams = JSON.stringify({
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        ...types,
      },
      domain,
      primaryType: "Mail",
      message: value,
    });
    const from = accounts[0];

    const signature = await provider.request({
      method: "eth_signTypedData_v4",
      params: [from, msgParams],
    });
    setSignature(signature);

    console.log("web3", signature);
  }, []);

  return { signUsingEthers, signUsingWeb3, signature };
}
