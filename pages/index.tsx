import { useSignTypedData } from "../hooks/useSignTypedData";
import { useProvider } from "../hooks/useProvider";
import { useSign } from "../hooks/useSign";

export default function Home() {
  const { setIsMetaMask, isMetaMask, address, provider } = useProvider();
  const { sign, signature: signature2 } = useSign(provider);

  const { signUsingEthers, signUsingWeb3, signature } =
    useSignTypedData(provider);

  return (
    <div>
      <div>
        <fieldset>
          <legend>Select provider:</legend>

          <div>
            <input
              type="radio"
              id="metamask"
              value="metamask"
              onChange={() => setIsMetaMask(true)}
              checked={isMetaMask}
            />
            <label htmlFor="metamask">MetaMask</label>
          </div>
          <div>
            <input
              type="radio"
              id="kms"
              value="kms"
              onChange={() => setIsMetaMask(false)}
              checked={!isMetaMask}
            />
            <label htmlFor="kms">KMS</label>
          </div>
        </fieldset>
      </div>
      <div>
        {address ? (
          <div>connected</div>
        ) : (
          <button onClick={() => signUsingEthers()}>Connect</button>
        )}
        <div>address: {address}</div>
      </div>

      <div>
        <div>signature: {signature2}</div>
        <button onClick={() => sign()}>Sign</button>
      </div>
      <div>
        <div>typed signature: {signature}</div>
        <button onClick={() => signUsingEthers()}>Sign using ethers</button>
        <button onClick={() => signUsingWeb3()}>Sign using web3</button>
      </div>
    </div>
  );
}
