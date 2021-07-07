import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  imageZoomer: {
    position: 'relative'
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2
  },
  actualImage: {
    width: '100%',
    cursor: 'pointer',
    position: 'relative',
    display: 'block'
  },
  zoomScreen: {
    position: 'absolute',
    top: '0px',
    zIndex: 99,
    left: '100%',
    overflow: 'hidden'
  },
  pointer: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    border: '1px red solid',
    cursor: 'pointer'
  },

  imageZoomed: {
    width: '100%'
  },

  zoomedImgContainer: {
    position: 'absolute',
    left: '0px',
    top: '0px'
  }
})

interface ReactImageZoomer {
  imgUrl?: string
  alt?: string
  zoomSize?: string
  pointerSize?: string
}

export const ReactImageZoomer: React.FC<ReactImageZoomer> = ({
  imgUrl = '',
  alt,
  zoomSize = '300px',
  pointerSize = '50px'
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const pointerRef = React.useRef<HTMLDivElement>(null)
  const [pointerX, setPointerX] = React.useState<number>(0)
  const [pointerY, setPointerY] = React.useState<number>(0)
  const [imageWidth, setImageWidth] = React.useState<number | undefined>(0)
  const pointerSizeValue = Number(pointerSize.split('px')[0])
  const zoomSizeValue = Number(zoomSize.split('px')[0])
  const [toggleZoomer, setToggleZoomer] = React.useState<boolean>(false)

  React.useEffect(() => {
    setImageWidth(containerRef.current?.offsetWidth)
  }, [containerRef])

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

  const onHandleMouseLeave = () => setToggleZoomer(false)

  const onHandleMouseMove = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setToggleZoomer(true)
    const halfPointerSize = pointerSizeValue / 2
    const moveX = evt.clientX - evt.currentTarget.offsetLeft
    const moveY = evt.clientY - evt.currentTarget.offsetTop
    setPointerX(moveX - halfPointerSize)
    setPointerY(moveY - halfPointerSize)
  }

  return (
    <div
      ref={containerRef}
      className={`image-zoomer ${css(styles.imageZoomer)}`}
    >
      <div
        className={`image-container ${css(styles.imageContainer)}`}
        onMouseMove={onHandleMouseMove}
        onMouseLeave={onHandleMouseLeave}
        data-testid='img-container'
      >
        {imgUrl.length === 0 ? (
          <span data-testid='message'>You need to provide image url</span>
        ) : (
          <img
            src={imgUrl}
            alt={alt}
            data-testid='original-image'
            className={`actual-image ${css(styles.actualImage)}`}
          />
        )}
        {toggleZoomer && (
          <div
            data-testid='pointer'
            ref={pointerRef}
            className={`pointer ${css(styles.pointer)}`}
            style={pointerStyle(pointerSize, pointerX, pointerY)}
          />
        )}
      </div>
      {toggleZoomer && (
        <div
          className={`zoom-screen ${css(styles.zoomScreen)}`}
          style={zoomScreenStyle(zoomSize)}
          data-testid='zoom-part'
        >
          {imageWidth !== undefined && (
            <div
              className={`zoom-image-container ${css(
                styles.zoomedImgContainer
              )}`}
              data-testid='zoomed-core'
              style={zoomedImageContainerStyle(
                (zoomSizeValue * imageWidth) / pointerSizeValue,
                (-pointerX * zoomSizeValue) / pointerSizeValue,
                (-pointerY * zoomSizeValue) / pointerSizeValue
              )}
            >
              <img
                src={imgUrl}
                alt={alt}
                className={`image-zoomed ${css(styles.imageZoomed)}`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
