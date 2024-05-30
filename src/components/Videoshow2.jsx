import React, { useState } from 'react';

import '../Styles/Videos/Videoshow1.css'

import MyVideos from './MyVideos';
import MyVideos2 from './MyVideos2';
import MyVideos3 from './MyVideos3';
import MyVideos4 from './MyVideos4';
import MyVideos5 from './MyVideos5';

const Videoshow2 = () => {
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
      
     
        {visibleDiv === 'div1' && <div className='video-show-main2' id="div1"><MyVideos/></div>}
        {visibleDiv === 'div2' && <div id="div2"><MyVideos2/></div>}
        {visibleDiv === 'div3' && <div id="div3"><MyVideos3/></div>}
        {visibleDiv === 'div4' && <div id="div4"><MyVideos4/></div>}
        {visibleDiv === 'div5' && <div id="div5"><MyVideos5/></div>}

        {/* Add more divs as needed */}
        </div>
      </>
  );
};

export default Videoshow2;
