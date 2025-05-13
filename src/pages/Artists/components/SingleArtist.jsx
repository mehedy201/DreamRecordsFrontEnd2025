import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Artists.css";
import { Button, Flex } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { GoPencil } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { ChevronRight } from "lucide-react";
import Dropdown from "../../../components/Dropdown";
import ReleaseCard from "../../../components/ReleaseCard";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "../../../components/Modal";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const SingleArtist = ({ releaseItems, artistSocialItems }) => {
  const [selectedOption1, setSelectedOption1] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(false);
  const location = useLocation();
  const [artist, setArtist] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [socialItems, setSocialItems] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dropdownItem = (
    <>
      <Dropdown
        label="All time"
        options={["Option 1", "Option 2", "Option 3"]}
        onSelect={setSelectedOption1}
        select={selectedOption1}
      />
      {isMobile && <br />}
      <Dropdown
        label="All Releases"
        options={["Option A", "Option B", "Option C"]}
        onSelect={setSelectedOption2}
        select={selectedOption2}
      />
    </>
  );
  useEffect(() => {
    if (location.state?.artist) {
      setArtist(location.state.artist);
    }
  }, [location.state]);

  useEffect(() => {
    const stored = localStorage.getItem("artistSocialUrl");
    if (stored) {
      const parsed = JSON.parse(stored);
      const filtered = parsed.filter((item) => item.url.trim() !== "");
      setSocialItems(filtered);
    }
  }, []);
  return (
    <div className="main-content">
      <div className="artist-detail">
        {/* <img
          src="src/assets/blank banner.png"
          width="100%"
          style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
          alt=""
        /> */}
        {artist ? (
          <div>
            <Flex className="artist-image-row">
              <div>
                <img
                  className="singleArtist-image"
                  src={`src/assets/artists/${artist.img}`}
                  alt={artist.name}
                />
              </div>
              <div style={{ margin: "auto auto auto 0" }}>
                <h1>{artist.name}</h1>
                <p>Created on 23 Jan, 2025</p>
              </div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="dropdown-trigger singleArtist-dropdown-btn">
                    <img src="src/assets/icons/vertical-threeDots.png" />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content
                  align="left"
                  side="bottom"
                  className="dropdown-content singleArtist-dropdown-content"
                >
                  <DropdownMenu.Item className="dropdown-item">
                    <Link
                      to="/edit-artist"
                      state={{ artistSocialItems }}
                      style={{
                        cursor: "pointer",
                        color: "#202020",
                        textDecoration: "none",
                      }}
                    >
                      <GoPencil /> Edit Artist
                    </Link>
                  </DropdownMenu.Item>
                  <hr />

                  <DropdownMenu.Item
                    className="dropdown-item"
                    onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
                  >
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <span>
                          <AiOutlineDelete /> Delete Artist
                        </span>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="dialog-overlay" />
                        <Dialog.Content className="dialog-content">
                          <Modal title="Delete Artist Profile?">
                            <p className="modal-description">
                              Are you sure you want to delete this artist
                              profile? This action is irreversible, and all
                              associated data, including music releases and
                              analytics, will be permanently removed.
                            </p>
                            <br />
                            <div className="singleArtist-deleteModal-btns">
                              <Button>No</Button>
                              <Button>Yes, Delete</Button>
                            </div>
                          </Modal>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
            <div className="singleArtist-social-row">
              <div className="singleArtist-info">
                <h4>Total Releases</h4>
                <h1>122</h1>
                <Button className="singleArtist-pg-allRelease-btn">
                  All Releases &nbsp;&nbsp; <ChevronRight />
                </Button>
              </div>
              <div className="singleArtist-social-div">
                <h4>Artist Profiles</h4>
                <div className="d-flex single-pg-social">
                  {socialItems.map((item, index) => (
                    <div key={index} className="social-div">
                      <img
                        src={`src/assets/social/${item.img}`}
                        alt={item.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No artist found! Try selecting an artist first.</p>
        )}
      </div>
      <h4
        style={{
          color: "#838383",
          fontSize: "20px",
          fontWeight: "500",
          margin: "0",
        }}
      >
        Releases under this artist
      </h4>
      <div className="search-setion">
        <input type="text" placeholder="Search..." />
        {isMobile ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="dropdown-trigger"
                style={{
                  width: "56px",
                  justifyContent: "center",
                  marginRight: "0",
                }}
              >
                <HiOutlineAdjustmentsHorizontal
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="center"
              side="bottom"
              className="dropdown-content"
            >
              {dropdownItem}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          dropdownItem
        )}
      </div>
      <ReleaseCard releaseItems={releaseItems.slice(0, 5)} />
      <br />
      <br />
    </div>
  );
};
SingleArtist.propTypes = {
  releaseItems: PropTypes.array.isRequired,
  artistSocialItems: PropTypes.array.isRequired,
};
export default SingleArtist;
