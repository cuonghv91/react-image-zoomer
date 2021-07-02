import React from 'react'
import { ReactImageZoomer } from '.'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('ReactImageZoomer component with default props', () => {
  it("should display a message: 'You need to provide image url'", () => {
    render(<ReactImageZoomer />)
    const message = screen.queryByTestId('message')
    expect(message).not.toBeNull()
  })
})

describe('ReactImageZoomer component with all props provided', () => {
  const testImgUrl = 'https://i.ibb.co/h1C0vFX/ngoc-trinh.jpg'
  const testZoomSize = '300px'
  const testPointerSize = '50px'

  beforeEach(() => {
    render(
      <ReactImageZoomer
        imgUrl={testImgUrl}
        zoomSize={testZoomSize}
        pointerSize={testPointerSize}
      />
    )
  })

  afterEach(cleanup)

  it('should hide the pointer by default', () => {
    const pointer = screen.queryByTestId('pointer')
    expect(pointer).toBeNull()
  })

  it('should show the original image by default', () => {
    const originalImage = screen.queryByTestId('original-image')
    expect(originalImage).not.toBeNull()
  })

  it('should hide the zoomed part by default', () => {
    const zoomedPart = screen.queryByTestId('zoom-part')
    expect(zoomedPart).toBeNull()
  })
})

describe('ReactImageZoomer component actions', () => {
  const testImgUrl = 'https://i.ibb.co/h1C0vFX/ngoc-trinh.jpg'
  const testZoomSize = '300px'
  const testPointerSize = '50px'

  beforeEach(() => {
    render(
      <ReactImageZoomer
        imgUrl={testImgUrl}
        zoomSize={testZoomSize}
        pointerSize={testPointerSize}
      />
    )
  })

  afterEach(cleanup)

  it('should show the pointer whenenver mouse over the original image container', () => {
    const imgContainer = screen.getByTestId('img-container')
    expect(imgContainer).not.toBeNull()
    fireEvent.mouseMove(imgContainer)
    const pointer = screen.queryByTestId('pointer')
    expect(pointer).not.toBeNull()
  })

  it('should hide the pointer whenever mouse leave the original image container', () => {
    const imgContainer = screen.getByTestId('img-container')
    expect(imgContainer).not.toBeNull()
    fireEvent.mouseLeave(imgContainer)
    const pointer = screen.queryByTestId('pointer')
    expect(pointer).toBeNull()
  })

  it('should move the pointer with mouse pointer', () => {
    const testMove = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 3 },
      { x: 4, y: 5 },
      { x: 6, y: 7 },
      { x: 8, y: 9 },
      { x: 10, y: 11 },
      { x: 12, y: 13 },
      { x: 23, y: 13 },
      { x: 54, y: 67 },
      { x: 21, y: 34 }
    ]
    const pointerSizeValue = Number(testPointerSize.split('px')[0])

    testMove.forEach((item) => {
      const imgContainer = screen.getByTestId('img-container')
      fireEvent.mouseMove(imgContainer, {
        clientX: item.x,
        clientY: item.y
      })
      const pointer2 = screen.getByTestId('pointer')
      expect(pointer2.style.transform).toEqual(
        `translate(${item.x - pointerSizeValue / 2}px, ${
          item.y - pointerSizeValue / 2
        }px)`
      )
    })
  })

  it('should show the zoomed part whenever mouse move over the original image container', () => {
    const imgContainer = screen.getByTestId('img-container')
    expect(imgContainer).not.toBeNull()
    fireEvent.mouseMove(imgContainer)
    const zoomedPart = screen.queryByTestId('zoom-part')
    expect(zoomedPart).not.toBeNull()
  })

  it('should hide the zoomed part whenever mouse leave the original image container', () => {
    const imgContainer = screen.getByTestId('img-container')
    expect(imgContainer).not.toBeNull()
    fireEvent.mouseLeave(imgContainer)
    const zoomedPart = screen.queryByTestId('zoom-part')
    expect(zoomedPart).toBeNull()
  })
})
