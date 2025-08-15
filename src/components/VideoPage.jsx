import React from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, SERVER_SECRET } from './constant';

const VideoPage = () => {
  const {id} = useParams();
  const roomID = id;
 
  let myMeeting = async (element) => {
    // Generate Kit Token
    const appID = APP_ID;
    const serverSecret = SERVER_SECRET; 
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "sam"
    );

    // Create instance from Kit Token
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname,
        },
      ],
      scenario:{
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };


  return (
    <div>
      <div ref={myMeeting} style={{ width: '100vw', height: '100vh' }}></div>
    </div>
  );
};

export default VideoPage;
