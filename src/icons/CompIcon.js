import React from 'react'
import PropTypes from 'prop-types'
import {
  ICON_TEXT_COLOR,
  LISTING_COLOR,
  LISTING,
  SALE_COLOR,
  SALE,
  MLS,
  PUBLIC,
  REPORT_SUPPLIED,
  USER_ENTERED
} from './iconConstants'

function getColors (type, source) {
  let fillColor = ICON_TEXT_COLOR
  let textColor = type === SALE ? SALE_COLOR : LISTING_COLOR

  if (source === REPORT_SUPPLIED || source === USER_ENTERED) {
    textColor = ICON_TEXT_COLOR
    fillColor = type === SALE ? SALE_COLOR : LISTING_COLOR
  }

  return {textColor, fillColor}
}

const CompIcon = ({type, value, rank, source, scale = 1}) => {
  const rankTransform = transformRankText(rank)
  const valueTransform = transformValueText(value)
  const {textColor, fillColor} = getColors(type, source)

  return (
    <svg
      height='50'
      transform={`scale(${scale})`}
      version='1.1'
      viewBox='0 0 45 50'
      width='45'
      x='0px'
      xmlns='http://www.w3.org/2000/svg'
      y='0px'
    >
      <defs>
        <filter
          filterUnits='objectBoundingBox'
          height='150%'
          id='comp-icon-filter'
          width='158.1%'
          x='-29%'
          y='-13.9%'
        >
          <feOffset dy='4' in='SourceAlpha' result='shadowOffsetOuter1' />
          <feGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='2' />
          <feColorMatrix in='shadowBlurOuter1' result='shadowMatrixOuter1' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0' />
          <feMerge>
            <feMergeNode in='shadowMatrixOuter1' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      <g
        fill='none'
        fillRule='evenodd'
        filter='url(#comp-icon-filter)'
      >
        <path
          d='M16.5,48.2c1.2,0,15.5-13.3,15.5-21.4s-6.9-14.6-15.5-14.6S1,18.7,1,26.8S15.4,48.2,16.5,48.2z'
          fill={fillColor}
          stroke={textColor}
          strokeWidth='2'
        />
        <text
          fill={textColor}
          fontFamily='Arial'
          fontSize={valueTransform.fontSize}
          fontWeight='400'
          transform={valueTransform.transform}
        >{value}</text>
      </g>

      {rank && (
        <g>
          <circle
            cx='32.8'
            cy='12.2'
            fill='#000000'
            r='11.2'
            stroke={'#FFFFFF'}
          />
          <text
            fill={'#FFFFFF'}
            fontFamily='Arial'
            fontSize={rankTransform.fontSize}
            transform={rankTransform.transform}
          >{rank}</text>
        </g>
      )}
    </svg>
  )
}

// @flow
function transformValueText (value: number = 0) {
  let fontSize = '18'
  let x = 11.5
  let y = 35

  if (value >= 100) {
    // x = 20
    fontSize = '14'
    x = 5
    y = 33
  } else if (value >= 10) {
    x = 6
  }

  return {
    fontSize,
    transform: `matrix(1 0 0 1 ${x} ${y})`
  }
}

// @flow
function transformRankText (rank: number = 0) {
  let fontSize = '14'
  let x = 29
  let y = 17

  if (rank >= 100) {
    x = 23
    y = 16
    fontSize = '11'
  } else if (rank >= 10) {
    x = 25
  }

  return {
    fontSize,
    transform: `matrix(1 0 0 1 ${x} ${y})`
  }
}

CompIcon.propTypes = {
  rank: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  scale: PropTypes.number,
  type: PropTypes.oneOf([SALE, LISTING]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  source: PropTypes.oneOf([
    MLS,
    PUBLIC,
    REPORT_SUPPLIED,
    USER_ENTERED
  ])
}

export default CompIcon
