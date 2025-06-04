"use client";
import React, { useEffect, useState } from "react";
import styles from "./LayoutClient.module.scss";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import {
  getICOContract,
  getStaking,
  getUSDCContract,
  getUSDTContract,
  getWeb3,
  openInMetaMaskMobile,
} from "@/utils/web3";
import { icoAbi, icoAddress } from "@/contract/ico";
import { useRouter } from "next/router";
import Web3 from "web3";
import { usdtAbi, usdtAddress } from "@/contract/usdt";
import { usdcAbi, usdcAddress } from "@/contract/usdc";
interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  setShowModal: any;
  detailValue: any;
  getValueByAddress: any;
  referAddres: any;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  setShowModal,
  detailValue,
  getValueByAddress,
  referAddres,
}) => {
  const [asset, setAsset] = useState<any>("");
  // const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
  // const web3 = new Web3(window.ethereum as any);
  let web3: any;
  if (typeof window !== "undefined" && window.ethereum) {
    web3 = new Web3(window.ethereum);
    // Rest of your code
  } else {
    console.error("Ethereum provider not found!");
  }
  const [hash, setHash] = useState<any>(null);
  const [dwtAmount, setDwtAmount] = useState("");
  const [referrerAddress, setReferrerAddress] = useState<any>("");
  const { isConnected, address } = useAccount();
  const [payableAmountFromWei, setPayableAmountFromWei] = useState<any>("");
  const [payableAmount, setPayableAmount] = useState<any>("");
  const [ownerAddress, setOwnerAddress] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const icoIntegrateContract = () => {
    const ico_Contract = new web3.eth.Contract(icoAbi, icoAddress);
    return ico_Contract;
  };
  const usdtIntegrateContract = () => {
    const usdt_Contract = new web3.eth.Contract(usdtAbi, usdtAddress);
    return usdt_Contract;
  };
  const usdcIntegrateContract = () => {
    const usdc_Contract = new web3.eth.Contract(usdcAbi, usdcAddress);
    return usdc_Contract;
  };
  useEffect(() => {
    if (router.isReady) {
      const referrerAddress = router.query["referr-address"];
      if (referrerAddress) {
        setReferrerAddress(referrerAddress);
      }
    }
  }, [router.isReady]);
  const getCalculateValue = async () => {
    try {
      const icoContract = icoIntegrateContract();
      const weiValue = web3?.utils.toWei(dwtAmount, "ether");
      if (dwtAmount) {
        if (asset == 0) {
          const previewBNB = await icoContract.methods
            .previewBNB(weiValue)
            .call();
          const humanReadable = web3.utils.fromWei(Number(previewBNB), "ether");
          setPayableAmountFromWei(humanReadable);
          setPayableAmount(Number(previewBNB));
        } else if (asset == 1) {
          const previewUSDC = await icoContract.methods
            .previewUSDC(weiValue)
            .call();
          const humanReadable = web3.utils.fromWei(
            Number(previewUSDC),
            "ether"
          );
          setPayableAmountFromWei(humanReadable);
          setPayableAmount(Number(previewUSDC));
        } else if (asset == 2) {
          const previewUSDT = await icoContract.methods
            .previewUSDT(weiValue)
            .call();
          const humanReadable = web3.utils.fromWei(
            Number(previewUSDT),
            "ether"
          );
          setPayableAmountFromWei(humanReadable);
          setPayableAmount(Number(previewUSDT));
        }
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  const getValue = async () => {
    try {
      const icoContract = icoIntegrateContract();
      const owner = await icoContract.methods.owner().call();
      setOwnerAddress(owner);
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleTokenPurchase = async (tokenContract: any, weiValue: any) => {
    const icoContract = icoIntegrateContract();
    const balance = await tokenContract.methods.balanceOf(address).call();
    const readableBalance = web3.utils.fromWei(balance, "ether");
    if (parseFloat(dwtAmount) > parseFloat(readableBalance)) {
      toast.error("Insufficient balance");
      return;
    }
    const addresss = referrerAddress
      ? referrerAddress
      : referAddres
      ? referAddres
      : "0x0000000000000000000000000000000000000000";
    const allowance = await tokenContract.methods
      .allowance(address, icoAddress)
      .call();
    const readableAllowance = web3.utils.fromWei(allowance, "ether");

    if (parseFloat(readableAllowance) < parseFloat(payableAmountFromWei)) {
      await tokenContract.methods
        .approve(icoAddress, payableAmount)
        .send({ from: address });
    }
    const gas = await icoContract.methods
      .buyTokens(weiValue, asset, addresss)
      .estimateGas({
        from: address,
        value: 0,
      });

    await icoContract.methods.buyTokens(weiValue, asset, addresss).send({
      from: address,
      value: "0",
      gas,
    });

    detailValue();
    getValueByAddress();
    toast.success("Purchase DogWalker Token Successfully!");
    resetForm();
  };
  const resetForm = () => {
    setDwtAmount("");
    setAsset("");
    // setReferrerAddress("");
    setPayableAmountFromWei("");
    setPayableAmount("");
    setShowModal(false);
  };
  const handleWrite = async () => {
    try {
      const icoContract = icoIntegrateContract();
      const usdtContract = usdtIntegrateContract();
      const usdcContract = usdcIntegrateContract();
      const web3 = await getWeb3();
      if (!dwtAmount) {
        setError(true);
        return;
      }

      setIsLoading(true);
      const weiValue = web3.utils.toWei(dwtAmount, "ether");
      const weiValueCal = web3.utils.toWei(0.000001, "ether");
      const calculateValue = Number(payableAmount) + Number(weiValueCal);
      if (asset == 0) {
        const addresss = referrerAddress
          ? referrerAddress
          // : referAddres
          // ? referAddres
          : "0x0000000000000000000000000000000000000000";
        const gas = await icoContract.methods
          .buyTokens(weiValue, asset, addresss)
          .estimateGas({
            from: address,
            value: calculateValue.toString(),
          });

        await icoContract.methods.buyTokens(weiValue, asset, addresss).send({
          from: address,
          value: calculateValue.toString(),
          gas, // Include estimated gas here
        });
        // await icoContract.methods.buyTokens(weiValue, asset, addresss).send({
        //   from: address,
        //   value: calculateValue.toString(),
        // });
        getValueByAddress();
        detailValue();
        resetForm();
        toast.success("Purchase DogWalker Token Successfully!");
      } else if (asset == 1) {
        await handleTokenPurchase(usdcContract, weiValue);
      } else if (asset == 2) {
        await handleTokenPurchase(usdtContract, weiValue);
      }
    } catch (error: any) {
      console.error("Transaction failed:", error);
      // alert(error);
      toast.error("Transaction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCalculateValue();
  }, [asset, dwtAmount]);
  useEffect(() => {
    getValue();
  }, []);

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={() => {
            setDwtAmount("");
            setAsset("");
            // setReferrerAddress("");
            setPayableAmountFromWei("");
            setPayableAmount("");
            setShowModal(false);
          }}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className={styles.modalBody}>
          <label>
            Select Asset:
            <select
              value={asset}
              onChange={(e) => {
                setAsset(e.target.value);
                setDwtAmount("");
                // setReferrerAddress("");
                setPayableAmountFromWei("");
                setPayableAmount("");
              }}
            >
              <option value="">Choose an option</option>
              <option value="0">BNB</option>
              <option value="1">USDC</option>
              <option value="2">USDT</option>
            </select>
          </label>

          {asset && (
            <>
              <label>
                DWT Amount
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={dwtAmount}
                  onChange={(e) => setDwtAmount(e.target.value)}
                />
                {error && !dwtAmount && (
                  <p style={{ color: "red", marginTop: "5px" }}>Enter Amount</p>
                )}
              </label>

              <label>
                Payable Amount:
                <input
                  type="number"
                  value={
                    payableAmountFromWei &&
                    Number(payableAmountFromWei).toFixed(8)
                  }
                  readOnly
                />
              </label>

              <label>
                Referrer Address:
                <input
                  type="text"
                  placeholder="Enter address"
                  value={
                    referrerAddress
                      ? referrerAddress
                      // : referAddres
                      // ? referAddres
                      : "0x0000000000000000000000000000000000000000"
                  }
                  readOnly
                  //   onChange={(e) => setReferrerAddress(e.target.value)}
                />
              </label>
            </>
          )}
        </div>

        {asset && (
          <button
            className={styles.submitButton}
            onClick={handleWrite}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Purchase Token"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PurchaseModal;
