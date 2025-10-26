import isEmptyArray from "../hooks/isEmptyArrayCheck";
import emptyImg from "../assets/Empty.png";

const AnalyticsPageTableDSPandTerritoryTable = ({ columns, data }) => {
  return (
    <div className="table-wrapper AnalyticsPg-territoryTable">
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
                {d?.dsp}
                {d?.territory}
              </td>
              <td>{d?.streams}</td>
              <td>{d?.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
          {
            isEmptyArray(data) && 
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img style={{height: '200px', width: 'auto'}} src={emptyImg} alt="" />
            </div>
          }
    </div>
  );
};

export default AnalyticsPageTableDSPandTerritoryTable;
