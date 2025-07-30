import React, { useState } from 'react';
import ImageUpload from '../../../components/ImageUpload';
import SignUpImgIdUpload from './SignUpImgIdUpload';

const DocumentUpload = () => {

    // User Profile Image Releated State ___________
    const [profileImageLink, setProfileImageLink] = useState();
    const [uploadedProfileImg, setUploadedProfileImg] = useState();
    // User ID Card Front Image Releated State ___________
    const [idFrontImgLink, setIdFrontImgLink] = useState();
    const [uploadedIdFrontImg, setUploadedIdFrontImg] = useState();
    // User ID Card Back Image Releated State ___________
    const [idBackImgLink, setIdBackImgLink] = useState();
    const [uploadedIdBackImg, setUploadedIdBackImg] = useState();

    return (
        <div>
            <div className="">
                {" "}
                <label>Upload Profile Picture *</label>
                <SignUpImgIdUpload
                    link="http://localhost:5000/api/v1/users/upload-profile-img"
                    setImgLink={setProfileImageLink}
                    imgLink={profileImageLink}
                    uploadedImage={uploadedProfileImg}
                    setUploadedImage={setUploadedProfileImg}
                    placeholderImg="upload-img.png"
                    placeholderTxt="Drop your image here"
                    className="signUp-imgUpload"
                />
                <label htmlFor="">Upload Government ID *</label>
                <div className="row">
                  <div className="col-6">
                    <div
                      style={{
                        marginRight:
                          window.innerWidth <= 420 ? "5px" : "10px",
                      }}
                    >
                      <SignUpImgIdUpload
                        link="http://localhost:5000/api/v1/users/upload-profile-img"
                        setImgLink={setIdFrontImgLink}
                        imgLink={idFrontImgLink}
                        uploadedImage={uploadedIdFrontImg}
                        setUploadedImage={setUploadedIdFrontImg}
                        placeholderImg="identity.png"
                        placeholderTxt="Drop Front Side of ID here"
                        className="signUp-identity-imgUpload"
                      />

                    </div>
                  </div>
                  <div className="col-6">
                    <div style={{ marginLeft: "10px" }}>
                      <SignUpImgIdUpload
                        link="http://localhost:5000/api/v1/users/upload-profile-img"
                        setImgLink={setIdBackImgLink}
                        imgLink={idBackImgLink}
                        uploadedImage={uploadedIdBackImg}
                        setUploadedImage={setUploadedIdBackImg}
                        placeholderImg="identity.png"
                        placeholderTxt="Drop Back Side of ID here"
                        className="signUp-identity-imgUpload"
                      />
                    </div>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentUpload;