# react-image-zoomer-ch


[![NPM](https://img.shields.io/npm/v/react-image-zoomer.svg)](https://www.npmjs.com/package/react-image-zoomer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

```bash
https://build-cuonghv911.vercel.app
```

## Install

```bash
npm install --save react-image-zoomer-ch
```

## Usage

```tsx
import React, { Component } from 'react'

import ReactImageZoomer from 'react-image-zoomer-ch'
import 'react-image-zoomer-ch/dist/index.css'

class Example extends Component {
  render() {
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
}
```

## License

MIT © [cuonghv91](https://github.com/cuonghv91)
