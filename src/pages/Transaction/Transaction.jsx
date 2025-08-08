import { Flex } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Pagination from "../../components/Pagination";
import "./Transaction.css";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "../../components/Modal";
import TransactionTable from "../../components/TransactionTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import isEmptyArray from "../../hooks/isEmptyArrayCheck";
import useQueryParams from "../../hooks/useQueryParams";

const transactionColumns = [
  { label: "Type", key: "type" },
  { label: "Payment Method", key: "method" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "status" },
  { label: "Date", key: "date" },
  { label: "Action", key: "action" },
];

const Transaction = () => {
  const { userNameIdRoll } = useSelector((state) => state.userData);
  const { pageNumber, perPageItem, status } = useParams();
  const { navigateWithParams } = useQueryParams();

  const [activePaymentMonth, setActivePaymentMonth] = useState(false);
  const [activePaymentMonthName, setActivePaymentMonthName] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    // Active Payment Month _____________________________________________
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/active-payment-month/66d80b32544c7126feb39661`
      )
      .then((res) => {
        if (res.status === 200) {
          setActivePaymentMonthName(res.data.data);
          res.data.data.activeMonth.map((activeMonth) => {
            if (activeMonth === month) {
              setActivePaymentMonth(true);
            }
          });
        }
      });

    // UserData With Balance Month _____________________________________________
    if (userNameIdRoll) {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`
        )
        .then((res) => {
          if (res.status == 200) {
            setUserData(res.data.data);
          }
        })
        .catch((er) => console.log(er));
    }
  }, [userNameIdRoll]);

  const [paymentDetails, setPaymentDetails] = useState();
  const [bankInfo, setBankInfo] = useState();
  const [activeBankInfo, setActiveBankInfo] = useState(null);
  const [selectBankInfo, setSelectBankInfo] = useState("");
  const [SelectBankInfoErr, setSelectBankInfoErr] = useState("");
  // For Pagination ___________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const activeBankAndSelectBank = (id, data) => {
    setActiveBankInfo(id);
    setSelectBankInfo(data);
  };
  useEffect(() => {
    setLoading(true);
    // Get Payment With Balance Month _____________________________________________
    if (userNameIdRoll) {
      axios
        .get(`https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageItem}`)
        .then((res) => {
          if (res.status === 200) {
            setPaymentDetails(res.data.data);
            if (isEmptyArray(res.data.data)) setNotFound(true);
            setFilteredCount(res.data.filteredCount);
            setTotalPages(res.data.totalPages);
            console.log(res.data.data);
          }
        });
      axios
        .get(`https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/bank-info/${userNameIdRoll[1]}`)
        .then((res) => {
          if (res.status == 200) {
            setBankInfo(res.data.data[0]);
          }
        })
        .catch((er) => console.log(er));
    }
    setLoading(false);
  }, [userNameIdRoll]);

  const [isOpen, setIsOpen] = useState(false);
  const withdrowBalance = () => {
    setSelectBankInfoErr("");
    if (userData?.balance?.amount < 5000 ) return;


    if (!bankInfo) {
      setSelectBankInfoErr("Please add Bank INFO first");
      return;
    }
    if (!userNameIdRoll) {
      setSelectBankInfoErr("Please Reload the page and try again");
      return;
    }
    axios
      .post(`https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/withdrawal/${userNameIdRoll[1]}`,bankInfo)
      .then((res) => {
        if (res.status == 200) {
          // setBankInfo(res.data.data)
          console.log(res);
          toast.success(res.data.message);
          setIsOpen(false);
        }
      })
      .catch((er) => console.log(er));
  };

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/transaction/${page}/${perPageItem}/${status}`);
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    console.log("object");
    navigateWithParams(`/transaction/${pageNumber}/${perPageItem}/${status}`);
  };

  // Withdraw page Notice_______________________________
  const [withdrawPageNotices, setWithdrawPageNotices] = useState();
  useEffect(() => {
    axios
      .get(
        "https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/settings/withdraw-page-notice"
      )
      .then((res) => {
        setWithdrawPageNotices(res.data.data);
      });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="main-content">
      <h2 style={{ fontWeight: "500" }}>Transactions</h2>
      <Flex className="page-heading">
        <div>
          <span>Total Balance</span>
          <h2>&#8377; {userData?.balance?.amount}</h2>
        </div>
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger className="theme-btn">Withdraw</Dialog.Trigger>
          <Modal title="Withdraw Payment">
            <p className="modal-description">
              Are you sure that you want to withdraw the amount to your
              specified payment method ?
            </p>
            <p className="modal-description">Withdrawal Amount</p>
            <h1 style={{ fontWeight: "500", margin: 0 }}>
              &#8377; {userData?.balance?.amount}
            </h1>
            <p className="modal-description">Payment Method</p>
            {/* {
              bankInfo && 
              bankInfo.map(bank =>
              <div key={bank._id} onClick={() => activeBankAndSelectBank(bank._id, bank)} style={{marginBottom: '5px',cursor: 'pointer', border: activeBankInfo == bank._id ? '2px solid #ea3958' : 'none'}} className="modal-transaction-method">
                <p>{bank?.bank_name} {bank?.payoneerID ? `Payoneer`: ''}{bank?.paypalID ? `Paypal`: ''}{bank?.bKashName}</p>
                <small>{bank?.account_number && `************${bank?.account_number.slice(-4)}`} {bank?.payoneerEmail} {bank?.paypalEmail} {bank?.bKashNumber && bank?.bKashNumber.toSlice(-4)}</small>
              </div>
              )
            } */}
            {bankInfo && (
              <div
                key={bankInfo._id}
                style={{ marginBottom: "5px", cursor: "pointer" }}
                className="modal-transaction-method"
              >
                <p>
                  {bankInfo?.bank_name} {bankInfo?.payoneerID ? `Payoneer` : ""}
                  {bankInfo?.paypalID ? `Paypal` : ""}
                  {bankInfo?.bKashName}
                </p>
                <small>
                  {bankInfo?.account_number &&
                    `************${bankInfo?.account_number.slice(-4)}`}{" "}
                  {bankInfo?.payoneerEmail} {bankInfo?.paypalEmail}{" "}
                  {bankInfo?.bKashNumber && bankInfo?.bKashNumber.toSlice(-4)}
                </small>
              </div>
            )}
            {SelectBankInfoErr && (
              <p style={{ color: "#ea3958" }}>{SelectBankInfoErr}</p>
            )}
            <br />

            {
              userData?.balance?.amount < 5000  && 
              <p style={{ color: "#ea3958" }}>
                You can withdraw your balance only if it is more than ₹5000.
              </p>
            }
            <div className="d-flex">
              <Dialog.Close className="modal-cancel-btn">Cancel</Dialog.Close>
              {(activePaymentMonth === true && userData?.balance?.amount > 5000) ? (
                <button onClick={withdrowBalance} className="close-button">
                  Yes, Withdraw
                </button>
              ) : (
                <button disabled className="close-button">
                  Can't Withdraw
                </button>
              )}
              {/* <button onClick={withdrowBalance} className="close-button">Yes, Withdraw</button> */}
            </div>
          </Modal>
        </Dialog.Root>
      </Flex>
      <br />
      {withdrawPageNotices &&
        withdrawPageNotices?.map((notice) => (
          <div key={notice._id} className="home-notice">
            <InfoCircledIcon />
            <p dangerouslySetInnerHTML={{ __html: notice?.notice }}></p>
          </div>
        ))}
      {paymentDetails && (
        <TransactionTable columns={transactionColumns} data={paymentDetails} />
      )}

      <Pagination
        totalDataCount={filteredCount}
        totalPages={totalPages}
        currentPage={currentPage}
        perPageItem={perPageItem}
        setCurrentPage={setCurrentPage}
        handlePageChange={handlePageChange}
        customFunDropDown={handlePerPageItem}
      />
    </div>
  );
};
export default Transaction;
