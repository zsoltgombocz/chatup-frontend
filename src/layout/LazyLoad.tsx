import React, { ReactNode, Suspense } from 'react'

type Props = {
  children: string | ReactNode | undefined
}

const LazyLoad = ({ children }: Props) => {
  return <Suspense fallback={<>loading</>}>{children}</Suspense>
}

export default LazyLoad