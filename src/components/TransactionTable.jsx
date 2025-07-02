import PropTypes from "prop-types";
import upImg from '../assets/icons/Received.png'
import downImg from '../assets/icons/Withdrawn.png'
import localDate from "../hooks/localDate";

const TransactionTable = ({ columns, data }) => {
  return (
    <div className="table-wrapper">
      <table className={`theme-table`}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr key={d._id}>
              <td>
                {
                  d?.type == 'Withdraw' ?
                  <div className={`transactions-type`}>
                    <img src={downImg} alt="" />
                    <p style={{ margin: "8px 0" }}>Withdrow {data?.type}</p>
                  </div> :
                  <div className={`transactions-type`}>
                    <img src={upImg} alt="" />
                    <p style={{ margin: "8px 0" }}>Received {data?.type}</p>
                  </div>
                }
              </td>
              <td>—</td>
              <td>{d?.type === 'Withdraw' ? '-': '+'} € {d?.amount}</td>
              <td><span className={`status ${d?.type === 'Withdraw' ? d?.status.toLowerCase() : 'Success'}`}>{d?.type === 'Withdraw' ? d?.status : 'Success'}</span></td>
              <td>{d?.type === 'Withdraw' ? localDate(d?.date) : d?.paymentReportDate}</td>
              <td>{d?.invoice ? <button>Invoice</button> : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TransactionTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TransactionTable;