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
import Settings from "./pages/Settings/Settings";
import Support from "./pages/Support/Support";
import SupportMessageBox from "./pages/Support/SupportMessageBox";
import {
  releaseItems,
  Release_Claim,
  support,
} from "./data";
// import { IoEyeOutline } from "react-icons/io5";
import LogIn from "./pages/LogIn/LogIn";
import ResetPassword from "./pages/LogIn/ResetPassword";
import NewPassword from "./pages/LogIn/NewPassword";
import CreateRelease from "./pages/Release/components/CreateRelease";
import SingleRelease from "./pages/Release/components/SingleRelease";
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
import TestPage from "./pages/TestPage/TestPage";
import Authorization from "./Authorization/Authorization";
import SignUpFirstPage from "./pages/SignUp/SignUpFirstPage";
import PersonalDetails from "./pages/SignUp/signUpSteps/PersonalDetails";
import AddressInformation from "./pages/SignUp/signUpSteps/AddressInformation";
import EditRelease from "./pages/Release/EditRelease/EditRelease";
import EditSingleArtist from "./pages/Artists/components/EditSingleArtist";
import EditLable from "./pages/Lables/components/EditLable";
import SuspendPage from "./pages/SuspendPage/SuspendPage";
import Analytics from "./pages/Analytics/Analytics";

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
              <Authorization><Home releaseItems={releaseItems} /></Authorization>
            }
          />

          {/* Release Route Start_________________________________ */}
          <Route
            path="/releases/:pageNumber/:perPageItem/:status"
            element={<Authorization><Release /> </Authorization>}
          />
          <Route
            path="/release/:id"
            element={ <Authorization><SingleRelease/></Authorization> }
          />
          <Route
            path="/create-release"
            element={ <Authorization><CreateRelease/></Authorization>}
          />
          <Route
            path="/edit-release/:id"
            element={ <Authorization><EditRelease/></Authorization>}
          />
          <Route path="/AlbumInformation" element={<Authorization><AlbumInformation /></Authorization>} />

          <Route
            path="/ReleaseOverview"
            element={
              <Authorization>
                <ReleaseOverview/>
              </Authorization>
            }
          />
          {/* Release Route End_____________________________________ */}

          {/* Artist Route Start ___________________________________ */}
          <Route
            path="/artist/:pageNumber/:perPageItem/"
            element={<Authorization><Artists /></Authorization>}
          />
          <Route
            path="/artist-details/:id/:pageNumber/:perPageItem/:status"
            element={<Authorization><SingleArtist/></Authorization>}/>

          <Route
            path="/create-artist"
            element={<Authorization><CreateArtist /></Authorization>}
          />
          <Route
            path="/edit-artist/:id"
            element={<Authorization><EditSingleArtist/></Authorization>}
          />
          {/* Artist Route End ___________________________________ */}

          {/* Label Route Start __________________________________ */}
          <Route
            path="/labels/:pageNumber/:perPageItem/:status"
            element={<Authorization><Lables /></Authorization>}
          />
          <Route
            path="/labels/:id/:pageNumber/:perPageItem/:status"
            element={<Authorization><SingleLable /></Authorization>}
          />
          <Route
            path="/create-label"
            element={<Authorization><CreateLabel /></Authorization>}
          />
          <Route
            path="/edit-label/:id"
            element={<Authorization><EditLable/></Authorization>}
          />

          {/* Label Route End __________________________________ */}
          {/* Analytics Route Start __________________________________ */}
          <Route
            path="/analytics"
            element={<Authorization><Analytics/></Authorization>}
          />
          {/* Analytics Route End __________________________________ */}


          <Route
            path="/transaction/:pageNumber/:perPageItem/:status"
            element={<Authorization><Transaction /></Authorization>}
          />

          {/* Service Request Route Start _______________________ */}
          <Route
            path="/service-request/:request/:pageNumber/:perPageItem/:status"
            // path="/serviceRequest"
            element={
              <Authorization>
                <ServiceRequest/>
              </Authorization>
            }
          />
          {/* Service Request Route End _________________________ */}

          
          <Route path="/Profile" element={<Authorization><Profile /></Authorization>} />
          <Route path="/settings" element={<Authorization><Settings /></Authorization>} />
          <Route
            path="/Support"
            element={
              <Support Release_Claim={Release_Claim} support={support} />
            }
          />
          <Route path="/SupportMessageBox" element={<SupportMessageBox />} />
        </Route>

        <Route path="/locked/:id" element={<SuspendPage />} />


        {/* Route WITHOUT Sidebar & Navbar */}
        <Route path="/sign-up" element={<SignUpFirstPage />} />
        <Route path="/email-verification/:id" element={<SignUpVerificationEmail />}/>
        <Route path="/sign-up-profile-info" element={<Authorization><PersonalDetails /></Authorization>} />
        <Route path="/sign-up-address-info" element={<Authorization><AddressInformation /></Authorization>} />

        
        <Route path="/login" element={<LogIn />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/set-new-password/:email" element={<NewPassword />} />
        <Route path="/testPage" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
