import * as React from 'react'
import styles from './styles.module.css'

interface ReactImageZoomer {
  imgUrl?: string
  alt?: string
  zoomSize?: string
  pointerSize?: string
}

export const ReactImageZoomer: React.FC<ReactImageZoomer> = ({
  imgUrl,
  alt,
  zoomSize = '300px',
  pointerSize = '50px'
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const zoomScreenStyle = (zoomSize: string) => {
    return {
      width: zoomSize,
      height: zoomSize
    }
  }

  const pointerStyle = (pointerSize: string) => {
    return {
      width: pointerSize,
      height: pointerSize
    }
  }

  const onHandleMouseMove = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log(111, evt)
  }

  return (
    <div ref={containerRef} className={styles.imageZoomer}>
      <div className={styles.imageContainer} onMouseMove={onHandleMouseMove}>
        <img src={imgUrl} alt={alt} />
        <div className={styles.pointer} style={pointerStyle(pointerSize)}></div>
      </div>
      <div
        className={styles.zoomScreen}
        style={zoomScreenStyle(zoomSize)}
      ></div>
    </div>
  )
}
