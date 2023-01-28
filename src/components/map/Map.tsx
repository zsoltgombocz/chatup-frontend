import React from 'react'
import { MapStructure } from '../../config/mapConfig';
import County from './County';
import { motion as m } from 'framer-motion';
import { County as CountyEnum, CountyInterface } from '../../utils/interfaces/map';
import { useMapPreferences } from '../../store/mapPreferences';

type Props = {
  className?: string,
}

const Map = ({ className }: Props) => {
  const updateCounty = useMapPreferences(state => state.updateCounty);
  const counties = useMapPreferences(state => state.counties);
  const checkbox = useMapPreferences(state => state.mapCheckbox);

  const onCountyClicked = (id: CountyEnum, b: boolean) => {
    if (checkbox === 0) {
      updateCounty('all', false);
    }

    updateCounty(id, b);
  }
  return (
    <m.svg className={'map ' + className} xmlns-svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" id="svg2" viewBox="-25 -100 1100 900" width={'100%'}>
      {MapStructure.counties.map((county: CountyInterface) =>
        <County
          key={county.id}
          disabled={checkbox === 0}
          selected={checkbox === 0 ? true : (counties.includes(county.id) || false)}
          onCountyClicked={onCountyClicked}
          path={county.path} id={county.id}
        />)}
    </m.svg>
  )
}

export default Map