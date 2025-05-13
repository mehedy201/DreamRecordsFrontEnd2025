import { Flex } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Pagination from "../../components/Pagination";
import "./Transaction.css";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import PropTypes from "prop-types";

const transactionColumns = [
  { label: "Type", key: "type" },
  { label: "Payment Method", key: "method" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "status" },
  { label: "Date", key: "date" },
  { label: "Action", key: "action" },
];

const renderTransactionCell = (key, row) => {
  if (key === "type") {
    return (
      <div className={`transactions-type ${row.type.toLowerCase()}`}>
        <img src={`src/assets/icons/${row.type}.png`} alt="" />
        <p style={{ margin: "8px 0" }}>{row.type}</p>
      </div>
    );
  }
  if (key === "method") {
    return (
      <div>
        {row.method}
        <p className="transaction-method-sample">{row.methoda_sample}</p>
      </div>
    );
  }
  if (key === "status") {
    return (
      <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
    );
  }
  if (key === "action") {
    return row.action === "Reject" ? (
      <Dialog.Root>
        <Dialog.Trigger className="reject-btn">
          <InfoCircledIcon />
          {row.action}
        </Dialog.Trigger>
        <Modal title="Payment Rejection Details">
          <p className="modal-description">
            If you want to claim a service request, please fill the details
            below.
          </p>
          <Dialog.Close className="close-button">Close</Dialog.Close>
        </Modal>
      </Dialog.Root>
    ) : (
      <button className="non-transjection-btn">{row.action}</button>
    );
  }
  return row[key];
};
const Transaction = ({ transactions }) => {
  return (
    <div className="main-content">
      <h2 style={{ fontWeight: "500" }}>Transactions</h2>
      <Flex className="page-heading">
        <div>
          <span>Total Balance</span>
          <h2>€0.00</h2>
        </div>
        <Dialog.Root>
          <Dialog.Trigger className="theme-btn">Withdraw</Dialog.Trigger>
          <Modal title="Withdraw Payment">
            <p className="modal-description">
              Are you sure that you want to withdraw the amount to your
              specified payment method ?
            </p>
            <p className="modal-description">Withdrawal Amount</p>
            <h1 style={{ fontWeight: "500", margin: 0 }}>₹500</h1>
            <p className="modal-description">Payment Method</p>
            <div className="modal-transaction-method">
              <p>Bank Account</p>
              <small>************2853</small>
            </div>
            <br />
            <div className="d-flex">
              <Dialog.Close className="modal-cancel-btn">Cancel</Dialog.Close>
              <Dialog.Close className="close-button">
                Yes, Withdraw
              </Dialog.Close>
            </div>
          </Modal>
        </Dialog.Root>
        {/* <button className="theme-btn">Withdraw</button> */}
      </Flex>
      <br />
      <div className="home-notice">
        <InfoCircledIcon />
        <p>
          You can withdraw your earnings during the withdrawal periods in
          February, May, August, and November.
        </p>
      </div>
      <Table
        columns={transactionColumns}
        data={transactions}
        renderCell={renderTransactionCell}
        className="transaction-table"
      />

      <Pagination />
    </div>
  );
};
export default Transaction;
Transaction.propTypes = {
  transactions: PropTypes.array.isRequired,
};
