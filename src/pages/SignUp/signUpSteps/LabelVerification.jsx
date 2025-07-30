import React from 'react';

const LabelVerification = () => {
    return (
        <div>
            <div>
                <label htmlFor="">Channel Name *</label>
                <input
                  type="text"
                  name="channelName"
                />
                <label htmlFor="">Channel URL *</label>
                <input
                  type="text"
                  name="channelURL"
                />
                <div className="signUp-form-grid">
                  <div>
                    <label htmlFor="">Subscribers Count *</label>

                    <input
                      type="text"
                      name="subscribers"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Videos Count *</label>
                    <input
                      type="text"
                      name="videos"
                      className="input-field"
                    />
                  </div>
                </div>
            </div>
        </div>
    );
};

export default LabelVerification;