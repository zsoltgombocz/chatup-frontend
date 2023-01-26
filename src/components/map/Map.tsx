import React from 'react'
import { MapStructure } from '../../config/mapConfig';
import County from './County';
import { motion as m } from 'framer-motion';
import { County as CountyEnum, CountyInterface } from '../../utils/map.types';
import { useUserSettings } from '../../store/userSettings';

type Props = {
  className?: string,
}

const Map = ({ className }: Props) => {
  const setCounty = useUserSettings(state => state.setMap);
  const mapState = useUserSettings(state => state.map);
  const onCountyClicked = (id: CountyEnum, b: boolean) => {
    setCounty(id, b);
  }
  return (
    <m.svg className={'map ' + className} xmlns-svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" id="svg2" viewBox="-25 -100 1100 900" width={'100%'}>
      {MapStructure.counties.map((county: CountyInterface) =>
        <County
          selected={mapState.allSelected || mapState.counties.filter(c => c.id === county.id)[0]?.selected || false}
          onCountyClicked={onCountyClicked}
          path={county.path} id={county.id}
        />)}
    </m.svg>
  )
}

export default Map