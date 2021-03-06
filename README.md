# react-image-zoomer-ch

This React package helps you zoom in a part of an image whenever user mouse over it. It is useful for your e-commerce project.

[![NPM](https://img.shields.io/npm/v/react-image-zoomer.svg)](https://www.npmjs.com/package/react-image-zoomer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

```bash
https://build-cuonghv911.vercel.app
```
![alt text](https://i.ibb.co/64W9C14/ezgif-2-ca770137aebe.gif)

## Install

```bash
npm install --save react-image-zoomer-ch
```

## Usage

```tsx
import React, { Component } from 'react'

import { ReactImageZoomer } from 'react-image-zoomer-ch'

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

| Props  | Type | Default value | Description |
| ------------- | ------------- |------------- |------------- |
| imgUrl  | string | empty string | Url of the image you want to zoom  |
| alt  | string | undefined | alt of the image, for SEO purpose maybe  |
| zoomSize  | string  | 300px | Displayed zoomming part size  |
| pointerSize  | string  | 50px | Pointer size  |
| children  | React Component  | undefined | Children inside component, used for adding stickers layer  |

## License

MIT © [cuonghv91](https://github.com/cuonghv91)
