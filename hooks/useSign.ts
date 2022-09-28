import { useState, useCallback } from "react";
import { ethers } from "ethers";

export function useSign(baseProvider: any) {
  const [signature, setSignature] = useState<string | null>(null);

  const sign = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(baseProvider);
    const signer = provider.getSigner();
    const signature = await signer.signMessage("poyo");

    setSignature(signature);
  }, [baseProvider]);

  return { signature, sign };
}
