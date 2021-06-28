import React from 'react'

import { ReactImageZoomer } from 'react-image-zoomer'
import 'react-image-zoomer/dist/index.css'

const App = () => {
  return (
    <div style={{ width: 500 }}>
      <ReactImageZoomer
        imgUrl='https://i.ibb.co/h1C0vFX/ngoc-trinh.jpg'
        alt='demo'
      />
    </div>
  )
}

export default App
