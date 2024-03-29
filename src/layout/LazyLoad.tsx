import React, { ReactNode, Suspense } from 'react'
import LoadingIcon from '@atoms/LoadingIcon'

type Props = {
  children: string | ReactNode | undefined
}

const LazyLoad = ({ children }: Props) => {
  return <Suspense fallback={
    <div className={'bg-bg-light-inner dark:bg-bg-dark-inner h-full w-full flex items-center justify-center'}><LoadingIcon /></div>}>
    {children}
  </Suspense>;
}

export default LazyLoad