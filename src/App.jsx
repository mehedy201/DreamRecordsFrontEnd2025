import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
 import Home from "./pages/home/home";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import Release from "./pages/Release/Release";
import Artists from "./pages/Artists/Artists";
import Navbar from "./components/Navbar";
import Lables from "./pages/Lables/Lables";
import Transaction from "./pages/Transaction/Transaction";
import ServiceRequest from "./pages/ServiceRequest/ServiceRequest";
import SingleArtist from "./pages/Artists/components/SingleArtist";
import Profile from "./pages/Profile/Profile";
import EditSingleArtist from "./pages/Artists/components/EditSingleArtist";
import EditLable from "./pages/Lables/components/EditLable";
import Settings from "./pages/Settings/Settings";
import Support from "./pages/Support/Support";
import SignUp from "./pages/SignUp/SignUp";
import SupportMessageBox from "./pages/Support/SupportMessageBox";
import {
  artistsItems,
  releaseItems,
  Release_Claim,
  LablesItems,
  support,
  transactions,
  releaseAlbumInfo,
  releaseTrackDetails,
  albumTrackList,
  singleReleaseATrackData,
  chartData,
  singleReleaseARevenueData,
  releaseCredits,
} from "./data";
// import { IoEyeOutline } from "react-icons/io5";
import LogIn from "./pages/LogIn/LogIn";
import ResetPassword from "./pages/LogIn/ResetPassword";
import NewPassword from "./pages/LogIn/NewPassword";
import CreateRelease from "./pages/Release/components/CreateRelease";
import SingleRelease from "./pages/Release/components/SingleRelease";
import SignUpVerificationEmailSent from "./pages/SignUp/SignUpVerificationEmailSent";
import SignUpVerificationEmail from "./pages/SignUp/SignUpVerificationEmail";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import MobileMenu from "./components/MobileMenu";
import MobileFooter from "./components/MobileFooter";
import AlbumInformation from "./pages/Release/components/AlbumInformation";
import ReleaseOverview from "./pages/Release/components/ReleaseOverview";
import CreateArtist from "./pages/Artists/components/CreateArtist";
import CreateLabel from "./pages/Lables/components/CreateLabel";
import SingleLable from "./pages/Lables/components/SIngleLable";

function Layout() {
  const location = useLocation();

  const hideSidebarNavbar = location.pathname === "/SignUp";
  // const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 830);
  const [loading, setLoading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [location.pathname]); // run when path changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="app-wrapper">
      {!hideSidebarNavbar && !isMobile && <Sidebar />}
      <div
        className="main-content-wrapper"
        style={{
          marginLeft:
            hideSidebarNavbar || window.innerWidth <= 830 ? "0px" : "237px",
        }}
      >
        {!hideSidebarNavbar && (
          <Navbar toggleMobileMenu={() => setShowMobileMenu(true)} />
        )}
        {showMobileMenu && (
          <MobileMenu closeMenu={() => setShowMobileMenu(false)} />
        )}
        {isMobile && <MobileFooter />}
        {loading ? <LoadingScreen /> : <Outlet />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes inside Layout (with Sidebar & Navbar) */}
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Home releaseItems={releaseItems} />
            }
          />
          <Route
            path="/releases/:pageNumber/:perPageItem/:status"
            element={<Release releaseItems={releaseItems} />}
          />
          <Route
            path="/single-release"
            element={
              <SingleRelease
                releaseAlbumInfo={releaseAlbumInfo}
                albumTrackList={albumTrackList}
                singleReleaseATrackData={singleReleaseATrackData}
                singleReleaseARevenueData={singleReleaseARevenueData}
                releaseTrackDetails={releaseTrackDetails}
                chartData={chartData}
                releaseCredits={releaseCredits}
              />
            }
          />
          <Route
            path="/create-release"
            element={
              <CreateRelease
                releaseAlbumInfo={releaseAlbumInfo}
                albumTrackList={albumTrackList}
                releaseTrackDetails={releaseTrackDetails}
              />
            }
          />
          <Route path="/AlbumInformation" element={<AlbumInformation />} />

          <Route
            path="/ReleaseOverview"
            element={
              <ReleaseOverview
                releaseAlbumInfo={releaseAlbumInfo}
                releaseTrackDetails={releaseTrackDetails}
              />
            }
          />

          {/* Artist Route Start ___________________________________ */}
          <Route
            path="/artist/:pageNumber/:perPageItem/"
            element={<Artists />}
          />
          <Route
            path="/artist-details/:id/:pageNumber/:perPageItem/:status"
            element={<SingleArtist/>}/>

          <Route
            path="/create-artist"
            element={<CreateArtist />}
          />
          <Route
            path="/edit-artist/:id"
            element={<EditSingleArtist/>}
          />
          {/* Artist Route End ___________________________________ */}

          {/* Label Route Start __________________________________ */}
          <Route
            path="/labels/:pageNumber/:perPageItem/:status"
            element={<Lables />}
          />
          <Route
            path="/labels/:id/:pageNumber/:perPageItem/:status"
            element={<SingleLable />}
          />
          <Route
            path="/create-label"
            element={<CreateLabel />}
          />
          <Route
            path="/edit-label/:id"
            element={<EditLable/>}
          />

          {/* Label Route End __________________________________ */}


          <Route
            path="/Transaction"
            element={<Transaction transactions={transactions} />}
          />
          <Route
            path="/ServiceRequest"
            element={
              <ServiceRequest
                artistsItems={artistsItems}
                Release_Claim={Release_Claim}
              />
            }
          />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/Support"
            element={
              <Support Release_Claim={Release_Claim} support={support} />
            }
          />
          <Route path="/SupportMessageBox" element={<SupportMessageBox />} />
        </Route>

        {/* Route WITHOUT Sidebar & Navbar */}
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/SignUpVerificationEmailSent"
          element={<SignUpVerificationEmailSent />}
        />
        <Route
          path="/SignUpVerificationEmail"
          element={<SignUpVerificationEmail />}
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/newpassword" element={<NewPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
