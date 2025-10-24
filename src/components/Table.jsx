import PropTypes from "prop-types";
import { IoEyeOutline } from "react-icons/io5";
import releasePlaceHolderImg from "../assets/release-placeholder.png"
import localDate from "../hooks/localDate";
import { Dialog } from "radix-ui";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { cdnLink } from "../hooks/cdnLink";
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
              (tableFor === 'ClaimVideo' || tableFor === 'BlockedVideo') && <th>Video Link</th>
            }
            {
              tableFor === 'OAC' && <th>Topic Channel Link</th>
            }
            {
              tableFor === 'ProfileLinking' && 
              <>
                <th>Type</th>
                <th>Artist's Profile Link</th>
              </>
            }
            {
              tableFor === 'Whitelist' && 
              <>
                <th>Type</th>
                <th>Whitelist Link</th>
              </>
            }
            <th>Created At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            serviceRequestData?.map((data, index) => 
              <tr key={index}>
                  <td>
                    {
                      Array.isArray(data?.release) &&
                      data?.release?.map(item => 
                        <div style={{margin: '3px'}} key={item?._id} className="release-table-img-td">
                          <img src={item?.key ? cdnLink(item?.key) : releasePlaceHolderImg} alt="" />
                          <div>
                            <p>{item?.releaseTitle}</p>
                            <small>UPC: {item?.UPC}</small>
                          </div>
                        </div>
                      )
                    }
                    {
                      typeof data?.release === 'object' && data?.release?.releaseTitle &&
                      <div className="release-table-img-td">
                        <img src={data?.release?.key ? cdnLink(data?.release?.key) : releasePlaceHolderImg} alt="" />
                        <div>
                          <p>{data?.release?.releaseTitle}</p>
                          <small>UPC: {data?.release?.UPC}</small>
                        </div>
                      </div>
                    }
                  </td>
                  {
                    tableFor === 'ReleaseClaim' &&
                      <>
                      <td>{data?.type ? data?.type : 'Youtube'}</td>
                      <td><a href={data?.claimLink?.startsWith("http") ? data?.claimLink : `https://${data?.claimLink}`}target="_blank" rel="noopener noreferrer">{data?.claimLink?.length > 50 ? `${data?.claimLink.slice(0, 50)}...` : data?.claimLink}</a></td>
                      </>
                  }
                  {
                    (tableFor === 'ClaimVideo' || tableFor === 'BlockedVideo')&& 
                    <td><a href={data?.claimLink?.startsWith("http") ? data?.claimLink : `https://${data?.claimLink}`}target="_blank" rel="noopener noreferrer">{data?.claimLink?.length > 50 ? `${data?.claimLink.slice(0, 50)}...` : data?.claimLink}</a></td>
                  }
                  {
                    tableFor === 'OAC' && <td><a href={data?.artistsTopicChannelLink?.startsWith("http") ? data?.artistsTopicChannelLink : `https://${data?.artistsTopicChannelLink}`}target="_blank" rel="noopener noreferrer">{data?.artistsTopicChannelLink?.length > 50 ? `${data?.artistsTopicChannelLink.slice(0, 50)}...` : data?.artistsTopicChannelLink}</a></td>
                  }
                  {
                    tableFor === 'ProfileLinking' && 
                    <>
                      <td>{data?.type ? data?.type : 'Instagram'}</td>
                      <td><a href={data?.artistProfileLink?.startsWith("http") ? data?.artistProfileLink : `https://${data?.artistProfileLink}`}target="_blank" rel="noopener noreferrer">{data?.artistProfileLink?.length > 50 ? `${data?.artistProfileLink.slice(0, 50)}...` : data?.artistProfileLink}</a></td>
                    </>
                  }
                  {
                    tableFor === 'Whitelist' && 
                    <>
                      <td>{data?.type || 'Facebook'}</td>
                      <td>{data?.whiteListLink}</td>
                    </>
                  }
                  <td>{data?.isoDate ? localDate(data?.isoDate) : '--'}</td>
                  <td><span className={`status ${data?.status?.toLowerCase()}`}>{data?.status}</span></td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger className="serviceRequest-view-trigger">
                        <IoEyeOutline style={{ width: "24px", height: "24px" }} />
                      </Dialog.Trigger>
                      <Modal title={modifyRequest(request)}>
                        {
                          Array.isArray(data?.release) &&
                          data?.release?.map(item => 
                            <div style={{margin: '3px'}} key={item?._id}>
                                <p style={{margin: '10px 0px 4px 0px'}}> Tittle: {item?.releaseTitle}</p>
                                <small>UPC: {item?.UPC}</small>
                            </div>
                          )
                        }
                        {
                          typeof data?.release === 'object' && data?.release?.releaseTitle &&
                          <div>
                              <p style={{margin: '10px 0px 4px 0px'}}> Tittle: {data?.release?.releaseTitle}</p>
                              <small>UPC: {data?.release?.UPC}</small>
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
                              <p>URL:</p>
                              <p><a href={data?.claimLink?.startsWith("http") ? data?.claimLink : `https://${data?.claimLink}`}target="_blank" rel="noopener noreferrer">{data?.claimLink?.length > 50 ? `${data?.claimLink.slice(0, 50)}...` : data?.claimLink}</a></p>
                            </div>
                            </>
                        }
                        {
                          (tableFor === 'ClaimVideo' || tableFor === 'BlockedVideo') && 
                          <div style={{gap: '10px'}} className="d-flex">
                            <p>Video Link:</p>
                            <p><a href={data?.claimLink?.startsWith("http") ? data?.claimLink : `https://${data?.claimLink}`}target="_blank" rel="noopener noreferrer">{data?.claimLink?.length > 50 ? `${data?.claimLink.slice(0, 50)}...` : data?.claimLink}</a></p>
                          </div>
                        }
                        {
                          tableFor === 'OAC' && 
                          <>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Artist's:</p>
                              <p>{data?.artist?.map(artist => artist.artistName).join(', ')}</p>
                            </div>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Topic Channel Link:</p>
                              <p><a href={data?.artistsTopicChannelLink?.startsWith("http") ? data?.artistsTopicChannelLink : `https://${data?.artistsTopicChannelLink}`}target="_blank" rel="noopener noreferrer">{data?.artistsTopicChannelLink?.length > 50 ? `${data?.artistsTopicChannelLink.slice(0, 50)}...` : data?.artistsTopicChannelLink}</a></p>
                            </div>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Artist Youtube Link:</p>
                              <p><a href={data?.artistsYoutubeChannelLink?.startsWith("http") ? data?.artistsYoutubeChannelLink : `https://${data?.artistsYoutubeChannelLink}`}target="_blank" rel="noopener noreferrer">{data?.artistsYoutubeChannelLink?.length > 50 ? `${data?.artistsYoutubeChannelLink.slice(0, 50)}...` : data?.artistsYoutubeChannelLink}</a></p>
                            </div>
                          </>
                        }
                        {
                          tableFor === 'ProfileLinking' && 
                          <>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Type:</p>
                              <p>{data?.type}</p>
                            </div>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Artist's:</p>
                              <p>{data?.artist?.map(artist => artist.artistName).join(', ')}</p>
                            </div>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Artist's Profile Link:</p>
                              <p><a href={data?.artistProfileLink?.startsWith("http") ? data?.artistProfileLink : `https://${data?.artistProfileLink}`}target="_blank" rel="noopener noreferrer">{data?.artistProfileLink?.length > 50 ? `${data?.artistProfileLink.slice(0, 50)}...` : data?.artistProfileLink}</a></p>
                            </div>
                          </>
                        }
                        {
                          tableFor === 'Whitelist' && 
                          <>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Type: </p>
                              <p>{data?.type || 'Facebook'}</p>
                            </div>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Whitelist Link</p>
                              <p>{data?.whiteListLink}</p>
                            </div>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Artist: </p>
                              <p>{data?.artist?.map(artist => artist.artistName).join(', ')}</p>
                            </div>
                            <div style={{gap: '10px'}} className="d-flex">
                              <p>Label: </p>
                              <p>{data?.label?.map(label => label.labelName).join(', ')}</p>
                            </div>
                          </>
                        }
                        <div style={{gap: '10px'}} className="d-flex">
                          <p>Created At:</p>
                          <p>{data?.isoDate ? localDate(data?.isoDate) : '--'}</p>
                        </div>
                        <div style={{gap: '10px'}} className="d-flex">
                          <p>Status:</p>
                          <p>{data?.status}</p>
                        </div>
                        {
                          data?.status === 'Rejected' &&
                          <div style={{gap: '10px'}} className="">
                            <p style={{ fontSize: "14px", color: "#838383" }}>
                              Reject Reason:
                            </p>
                            <div style={{whiteSpace: 'normal',wordBreak: 'break-word',overflowWrap: 'break-word',}} dangerouslySetInnerHTML={{ __html: data?.actionRequired }} />
                          </div>
                        }
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
