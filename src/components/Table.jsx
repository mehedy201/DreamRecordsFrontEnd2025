import PropTypes from "prop-types";
import { IoEyeOutline } from "react-icons/io5";
import releasePlaceHolderImg from "../assets/release-placeholder.png"
import localDate from "../hooks/localDate";
import { Dialog } from "radix-ui";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
const Table = ({ tableFor, serviceRequestData }) => {

  const {request} = useParams();
  const modifyRequest = (request) => {
    if (request.includes("-")) {
        return request.replace("-", " ");
    }
    return request;
  }


  return (
    <div className="table-wrapper">
      <table className='theme-table'>
        <thead>
          <tr>
            <th>Release</th>
            {
              tableFor === 'ReleaseClaim' &&
                <>
                <th>Type</th>
                <th>URL</th>
                </>
            }
            {
              tableFor === 'ClaimVideo' && <th>Video Link</th>
            }
            {
              tableFor === 'BlockedVideo' && <th>Video Link</th>
            }
            {
              tableFor === 'OAC' && <th>Topic Channel Link</th>
            }
            {
              tableFor === 'ProfileLinking' && <th>Artist's Profile Link</th>
            }
            {
              tableFor === 'Whitelist' && <th>Whitelist Link</th>
            }
            <th>Created At</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {
            serviceRequestData?.map((data, index) => 
              <tr key={index}>
                  <td>
                    <div className="release-table-img-td">
                      <img src={data?.release?.imgUrl ? data?.release?.imgUrl : releasePlaceHolderImg} alt="" />
                      <div>
                        <p>{data?.release?.releaseTitle}</p>
                        <small>UPC: {data?.release?.UPC}</small>
                      </div>
                    </div>
                  </td>
                  {
                    tableFor === 'ReleaseClaim' &&
                      <>
                      <td>{data?.type ? data?.type : 'Youtube'}</td>
                      <td>{data?.claimLink}</td>
                      </>
                  }
                  {
                    tableFor === 'ClaimVideo' && <td>Video Link</td>
                  }
                  {
                    tableFor === 'BlockedVideo' && <td>Video Link</td>
                  }
                  {
                    tableFor === 'OAC' && <td>Topic Channel Link</td>
                  }
                  {
                    tableFor === 'ProfileLinking' && <td>Artist's Profile Link</td>
                  }
                  {
                    tableFor === 'Whitelist' && <td>Whitelist Link</td>
                  }
                  <td>{data?.isoDate ? localDate(data?.isoDate) : '--'}</td>
                  <td>{data?.status}</td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger className="serviceRequest-view-trigger">
                        <IoEyeOutline style={{ width: "24px", height: "24px" }} />
                      </Dialog.Trigger>
                      <Modal title={modifyRequest(request)}>
                        { data?.release?.releaseTitle &&
                          <div style={{gap: '10px'}} className="d-flex">
                              <p>Tittle:</p>
                              <p>{data?.release?.releaseTitle}</p>
                          </div>
                        }
                        {
                          tableFor === 'ReleaseClaim' &&
                            <>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Type: </p>
                              <p>{data?.type ? data?.type : 'Youtube'}</p>
                            </div>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>URL</p>
                              <p>{data?.claimLink}</p>
                            </div>
                            </>
                        }
                        {
                          tableFor === 'ClaimVideo' || tableFor === 'BlockedVideo' && 
                          <div style={{gap: '10px'}} className="d-flex">
                            <p>Video Link:</p>
                            <p>{data?.videoLink}</p>
                          </div>
                        }
                        {
                          tableFor === 'OAC' && 
                          <>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Topic Channel Link:</p>
                              <p>{data?.artistsTopicChannelLink}</p>
                            </div>
                          </>
                        }
                        {
                          tableFor === 'ProfileLinking' && 
                          <div style={{gap: '10px'}} className="d-flex">
                            Artist's Profile Link
                          </div>
                        }
                        {
                          tableFor === 'Whitelist' && 
                          <div style={{gap: '10px'}} className="d-flex">
                            Whitelist Link
                          </div>
                        }
                        <div style={{gap: '10px'}} className="d-flex">
                          <p>Created At	</p>
                          <p>{data?.isoDate ? localDate(data?.isoDate) : '--'}</p>
                        </div>
                        <div style={{gap: '10px'}} className="d-flex">
                          <p>Status</p>
                          <p>{data?.status}</p>
                        </div>
                        <div style={{gap: '10px'}} className="d-flex">
                          <p style={{ fontSize: "14px", color: "#838383" }}>
                            Reject Reason
                          </p>
                          <div dangerouslySetInnerHTML={{ __html: data?.actionRequired }} />
                        </div>
                      </Modal>
                    </Dialog.Root>
                  </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderCell: PropTypes.func,
  className: PropTypes.string,
};

export default Table;
