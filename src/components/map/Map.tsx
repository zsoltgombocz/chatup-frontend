import React from 'react'
import { MapStructure } from '../../config/mapConfig';
import County from './County';
import { motion as m } from 'framer-motion';

type Props = {
  className?: string,
}

function Map({ className }: Props) {
  return (
    <m.svg className={'map ' + className} xmlns-svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" id="svg2" viewBox="-25 -100 1100 900" width={'100%'}>
      {MapStructure.counties.map(county => <County path={county.path} id={county.id} />)}
    </m.svg>
  )
}

export default Map