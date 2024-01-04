import { useEffect, useState } from 'react'
import { MapStructure } from '@config/mapConfig';
import { motion as m } from 'framer-motion';
import { CountyInterface } from '@utils/interfaces/map';
import { useMapPreferences } from '@store/mapPreferences';
import { useUserSettings } from '@store/userSettings';
import { County as CountyEnum } from '@utils/enums';

type Props = {
  className?: string,
}

type CountyProps = {
  path: string,
  id: string,
  onCountyClicked: Function | undefined,
  selected: boolean,
  disabled: boolean,
}

const Map = ({ className }: Props) => {
  const updateCounty = useMapPreferences(state => state.updateCounty);
  const counties = useMapPreferences(state => state.counties);
  const checkbox = useMapPreferences(state => state.mapCheckbox);

  const onCountyClicked = (id: CountyEnum, b: boolean) => {
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

const County = ({ path, id, onCountyClicked, selected, disabled }: CountyProps) => {
  const [countyState, setCountyState] = useState(selected);
  const userColor = useUserSettings(state => state.color);

  useEffect(() => {
    setCountyState(selected);
  }, [selected])

  return (
    <m.path
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      onClick={() => {
        if (disabled) return;

        const state = !countyState;
        onCountyClicked?.(id, state);
        setCountyState(state);
      }}
      className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} county stroke-bg-dark-outer dark:stroke-bg-light-outer stroke-1 ${countyState ? 'fill-' + userColor : 'fill-bg-light-inner dark:fill-bg-dark-inner'}`}
      d={path} id={id}>
    </m.path >
  )
}

export default Map