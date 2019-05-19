/* eslint-disable no-console */
import React from 'react'
import { mount } from 'enzyme'
import styled from 'styled-components'
import { th } from './th'

describe('#th', () => {
  let consoleError

  beforeEach(() => {
    consoleError = console.error
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = consoleError
  })

  it('warn if value is not found', () => {
    expect(th('foo')({})).toBe(undefined)
    expect(console.error).toHaveBeenCalledWith('value "foo" not found in theme')
  })
})

describe.each([
  [
    'color',
    {
      cssProp: 'color',
      expectations: [['#000', '#000'], ['primary', 'red']],
      theme: { colors: { primary: 'red' } },
    },
  ],
  [
    'px',
    {
      cssProp: 'margin',
      expectations: [[0, 0], [1, '1px'], [-1, '-1px']],
    },
  ],
  [
    'percent',
    {
      cssProp: 'margin',
      expectations: [
        [0, 0],
        [0.1, '10%'],
        [1, '100%'],
        [2, '2px'],
        [-0.1, '-10%'],
        [-2, '-2px'],
      ],
    },
  ],
  [
    'radius',
    {
      cssProp: 'border-radius',
      expectations: [[0, 0], [1, '1px'], [-1, '-1px'], ['sm', '4px']],
      theme: { radii: { sm: 4 } },
    },
  ],
  [
    'border',
    {
      cssProp: 'border',
      expectations: [
        [0, 0],
        [1, '1px solid'],
        ['2px dashed', '2px dashed'],
        ['red', '1px solid red'],
      ],
      theme: { borders: { red: '1px solid red' } },
    },
  ],
  [
    'borderStyle',
    {
      cssProp: 'border-style',
      expectations: [['solid', 'solid'], ['s', 'solid']],
      theme: { borderStyles: { s: 'solid' } },
    },
  ],
  [
    'shadow',
    {
      cssProp: 'box-shadow',
      expectations: [
        ['none', 'none'],
        ['2px 2px', '2px 2px'],
        ['sm', '5px 5px'],
      ],
      theme: { shadows: { sm: '5px 5px' } },
    },
  ],
  [
    'width',
    {
      cssProp: 'width',
      expectations: [
        [0, '0'],
        [5, '5px'],
        [1, '10px'],
        [0.2, '20%'],
        ['200%', '200%'],
      ],
      theme: { widths: [0, 10, 20] },
    },
  ],
  [
    'height',
    {
      cssProp: 'height',
      expectations: [
        [0, '0'],
        [5, '5px'],
        [1, '10px'],
        [0.2, '20%'],
        ['200%', '200%'],
      ],
      theme: { heights: [0, 10, 20] },
    },
  ],
  [
    'maxWidth',
    {
      cssProp: 'max-width',
      expectations: [
        [0, '0'],
        [5, '5px'],
        [1, '10px'],
        [0.2, '20%'],
        ['200%', '200%'],
      ],
      theme: { maxWidths: [0, 10, 20] },
    },
  ],
  [
    'maxHeight',
    {
      cssProp: 'max-height',
      expectations: [
        [0, '0'],
        [5, '5px'],
        [1, '10px'],
        [0.2, '20%'],
        ['200%', '200%'],
      ],
      theme: { maxHeights: [0, 10, 20] },
    },
  ],
  [
    'minWidth',
    {
      cssProp: 'min-width',
      expectations: [
        [0, '0'],
        [5, '5px'],
        [1, '10px'],
        [0.2, '20%'],
        ['200%', '200%'],
      ],
      theme: { minWidths: [0, 10, 20] },
    },
  ],
  [
    'minHeight',
    {
      cssProp: 'min-height',
      expectations: [
        [0, '0'],
        [5, '5px'],
        [1, '10px'],
        [0.2, '20%'],
        ['200%', '200%'],
      ],
      theme: { minHeights: [0, 10, 20] },
    },
  ],
  [
    'size',
    {
      cssProp: 'width',
      expectations: [
        [0, '0'],
        [5, '5px'],
        [1, '10px'],
        [0.2, '20%'],
        ['200%', '200%'],
      ],
      theme: { sizes: [0, 10, 20] },
    },
  ],
  [
    'zIndex',
    {
      cssProp: 'z-index',
      expectations: [[0, '0'], [5, '5'], ['modal', '200']],
      theme: { zIndices: { modal: '200' } },
    },
  ],
  [
    'space',
    {
      cssProp: 'margin',
      expectations: [
        [0, 0],
        [0.1, '0.1px'],
        [1, '4px'],
        [2, '8px'],
        [-0.1, '-0.1px'],
        [-2, '-8px'],
      ],
    },
  ],
  [
    'font',
    {
      cssProp: 'font',
      expectations: [['arial', 'arial'], ['serif', 'times']],
      theme: { fonts: { serif: 'times' } },
    },
  ],
  [
    'fontSize',
    {
      cssProp: 'font-size',
      expectations: [[0, 0], [1, '12px'], [40, '40px']],
    },
  ],
  [
    'lineHeight',
    {
      cssProp: 'line-height',
      expectations: [[0, 0], [1, 1], ['40px', '40px'], ['sm', '20px']],
      theme: { lineHeights: { sm: '20px' } },
    },
  ],
  [
    'fontWeight',
    {
      cssProp: 'font-weight',
      expectations: [['bold', 'bold'], [200, '200'], ['medium', '500']],
      theme: { fontWeights: { medium: 500 } },
    },
  ],
  [
    'letterSpacing',
    {
      cssProp: 'letter-spacing',
      expectations: [[0, '0'], [3, '3px'], ['sm', '2px']],
      theme: { letterSpacings: { sm: 2 } },
    },
  ],
])('#%s', (name, config) => {
  const util = th[name]

  it.each(config.expectations)(
    'accepts "%s" and returns "%s"',
    (value, expected) => {
      const Dummy = styled.div`
        ${config.cssProp}: ${util(value)};
      `
      const wrapper = mount(<Dummy theme={config.theme} />)
      expect(wrapper).toHaveStyleRule(config.cssProp, String(expected))
    },
  )
})
