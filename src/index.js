import fs from 'fs'
import path from 'path'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {convert} from 'convert-svg-to-png'

import Queue from './Queue'
import {CompIcon, SubjectIcon} from './icons'
import {
  LISTING,
  SALE,
  MLS,
  PUBLIC,
  REPORT_SUPPLIED,
  USER_ENTERED,
  SUBJECT
} from './icons/iconConstants'

(async function () {
  await generateIcons(100, 1)

  fs.readdir(path.resolve(__dirname, '../icons'), (err, files) => {
    if (err) {
      return err
    }

    console.log('files created', files.length)
  })

  return true
})()

// @flow
type mapIconTypes = SALE | LISTING | SUBJECT
type mapIconSources = MLS | PUBLIC | REPORT_SUPPLIED | USER_ENTERED

// @flow
async function generateIcons (maxClearRank: number, maxUserRank: number) {
  const conversions = [
    {
      name: SUBJECT,
      promise: convert(renderToString(<SubjectIcon />))
    },
    ...types(maxClearRank, maxUserRank)
  ]

  console.log('-------------------------------------------------------')
  console.log(`Converting ${conversions.length} svgs to png files`)
  console.log('-------------------------------------------------------')

  const convertIcons = new Queue(conversions, 5)
  convertIcons.processQueue(saveIcon).then(
    (data) => { console.log('Process', data) },
    (err) => { console.log(err) }
  )
}

// Add icon types
// @flow
function types (maxClearRank: number = 0, maxUserRank: number = 0) {
  const ICON_TYPES = [SALE, LISTING]
  let typesArray = []

  ICON_TYPES.forEach(type => {
    typesArray = typesArray.concat(...sources(type, maxClearRank, maxUserRank))
  })

  return typesArray
}

// Add Comp Sources
// @flow
function sources (type: mapIconTypes, maxClearRank: number = 0, maxUserRank: number = 0) {
  const SOURCE_TYPES = [MLS, USER_ENTERED]
  let sourcesArray = []

  SOURCE_TYPES.forEach(source => {
    sourcesArray = sourcesArray.concat(...clearRanks(type, source, maxClearRank, maxUserRank))
  })

  return sourcesArray
}

// Add Clear Rank
// @flow
function clearRanks (type: mapIconTypes, source: mapIconSources, maxClearRank: number = 0, maxUserRank: number = 0) {
  let rankedicons = []
  let i = maxClearRank

  while (i >= 0) {
    rankedicons = rankedicons.concat(...userRanks(type, source, i, maxUserRank))
    i--
  }

  return rankedicons
}

// Add User Rank
// @flow
function userRanks (type: mapIconTypes, source: mapIconSources, clearRank: number, maxUserRank: number) {
  const icons = []
  let i = maxUserRank

  while (i >= 0) {
    icons.push(icon(type, source, clearRank, i))
    i--
  }

  return icons
}

// Get icon
// @flow
function icon (type: mapIconTypes, source: mapIconSources, clearRank: number, userRank: number) {
  return {
    name: `COMP-${type}-${source}-cr${clearRank}-ur${userRank}`,
    svgString: renderToString(<CompIcon type={type} source={source} rank={clearRank} value={userRank} />)
  }
}

// @flow
function saveIcon ({svgString, name}: {}) {
  return convert(svgString).then((value) => {
    fs.writeFile(path.resolve(__dirname, `../icons/${name}.png`), value, (err) => {
      if (err) {
        throw err
      }
    })
  })
}
