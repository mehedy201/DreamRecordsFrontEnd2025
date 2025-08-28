import { Link } from 'react-router-dom';
import releasePlaceHolderImg from '../assets/release-placeholder.png'

const AnalyticsPageTopReleaseTable = ({columns, data}) => {

    return (
        <div className="table-wrapper">
            <table className="theme-table">
                <thead>
                <tr>
                    {columns.map((col, index) => (
                    <th key={index}>{col.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data?.map((d) => (
                    <tr key={d?._id}>
                    <td>
                        <Link
                        to={`/release/${d._id}`}
                        style={{ color: "#1C2024", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '10px' }}
                        >
                        <img
                            src={d?.imgUrl ? d.imgUrl : releasePlaceHolderImg}
                            alt=""
                            style={{ borderRadius: "6px", width: '30px', height: '30px',}}
                        />
                        <div>
                            <p style={{margin: '0px'}}>
                            {d?.releaseTitle?.length > 22
                                ? d?.releaseTitle.slice(0, 22) + "..."
                                : d?.releaseTitle}
                            </p>
                            <small style={{color: '#838383'}}>
                            {
                                [...new Set(
                                d?.tracks?.flatMap(track =>
                                    track?.artist?.map(a => a.artistName)
                                )
                                )].join(', ')
                                }
                                {
                                [...new Set(
                                    d?.tracks?.flatMap(track =>
                                    track?.primaryArtist?.map(a => a.artistName)
                                    )
                                )].join(', ')
                            }
                            </small>
                        </div>
                        </Link>
                    </td>
                    <td>{d?.labels?.map((label) => label.labelName)}</td>
                    <td>{d?.UPC ? d.UPC : "--"}</td>
                    <td>{d?.totalStreams || 0}</td>
                    <td>{d?.totalRevenue?.toFixed(2) || 0}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnalyticsPageTopReleaseTable;