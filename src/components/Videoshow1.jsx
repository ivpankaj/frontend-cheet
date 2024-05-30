import React, { useState } from 'react';
import VideoList from './VideoList';

import VideoUpload from './VideoUpload';
import '../Styles/Videos/Videoshow1.css'
import VideoUpload2 from './VideoUpload2';
import VideoUpload3 from './VideoUpload3';
import VideoUpload4 from './VideoUpload4'
import VideoUpload5 from './VideoUpload5';
import VideoList2 from './VideoList2';
import VideoList3 from './VideoList3';
import VideoList4 from './VideoList4';
import VideoList5 from './VideoList5';

const Videoshow1 = () => {
  const [visibleDiv, setVisibleDiv] = useState(null);

  const handleClick = (divId) => {
    setVisibleDiv(divId);
  };

  return (
    <>
    <div className='video-main'>
      <div className='video-show-button'>
        <button onClick={() => handleClick('div1')}>Funny</button>
        <button onClick={() => handleClick('div2')}>Motivated</button>
        <button onClick={() => handleClick('div3')}>Space and fun</button>
        <button onClick={() => handleClick('div4')}>Cartoon</button>
        <button onClick={() => handleClick('div5')}>Cricket</button>
        {/* Add more buttons as needed */}
      </div>
      
     
        {visibleDiv === 'div1' && <div className='video-show-main2' id="div1"><VideoUpload/><VideoList/></div>}
        {visibleDiv === 'div2' && <div id="div2"><VideoUpload2/><VideoList2/></div>}
        {visibleDiv === 'div3' && <div id="div3"><VideoUpload3/><VideoList3/></div>}
        {visibleDiv === 'div4' && <div id="div4"><VideoUpload4/><VideoList4/></div>}
        {visibleDiv === 'div5' && <div id="div5"><VideoUpload5/><VideoList5/></div>}

        {/* Add more divs as needed */}
        </div>
      </>
  );
};

export default Videoshow1;
