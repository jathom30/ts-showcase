import * as React from 'react';

type SizeType = 's' | 'm' | 'l'

interface BasicBoxType {
  padding?: SizeType
}

type BoxType = ({
  kind?: undefined
  flexDirection?: undefined
  gap?: undefined
  minWidth?: undefined
  alignItems?: undefined
  justifyContent?: undefined
  autoFill?: undefined
  autoFit?: undefined
} | {
  kind: 'flex'
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  gap?: SizeType
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch'
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'
  minWidth?: undefined
  autoFill?: undefined
  autoFit?: undefined
} | {
  kind: 'grid'
  flexDirection?: undefined
  gap?: SizeType
  alignItems?: undefined
  justifyContent?: undefined
  minWidth?: string
  autoFill?: boolean
  autoFit?: undefined
} | {
  kind: 'grid'
  flexDirection?: undefined
  gap?: SizeType
  alignItems?: undefined
  justifyContent?: undefined
  minWidth?: string
  autoFit?: boolean
  autoFill?: undefined
}) & BasicBoxType

export const Box: React.FC<BoxType> = ({
  children,
  kind,
  flexDirection = 'row',
  gap,
  alignItems,
  justifyContent,
  minWidth,
  padding,
  autoFill = false,
  autoFit = false,
}) => {

  const size = (measurement: SizeType) => {
    switch (measurement) {
      case 's':
        return '.5rem'
      case 'm':
        return '1rem'
      case 'l':
        return '2rem'
    }
  }
  const style = {
    ...(kind ? {display: kind} : null),
    ...(flexDirection ? {flexDirection} : null),
    ...(alignItems ? {alignItems} : null),
    ...(justifyContent ? {justifyContent} : null),
    ...(gap ? {gap: size(gap)} : null),
    ...(padding ? {padding: size(padding)} : null),
    ...(autoFill ? {gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth || 0}, 1fr)`} : null),
    ...(autoFit ? {gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth || 0}, 1fr)`} : null),
  }

  return (
    <div className="Box" style={style}>{children}</div>
  )
}
