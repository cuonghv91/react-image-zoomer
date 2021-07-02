import React from 'react'

import { ReactImageZoomer } from 'react-image-zoomer'

const App = () => {
  return (
    <div style={{ width: 500 }}>
      <ReactImageZoomer
        imgUrl='https://i.ibb.co/h1C0vFX/ngoc-trinh.jpg'
        alt='demo'
        zoomSize='300px'
        pointerSize='50px'
      />
    </div>
  )
}

export default App
