import React, { useState } from 'react';
import ImageUpload from '../../../components/ImageUpload';
import SignUpImgIdUpload from './SignUpImgIdUpload';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../../redux/features/signUpDataHandleSlice/signUpDataHandleSlice';

const DocumentUpload = () => {


    const dispatch = useDispatch();
    const {step} = useSelector(state => state.signUpData);
    const handlePrev = () => {
      dispatch(setStep(step-1))
    }

    // User Profile Image Releated State ___________
    const [profileImageLink, setProfileImageLink] = useState();
    const [uploadedProfileImg, setUploadedProfileImg] = useState();
    const [profileImgErr, setProfileImgErr] = useState('');
    // User ID Card Front Image Releated State ___________
    const [idFrontImgLink, setIdFrontImgLink] = useState();
    const [uploadedIdFrontImg, setUploadedIdFrontImg] = useState();
    const [idFrontErr, setIdFrontErr] = useState('');
    // User ID Card Back Image Releated State ___________
    const [idBackImgLink, setIdBackImgLink] = useState();
    const [uploadedIdBackImg, setUploadedIdBackImg] = useState();
    const [idBackErr, setIdBackErr] = useState('');

    const createUser = () => {
      setProfileImgErr('')
      setIdFrontErr('')
      setIdBackErr('')
      if(!uploadedProfileImg){
        setProfileImgErr('Add profile Image')
        return;
      }
      if(!uploadedIdFrontImg){
        setIdFrontErr('Add ID card front image')
        return;
      }
      if(!uploadedIdBackImg){
        setIdBackErr('Add ID card back image')
        return;
      }
      const data = {uploadedProfileImg, uploadedIdBackImg, uploadedIdFrontImg}
      console.log(data)
    }

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
                {
                  profileImgErr && <p style={{color: 'red'}}>{profileImgErr}</p>
                }
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
                      {
                        idFrontErr && <p style={{color: 'red'}}>{idFrontErr}</p>
                      }             
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
                      {
                        idBackErr && <p style={{color: 'red'}}>{idBackErr}</p>
                      }  
                    </div>
                  </div>
                </div>
            </div>
            <div className="signUp-buttons">
                <button className="theme-btn2" onClick={handlePrev}>Back</button>
                <button className="signUp-next-btn" onClick={createUser}>Submit</button>
            </div>
        </div>
    );
};

export default DocumentUpload;