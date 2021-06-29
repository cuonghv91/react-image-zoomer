import React from 'react'
import { ReactImageZoomer } from '.'
import { render } from '@testing-library/react'

describe('ReactImageZoomer component with default props', () => {
  test("It should display a message: 'You need to provide image url'", () => {
    render(<ReactImageZoomer />)
  })
})
