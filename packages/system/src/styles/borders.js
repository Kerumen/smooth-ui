import { style, themeGetter, compose } from '../style'
import { num } from '../util'
import { px } from '../unit'
import { getColor, getRadius } from './basics'

export const getBorder = themeGetter({
  themeKey: 'borders',
  transform: n => (num(n) && n > 0 ? `${n}px solid` : n),
})

export const border = style({
  prop: 'border',
  themeGet: getBorder,
})

export const borderTop = style({
  prop: 'borderTop',
  themeGet: getBorder,
})

export const borderTopColor = style({
  prop: 'borderTopColor',
  themeGet: getColor,
})

export const borderRight = style({
  prop: 'borderRight',
  themeGet: getBorder,
})

export const borderRightColor = style({
  prop: 'borderRightColor',
  themeGet: getColor,
})

export const borderBottom = style({
  prop: 'borderBottom',
  themeGet: getBorder,
})

export const borderBottomColor = style({
  prop: 'borderBottomColor',
  themeGet: getColor,
})

export const borderLeft = style({
  prop: 'borderLeft',
  themeGet: getBorder,
})

export const borderLeftColor = style({
  prop: 'borderLeftColor',
  themeGet: getColor,
})

export const borderColor = style({
  prop: 'borderColor',
  themeGet: getColor,
})

const getBorderWidth = themeGetter({
  themeKey: 'borderWidths',
  transform: px,
})

export const borderWidth = style({
  prop: 'borderWidth',
  themeGet: getBorderWidth,
})

export const getBorderStyle = themeGetter({
  themeKey: 'borderStyles',
})

export const borderStyle = style({
  prop: 'borderStyle',
  themeGet: getBorderStyle,
})

export const borderRadius = style({
  prop: 'borderRadius',
  themeGet: getRadius,
})

export const getShadow = themeGetter({
  themeKey: 'shadows',
})

export const boxShadow = style({
  prop: 'boxShadow',
  themeGet: getShadow,
})

export const borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor,
  borderWidth,
  borderStyle,
  borderRadius,
  boxShadow,
)
