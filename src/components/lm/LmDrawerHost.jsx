import React from 'react'
import { useLmDrawer } from './LmDrawerContext'
import LmAuthDrawer from './LmAuthDrawer'
import LmSubscribeDrawer from './LmSubscribeDrawer'

// Renders the drawers once at the app root; pages just call the context.
export default function LmDrawerHost() {
  const { drawer, close } = useLmDrawer()
  return (
    <>
      <LmAuthDrawer open={drawer?.type === 'auth'} onClose={close} />
      <LmSubscribeDrawer open={drawer?.type === 'subscribe'} slugs={drawer?.slugs || []} onClose={close} />
    </>
  )
}
