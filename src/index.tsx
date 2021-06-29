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
  const pointerRef = React.useRef<HTMLDivElement>(null)
  const [pointerX, setPointerX] = React.useState<number>(0)
  const [pointerY, setPointerY] = React.useState<number>(0)
  const [imageHeight, setImageHeight] = React.useState<number | undefined>(0)
  const [imageWidth, setImageWidth] = React.useState<number | undefined>(0)
  const [offsetPointerWidth, setOffsetPointerWidth] = React.useState<number>(0)
  const pointerSizeValue = Number(pointerSize.split('px')[0])
  const zoomSizeValue = Number(zoomSize.split('px')[0])
  const [toggleZoomer, setToggleZoomer] = React.useState<boolean>(false)

  React.useEffect(() => {
    setImageHeight(containerRef.current?.offsetHeight)
    setImageWidth(containerRef.current?.offsetWidth)

    if (pointerRef.current?.offsetWidth && pointerRef.current?.clientWidth) {
      setOffsetPointerWidth(
        Math.abs(
          pointerRef.current?.offsetWidth - pointerRef.current?.clientWidth
        )
      )
    }
  }, [containerRef, pointerRef])

  const zoomScreenStyle = (zoomSize: string) => {
    return {
      width: zoomSize,
      height: zoomSize
    }
  }

  const pointerStyle = (
    pointerSize: string,
    translateX: number,
    translateY: number
  ) => {
    return {
      width: pointerSize,
      height: pointerSize,
      transformOrigin: 'center',
      transform: `translate(${translateX}px, ${translateY}px)`
    }
  }

  const zoomedImageContainerStyle = (
    size: number,
    translateZoomX: number,
    translateZoomY: number
  ) => {
    return {
      width: `${size}px`,
      transformOrigin: 'center',
      transform: `translate(${translateZoomX}px, ${translateZoomY}px)`
    }
  }

  const onHandleMouseLeave = () => {
    setToggleZoomer(false)
  }

  const onHandleMouseMove = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const halfPointerSize = pointerSizeValue / 2
    const moveX = evt.clientX - evt.currentTarget.offsetLeft
    const moveY = evt.clientY - evt.currentTarget.offsetTop

    setToggleZoomer(true)

    if (moveX < halfPointerSize && moveY > halfPointerSize) {
      setPointerX(0)
      setPointerY(moveY - halfPointerSize - offsetPointerWidth)
    }

    if (moveX > halfPointerSize && moveY < halfPointerSize) {
      setPointerX(moveX - halfPointerSize - offsetPointerWidth)
      setPointerY(0)
    }

    if (moveX >= halfPointerSize && moveY >= halfPointerSize) {
      setPointerX(moveX - halfPointerSize)
      setPointerY(moveY - halfPointerSize)
    }

    if (imageHeight && imageWidth) {
      if (moveY > imageHeight - halfPointerSize) {
        setPointerY(imageHeight - 2 * halfPointerSize - offsetPointerWidth)
      }
      if (moveX > imageWidth - halfPointerSize) {
        setPointerX(imageWidth - 2 * halfPointerSize - offsetPointerWidth)
      }
    }
  }

  return (
    <div ref={containerRef} className={styles.imageZoomer}>
      <div
        className={styles.imageContainer}
        onMouseMove={onHandleMouseMove}
        onMouseLeave={onHandleMouseLeave}
      >
        <img src={imgUrl} alt={alt} />
        <div
          ref={pointerRef}
          className={styles.pointer}
          style={pointerStyle(pointerSize, pointerX, pointerY)}
        />
      </div>
      {toggleZoomer && (
        <div className={styles.zoomScreen} style={zoomScreenStyle(zoomSize)}>
          <div
            className={styles.zoomedImgContainer}
            style={zoomedImageContainerStyle(
              (zoomSizeValue * (imageWidth !== undefined ? imageWidth : 1)) /
                pointerSizeValue,
              (-pointerX * zoomSizeValue) / pointerSizeValue,
              (-pointerY * zoomSizeValue) / pointerSizeValue
            )}
          >
            <img src={imgUrl} alt={alt} className={styles.imageZoomed} />
          </div>
        </div>
      )}
    </div>
  )
}
