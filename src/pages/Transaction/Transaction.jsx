import { Flex } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Pagination from "../../components/Pagination";
import "./Transaction.css";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "../../components/Modal";
import TransactionTable from "../../components/TransactionTable";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import isEmptyArray from "../../hooks/isEmptyArrayCheck";
import useQueryParams from "../../hooks/useQueryParams";
import { EditIcon } from "lucide-react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Controller, set, useForm } from "react-hook-form";
import NotFoundComponent from "../../components/NotFoundComponent";
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
  const navigate = useNavigate();
  const { navigateWithParams } = useQueryParams();

  const [activePaymentMonth, setActivePaymentMonth] = useState(false);
  const [activePaymentMonthName, setActivePaymentMonthName] = useState();
  const [userData, setUserData] = useState();
  const [accountType, setAccountType] = useState("Current");
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
            console.log(res);
            setUserData(res.data.data);
          }
        })
        .catch((er) => console.log(er));
    }
  }, [userNameIdRoll]);

  const [paymentDetails, setPaymentDetails] = useState();
  // const [bankInfo, setBankInfo] = useState();
  // const [activeBankInfo, setActiveBankInfo] = useState(null);
  // const [selectBankInfo, setSelectBankInfo] = useState("");
  const [SelectBankInfoErr, setSelectBankInfoErr] = useState("");
  // For Pagination ___________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  // const [notBankInfo, setNotBankInfo] = useState(true);

  // const activeBankAndSelectBank = (id, data) => {
  //   setActiveBankInfo(id);
  //   setSelectBankInfo(data);
  // };
  useEffect(() => {
    setLoading(true);
    // Get Payment With Balance Month _____________________________________________
    if (userNameIdRoll) {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageItem}`
        )
        .then((res) => {
          if (res.status === 200) {
            setPaymentDetails(res.data.data);
            if (isEmptyArray(res.data.data)) setNotFound(true);
            setFilteredCount(res.data.filteredCount);
            setTotalPages(res.data.totalPages);
          }
        });
    }
    setLoading(false);
  }, [userNameIdRoll]);

  const [isOpen, setIsOpen] = useState(false);
  const withdrowBalance = () => {
    setSelectBankInfoErr("");
    if (userData?.balance?.amount < 5000) return;

    if (!bankInfo) {
      setSelectBankInfoErr("Please add Bank INFO first");
      return;
    }
    if (!userNameIdRoll) {
      setSelectBankInfoErr("Please Reload the page and try again");
      return;
    }
    axios
      .post(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/withdrawal/${userNameIdRoll[1]}`,
        bankInfo
      )
      .then((res) => {
        if (res.status == 200) {
          // setBankInfo(res.data.data)
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






  // const { userNameIdRoll } = useSelector((state) => state.userData);
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [bankInfo, setBankInfo] = useState();
  const [bankInfoReFetch, setBankInfoReFetch] = useState(1);
  const [notBankInfo, setNotBankInfo] = useState(true);
  useEffect(() => {
    if (userNameIdRoll) {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/bank-info/${userNameIdRoll[1]}`
        )
        .then((res) => {
          if (res.status == 200) {
            if (isEmptyArray(res.data.data)) {
              setNotBankInfo(false);
            } else {
              setNotBankInfo(true);
            }
            const bankData = res.data.data[0];
            setBankInfo(bankData);
            reset(bankData);
          }
        })
        .catch((er) => console.log(er));
    }
  }, [userNameIdRoll, bankInfoReFetch, reset]);

  // const [paymentMethod, setPaymentMethod] = useState("Bank Account");

  // const bankAccountType = watch("bankAccountType");
  const closeRef = useRef(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const onSubmit = (data) => {
    setSubmitLoading(true);
    if (bankInfo) {
      let payloadData = {
        ...data,
        // paymentMethod,
        masterUserId: userNameIdRoll[1],
        userName: userNameIdRoll[0],
        date: new Date().toISOString(),
      };
      axios
        .put(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/bank-info/${bankInfo._id}`,
          payloadData
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setBankInfoReFetch(bankInfoReFetch + 1);
            setSubmitLoading(false);
            closeRef.current?.click(); // close modal
          }
        });
    } else {
      let payloadData = {
        ...data,
        // paymentMethod,
        masterUserId: userNameIdRoll[1],
        userName: userNameIdRoll[0],
        date: new Date().toISOString(),
      };
      axios
        .post(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/bank-info`,
          payloadData
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setBankInfoReFetch(bankInfoReFetch + 1);
            navigate("/transaction/1/10/All");
          }
        });
    }
  };











  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="main-content">
      <h2 style={{ fontWeight: "500" }}>Transactions</h2>
      <div className="transaction_top_section">
        <div className="transaction-card">
          <div
            style={{ alignItems: "center" }}
            className="transaction-withdraw-div"
          >
            <div>
              <span>Total Balance</span>
              <h2 style={{fontSize: '32px', fontWeight: 'bold', marginTop: '10px'}}>&#8377; {userData?.balance?.amount || 0}</h2>
            </div>
            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
              <div className="transaction-withdraw-btn">
                <Dialog.Trigger className="theme-btn">Withdraw</Dialog.Trigger>
              </div>
              <Modal title="Withdraw Payment">
                <p className="modal-description">
                  Are you sure that you want to withdraw the amount to your
                  specified payment method ?
                </p>
                <p className="modal-description">Withdrawal Amount</p>
                <h1 style={{ fontWeight: "500", margin: 0 }}>
                  &#8377; {userData?.balance?.amount || 0}
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
                      {bankInfo?.bank_name}{" "}
                      {bankInfo?.payoneerID ? `Payoneer` : ""}
                      {bankInfo?.paypalID ? `Paypal` : ""}
                      {bankInfo?.bKashName}
                    </p>
                    <small>
                      {bankInfo?.account_number &&
                        `************${bankInfo?.account_number.slice(
                          -4
                        )}`}{" "}
                      {bankInfo?.payoneerEmail} {bankInfo?.paypalEmail}{" "}
                      {bankInfo?.bKashNumber &&
                        bankInfo?.bKashNumber.toSlice(-4)}
                    </small>
                  </div>
                )}
                {SelectBankInfoErr && (
                  <p style={{ color: "#ea3958" }}>{SelectBankInfoErr}</p>
                )}
                <br />

                {activePaymentMonth === false && (
                  <p style={{ color: "#ea3958" }}>
                    Withdrawal is not available this month.
                  </p>
                )}
                {userData?.balance?.amount < 5000 && (
                  <p style={{ color: "#ea3958" }}>
                    You can withdraw your balance only if it is more than ₹5000.
                  </p>
                )}
                <div className="d-flex">
                  <Dialog.Close className="modal-cancel-btn">
                    Cancel
                  </Dialog.Close>
                  {activePaymentMonth === true &&
                  userData?.balance?.amount > 5000 ? (
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
          </div>
        </div>
        <div className="transaction-card">
          <div className="bank_info_child_div">
            <p style={{ color: "#838383" }}>Bank Details</p>
            {notBankInfo ? (
              // <button
              //   onClick={() => navigate("/add-bank-info")}
              //   style={{
              //     padding: "5px 10px",
              //     color: "#EA3958",
              //     display: "flex",
              //     alignItems: "center",
              //     gap: "5px",
              //     background: "none",
              //     border: "1px solid #EA3958",
              //     borderRadius: "5px",
              //     cursor: "pointer",
              //   }}
              // >
              //   <EditIcon size={"16"} />
              //   Edit Bank
              // </button>
              <Dialog.Root>
                <Dialog.Trigger
                  style={{
                    padding: "5px 10px",
                    color: "#EA3958",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "none",
                    border: "1px solid #EA3958",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <EditIcon size={"16"} />
                  Edit Bank
                </Dialog.Trigger>

                <Modal title="Add Bank Details">
                  <p className="modal-description">
                    Add your payment details to receive the amount
                  </p>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form-container"
                    style={{ position: "relative" }}
                  >
                  <label
                    htmlFor=""
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      color: "#202020",
                    }}
                  >
                    Account Type *
                  </label>
                  <Controller
                    name="bankAccountType"
                    defaultValue="Savings"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioGroup.Root
                        className="radio-group"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <label className="radio-label">
                          <RadioGroup.Item className="radio-item" value="Savings" />
                          Savings
                        </label>
                        <label className="radio-label">
                          <RadioGroup.Item className="radio-item" value="Current" />
                          Current
                        </label>
                      </RadioGroup.Root>
                    )}
                  />
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      color: "#202020",
                    }}
                  >
                    Beneficiary Name *
                  </label>
                  <input
                    type="text"
                    name="Beneficiary Name"
                    {...register("account_holder_name", {
                        required: true,
                    })}
                    style={{ marginBottom: "16px", width: "100%" }}
                  />
                  {errors.account_holder_name && (
                    <span style={{ color: "#ea3958" }}>
                      Beneficiary Name Required *
                    </span>
                  )}
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      color: "#202020",
                    }}
                  >
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    name="Bank Name *"
                    {...register("bank_name", { required: true })}
                    style={{ marginBottom: "16px", width: "100%" }}
                  />
                  {errors.bank_name && (
                      <span style={{ color: "#ea3958" }}>
                        Bank Name Required *
                      </span>
                    )}
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      color: "#202020",
                    }}
                  >
                    Account No *
                  </label>
                  <input
                    type="text"
                    name="Account No"
                    {...register("account_number", { required: true })}
                    style={{ marginBottom: "16px", width: "100%" }}
                  />
                  {errors.account_number && (
                      <span style={{ color: "#ea3958" }}>
                        Account No Required
                      </span>
                    )}
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      color: "#202020",
                    }}
                  >
                    IFSC Code/Swift Code *
                  </label>
                  <input
                    type="text"
                    name="IFSC Code"
                    {...register("IFSC", { required: true })}
                    style={{ marginBottom: "16px", width: "100%" }}
                  />
                  {errors.IFSC && (
                      <span style={{ color: "#ea3958" }}>
                        IFSC Required
                      </span>
                    )}
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      color: "#202020",
                    }}
                  >
                    UPI ID/bKash
                  </label>
                  <input
                    type="text"
                    name="UPI Id"
                    {...register("upiId")}
                    style={{ marginBottom: "16px", width: "100%" }}
                  />
                  <button style={{
                    opacity: submitLoading ? 0.9 : 1,
                    cursor: submitLoading ? "not-allowed" : "pointer",
                  }} type="submit" className="close-button btn-spinner">{submitLoading && <span className="btn-spinner-span"></span>} Edit Bank Account</button>
                </form>

                {/* Hidden Dialog.Close for programmatic close */}
                  <Dialog.Close asChild>
                    <button ref={closeRef} style={{ display: "none" }} />
                  </Dialog.Close>
                  
                </Modal>
              </Dialog.Root>
            ) : (
              <button
                onClick={() => navigate("/add-bank-info")}
                style={{
                  padding: "5px 10px",
                  color: "#EA3958",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "none",
                  border: "1px solid #EA3958",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <EditIcon size={"16"} />
                Add Bank
              </button>
            )}
          </div>
          <div className="bank_info_parent_div">
            <div className="bank_info_child_div">
              <p style={{ color: "#838383", margin: "8px 0px" }}>
                Beneficiary name:
              </p>
              <p style={{ color: "#202020", margin: "8px 0px" }}>--</p>
            </div>
            <p style={{ flex: "1", color: "#838383", margin: "8px 0px" }}>
              {bankInfo?.account_holder_name}
            </p>
          </div>
          <div className="bank_info_parent_div">
            <div className="bank_info_child_div">
              <p style={{ color: "#838383", margin: "8px 0px" }}>Bank Name:</p>
              <p style={{ color: "#202020", margin: "8px 0px" }}>--</p>
            </div>
            <p style={{ flex: "1", color: "#838383", margin: "8px 0px" }}>
              {bankInfo?.bank_name}
            </p>
          </div>
          <div className="bank_info_parent_div">
            <div className="bank_info_child_div">
              <p style={{ color: "#838383", margin: "8px 0px" }}>Account No:</p>
              <p style={{ color: "#202020", margin: "8px 0px" }}>--</p>
            </div>
            <p style={{ flex: "1", color: "#838383", margin: "8px 0px" }}>
              {bankInfo?.account_number}
            </p>
          </div>
          <div className="bank_info_parent_div">
            <div className="bank_info_child_div">
              <p style={{ color: "#838383", margin: "8px 0px" }}>
                IFSC Code/Swift Code:
              </p>
              <p style={{ color: "#202020", margin: "8px 0px" }}>--</p>
            </div>
            <p style={{ flex: "1", color: "#838383", margin: "8px 0px" }}>
              {bankInfo?.IFSC}
            </p>
          </div>
          <div className="bank_info_parent_div">
            <div className="bank_info_child_div">
              <p style={{ color: "#838383", margin: "8px 0px" }}>
                UPI ID/bKash:
              </p>
              <p style={{ color: "#202020", margin: "8px 0px" }}>--</p>
            </div>
            <p style={{ flex: "1", color: "#838383", margin: "8px 0px" }}>
              {bankInfo?.upiId}
            </p>
          </div>
          {/* <div className="bank_info_parent_div">
            <div className="bank_info_child_div">
              <p style={{color: '#838383', margin: '8px 0px'}}>bKash:</p>
              <p style={{color: '#202020', margin: '8px 0px'}}>--</p>
            </div>
            <p style={{flex: '1', color: '#838383', margin: '8px 0px'}}>{bankInfo?.bKash}</p>
          </div> */}
        </div>
      </div>
      <br />
      {withdrawPageNotices &&
        withdrawPageNotices?.map((notice) => (
          <div key={notice._id} className="home-notice">
            <InfoCircledIcon />
            <p
              style={{
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
              dangerouslySetInnerHTML={{ __html: notice?.notice }}
            ></p>
          </div>
        ))}
      {paymentDetails && (
        <TransactionTable columns={transactionColumns} data={paymentDetails} />
      )}
      {
        isEmptyArray(paymentDetails) && <NotFoundComponent />
      }

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
