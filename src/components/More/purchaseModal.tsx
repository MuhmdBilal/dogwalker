"use client";
import React, { useEffect, useState } from "react";
import styles from "./LayoutClient.module.scss";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import {
  getICOContract,
  getUSDCContract,
  getUSDTContract,
  getWeb3,
  openInMetaMaskMobile,
} from "@/utils/web3";
import { icoAddress } from "@/contract/ico";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  setShowModal: any;
  detailValue: any;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  setShowModal,
  detailValue,
}) => {
  const [asset, setAsset] = useState<any>("");
  const [hash, setHash] = useState<any>(null);
  const [dwtAmount, setDwtAmount] = useState("");
  const [referrerAddress, setReferrerAddress] = useState("");
  const { isConnected, address } = useAccount();
  const [usdcContract, setUsdcContract] = useState<any>(null);
  const [usdtContract, setUsdtContract] = useState<any>(null);
  const [web3, setWeb3] = useState<any>(null);
  const [ico, setIco] = useState<any>(null);
  const [payableAmountFromWei, setPayableAmountFromWei] = useState<any>("");
  const [payableAmount, setPayableAmount] = useState<any>("");
  const [ownerAddress, setOwnerAddress] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getCalculateValue = async () => {
    try {
      const weiValue = web3?.utils.toWei(dwtAmount, "ether");
      if (dwtAmount) {
        if (asset == 0) {
          const previewBNB = await ico.methods.previewBNB(weiValue).call();
          const humanReadable = web3.utils.fromWei(Number(previewBNB), "ether");
          setPayableAmountFromWei(humanReadable);
          setPayableAmount(Number(previewBNB));
        } else if (asset == 1) {
          const previewUSDC = await ico.methods.previewUSDC(weiValue).call();
          const humanReadable = web3.utils.fromWei(
            Number(previewUSDC),
            "ether"
          );
          setPayableAmountFromWei(humanReadable);
          setPayableAmount(Number(previewUSDC));
        } else if (asset == 2) {
          const previewUSDT = await ico.methods.previewUSDT(weiValue).call();
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
      const owner = await ico.methods.owner().call();
      setOwnerAddress(owner);
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleTokenPurchase = async (tokenContract: any, weiValue: any) => {
    const balance = await tokenContract.methods.balanceOf(address).call();
    const readableBalance = web3.utils.fromWei(balance, "ether");

    if (parseFloat(dwtAmount) > parseFloat(readableBalance)) {
      toast.error("Insufficient balance");
      return;
    }

    const allowance = await tokenContract.methods
      .allowance(address, icoAddress)
      .call();
    const readableAllowance = web3.utils.fromWei(allowance, "ether");

    if (parseFloat(readableAllowance) < parseFloat(payableAmountFromWei)) {
      await tokenContract.methods
        .approve(icoAddress, payableAmount)
        .send({ from: address });
    }

    await ico.methods.buyTokens(weiValue, asset, ownerAddress).send({
      from: address,
      value: 0,
    });
    detailValue();
    toast.success("Purchase DogWalker Token Successfully!");
    resetForm();
  };
  const resetForm = () => {
    setDwtAmount("");
    setAsset("");
    setReferrerAddress("");
    setPayableAmountFromWei("");
    setPayableAmount("");
    setShowModal(false);
  };
  const handleWrite = async () => {
    try {
      const web3 = await getWeb3();
    
    // Check if we're using fallback (no wallet connected)
    if (!(window as any).ethereum?.isConnected?.()) {
      // Mobile-specific handling
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        openInMetaMaskMobile();
        return;
      } else {
        toast.error('Please connect MetaMask first');
        return;
      }
    }
      if (!dwtAmount) {
        setError(true);
        return;
      }

      setIsLoading(true);
      const weiValue = web3.utils.toWei(dwtAmount, "ether");
      const calculateValue = payableAmount + 0.000001;
      if (asset == 0) {
        await ico.methods.buyTokens(weiValue, asset, ownerAddress).send({
          from: address,
          value: calculateValue,
        });
        detailValue();
        toast.success("Purchase DogWalker Token Successfully!");
      } else if (asset == 1) {
        await handleTokenPurchase(usdcContract, weiValue);
      } else if (asset == 2) {
        await handleTokenPurchase(usdtContract, weiValue);
      }
    } catch (error:any) {
      console.error("Transaction failed:", error);
      alert(error)
      toast.error("Transaction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //   const handleWrite = async () => {
  //     try {
  //       if (!dwtAmount) {
  //         setError(true);
  //         return;
  //       }
  //       setIsLoading(true);
  //       const weiValue = web3?.utils.toWei(dwtAmount, "ether");
  //       const calculateValue = payableAmount + 0.000001;
  //       if (asset == 0) {
  //         const buyTokens = await ico.methods
  //           .buyTokens(weiValue, asset, ownerAddress)
  //           .send({
  //             from: address,
  //             value: calculateValue,
  //           });
  //         if (buyTokens) {
  //           toast.success("Purchase DogWalker Token Successfully!");
  //         }
  //       } else if (asset == 1) {
  //         const previewBNB = await usdcContract.methods.balanceOf(address).call();
  //         const humanReadable = web3.utils.fromWei(Number(previewBNB), "ether");
  //         if (dwtAmount > humanReadable) {
  //           toast.error("Insufficient balance");
  //           return;
  //         }
  //         const allowance = await usdcContract.methods
  //           .allowance(address, icoAddress)
  //           .call();
  //         const allowanceFromWei = web3.utils.fromWei(Number(allowance), "ether");
  //         if (allowanceFromWei >= payableAmountFromWei) {
  //           const buyTokens = await ico.methods
  //             .buyTokens(weiValue, asset, ownerAddress)
  //             .send({
  //               from: address,
  //               value: 0,
  //             });
  //           if (buyTokens) {
  //             toast.success("Purchase DogWalker Token Successfully!");
  //           }
  //         } else {
  //           await usdcContract.methods.approve(icoAddress, payableAmount).send({
  //             from: address,
  //           });
  //           const buyTokens = await ico.methods
  //             .buyTokens(weiValue, asset, ownerAddress)
  //             .send({
  //               from: address,
  //               value: 0,
  //             });
  //           if (buyTokens) {
  //             toast.success("Purchase DogWalker Token Successfully!");
  //           }
  //         }
  //         setDwtAmount("");
  //         setAsset("");
  //         setReferrerAddress("");
  //         setPayableAmountFromWei("");
  //         setPayableAmount("");
  //         setShowModal(false);
  //       } else if (asset == 2) {
  //         const previewBNB = await usdtContract.methods.balanceOf(address).call();
  //         const humanReadable = web3.utils.fromWei(Number(previewBNB), "ether");
  //         if (dwtAmount > humanReadable) {
  //           toast.error("Insufficient balance");
  //           return;
  //         }
  //         const allowance = await usdtContract.methods
  //           .allowance(address, icoAddress)
  //           .call();
  //         const allowanceFromWei = web3.utils.fromWei(Number(allowance), "ether");
  //         if (allowanceFromWei >= payableAmountFromWei) {
  //           const buyTokens = await ico.methods
  //             .buyTokens(weiValue, asset, ownerAddress)
  //             .send({
  //               from: address,
  //               value: 0,
  //             });
  //           if (buyTokens) {
  //             toast.success("Purchase DogWalker Token Successfully!");
  //           }
  //         } else {
  //           await usdtContract.methods.approve(icoAddress, payableAmount).send({
  //             from: address,
  //           });
  //           const buyTokens = await ico.methods
  //             .buyTokens(weiValue, asset, ownerAddress)
  //             .send({
  //               from: address,
  //               value: 0,
  //             });
  //           if (buyTokens) {
  //             toast.success("Purchase DogWalker Token Successfully!");
  //           }
  //         }
  //         setDwtAmount("");
  //         setAsset("");
  //         setReferrerAddress("");
  //         setPayableAmountFromWei("");
  //         setPayableAmount("");
  //         setShowModal(false);
  //       }
  //     } catch (error) {
  //       console.error("Transaction failed:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  useEffect(() => {
    getCalculateValue();
  }, [asset, dwtAmount]);
  useEffect(() => {
    if (ico) {
      getValue();
    }
  }, [ico]);

  useEffect(() => {
    const loadContracts = async () => {
      const usdc = await getUSDCContract();
      const usdt = await getUSDTContract();
      const ico = await getICOContract();
      const web3 = await getWeb3();
      setUsdcContract(usdc);
      setUsdtContract(usdt);
      setIco(ico);
      setWeb3(web3);
    };
    loadContracts();
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
            setReferrerAddress("");
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
                setReferrerAddress("");
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
                  value={(ownerAddress as string) || ""}
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
