
const AnalyticsPageTableDSPandTerritoryTable = ({columns, data}) => {
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
                        <td>{d?.dsp}{d?.territory}</td>
                        <td>{d?.streams}</td>
                        <td>{d?.revenue}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnalyticsPageTableDSPandTerritoryTable;