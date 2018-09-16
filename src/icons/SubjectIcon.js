import React from 'react'
import PropTypes from 'prop-types'

import {ICON_TEXT_COLOR, RANK_COLOR} from './iconConstants'

const SubjectIcon = ({scale = 1}) => (
  <svg
    height='46'
    transform={`scale(${scale})`}
    version='1.1'
    viewBox='0 0 41 46'
    width='41'
    x='0px'
    xmlns='http://www.w3.org/2000/svg'
    y='0px'
  >
    <defs>
      <filter
        filterUnits='objectBoundingBox'
        height='150%'
        id='subject-icon-filter'
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
      filter='url(#subject-icon-filter)'
      transform='translate(5 1)'
    >
      <path
        d='M15.5 36C16.651 36 31 22.723 31 14.638 31 6.554 24.06 0 15.5 0 6.94 0 0 6.554 0 14.638 0 22.723 14.349 36 15.5 36z'
        fill={RANK_COLOR}
        stroke={ICON_TEXT_COLOR}
        strokeWidth='1.8'
      />
      <path
        d='M14.467 21.857v-5.445h3.358v5.445h4.198v-7.26h2.519l-8.396-8.168-8.396 8.168h2.519v7.26z'
        fill={ICON_TEXT_COLOR}
        fillOpacity='.8'
      />
    </g>
  </svg>
)

SubjectIcon.propTypes = {
  scale: PropTypes.number
}

export default SubjectIcon
