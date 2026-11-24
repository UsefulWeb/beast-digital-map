import {
  getFamilyMapPrefetch,
  getHomeCriticalAssets,
  getMapsByFamily,
  MAP_FAMILIES,
  MapFamily,
  type MapFamily as MapFamilyId,
} from '@entities/map'
import { BASE_URL } from '@shared/config'
import { injectAssetHints, useAssetsProgress } from '@shared/lib'
import { BackButton, Button, ErrorFallback, LoadingGate } from '@shared/ui'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'wouter'
import { Credits } from '../Credits'
import { HomeLayout } from '../HomeLayout'
import { HomeLogo } from '../HomeLogo'
import * as C from './Home.components'

const logo = `${BASE_URL}images/ui/logo.avif`

export const Home = () => {
  const [, setLocation] = useLocation()
  const [family, setFamily] = useState<MapFamilyId | null>(null)
  const [retryKey, setRetryKey] = useState(0)
  const homeAssets = useMemo(() => getHomeCriticalAssets(), [])
  const { progress, ready, error } = useAssetsProgress(
    homeAssets,
    true,
    retryKey,
  )

  const maps = family ? getMapsByFamily(family) : []

  useEffect(() => {
    injectAssetHints(homeAssets, { rel: 'preload', as: 'image' })
  }, [homeAssets])

  useEffect(() => {
    if (!family) {
      return
    }
    injectAssetHints(getFamilyMapPrefetch(family), {
      rel: 'prefetch',
      as: 'image',
    })
  }, [family])

  if (error) {
    return (
      <ErrorFallback
        title="Failed to load home"
        message={error.message}
        onRetry={() => setRetryKey((value) => value + 1)}
      />
    )
  }

  return (
    <LoadingGate ready={ready} progress={progress}>
      <HomeLayout>
        <HomeLogo src={logo} alt="Beast logo" />
        <C.ButtonRow>
          {family === null
            ? MAP_FAMILIES.map((item) => (
                <Button key={item.id} onClick={() => setFamily(item.id)}>
                  {item.id === MapFamily.SHATTERED_ISLES ? (
                    <>
                      Shattered
                      <br />
                      Isles
                    </>
                  ) : (
                    item.title
                  )}
                </Button>
              ))
            : maps.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setLocation(`/map/${item.id}`)}
                >
                  {item.label[0]}
                  <br />
                  {item.label[1]}
                </Button>
              ))}
        </C.ButtonRow>
        {family !== null && (
          <C.BackSlot>
            <BackButton onClick={() => setFamily(null)} />
          </C.BackSlot>
        )}
        <Credits />
      </HomeLayout>
    </LoadingGate>
  )
}
