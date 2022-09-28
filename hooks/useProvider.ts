import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { KmsProvider } from "aws-kms-provider";
import type { Provider } from "ethereum-protocol";

const keyId = "e9005048-475f-4767-9f2d-0d1fb0c89caf";
const endpoint = "https://goerli.infura.io/v3/bd35010d62134981a9e82dff4708728b";

export function useProvider() {
  const [address, setAddress] = useState("");
  const [isMetaMask, setIsMetaMask] = useState(true);
  const [provider, setProvider] = useState<Provider | typeof window.ethereum>();

  useEffect(() => {
    if (isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      provider.listAccounts().then((accounts) => {
        setAddress(accounts[0]);
      });
      setProvider(window.ethereum);
    } else {
      const provider = new KmsProvider(endpoint, {
        keyIds: [keyId],
        region: "us-east-1",
        credential: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
        },
      });

      provider.getAccounts().then((accounts) => {
        setAddress(accounts[0]);
      });
      setProvider(provider);
    }
  }, [isMetaMask]);

  return { address, isMetaMask, setIsMetaMask, provider };
}
