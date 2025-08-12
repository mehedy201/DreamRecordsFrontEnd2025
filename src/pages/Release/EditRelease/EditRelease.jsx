import { useParams } from "react-router-dom";
import CreateRelease from "../components/CreateRelease";
import axios from "axios";
import LoadingScreen from "../../../components/LoadingScreen";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setReleaseAlbumInfo, setReleaseDate, setTrackFormat, setTracksInfo } from "../../../redux/features/releaseDataHandleSlice/releaseDataHandleSlice";

const EditRelease = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/release/${id}`
      )
      .then((res) => {
        if (res.status == 200) {
            const forAlbumInfo = res?.data?.data;
            const forTracksInfo = res?.data?.data?.tracks;
            const forFormat = res?.data?.data?.format;
            const preReleaseDate = {releaseOption: res?.data?.data?.releaseOption, releaseDate: res?.data?.data?.releaseDate}
            delete forAlbumInfo?.tracks;
            delete forAlbumInfo?.releaseDate;
            delete forAlbumInfo?.releaseOption;
            delete forAlbumInfo?.format;
            dispatch(setReleaseAlbumInfo(forAlbumInfo))
            dispatch(setTrackFormat(forFormat))
            dispatch(setTracksInfo(forTracksInfo))
            dispatch(setReleaseDate(preReleaseDate))
            setLoading(false);
        }else {
          console.log('no data found');
        }
      });
  }, [id]);

  if (loading) return <LoadingScreen />;
    return (
        <div>
            <CreateRelease/>
        </div>
    );
};

export default EditRelease;