import {
  getMapsByFamily,
  MAP_FAMILIES,
  MapFamily,
  type MapFamily as MapFamilyId,
} from '@entities/map'
import { BASE_URL } from '@shared/config'
import { Button, Stack } from '@shared/ui'
import { useState } from 'react'
import { useLocation } from 'wouter'
import { Credits } from './Credits'
import { HomeLayout } from './HomeLayout'
import { HomeLogo } from './HomeLogo'

const logo = `${BASE_URL}images/ui/logo.png`

export const Home = () => {
  const [, setLocation] = useLocation()
  const [family, setFamily] = useState<MapFamilyId | null>(null)

  const maps = family ? getMapsByFamily(family) : []

  return (
    <HomeLayout>
      <HomeLogo src={logo} alt="Beast logo" />
      <Stack align="center" gap={10}>
        {family === null ? (
          MAP_FAMILIES.map((item) => (
            <Button
              key={item.id}
              variant="fixed"
              onClick={() => setFamily(item.id)}
            >
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
        ) : (
          <>
            {maps.map((item) => (
              <Button
                key={item.id}
                variant="fixed"
                onClick={() => setLocation(`/map/${item.id}`)}
              >
                {item.label[0]}
                <br />
                {item.label[1]}
              </Button>
            ))}
            <Button variant="fixed" onClick={() => setFamily(null)}>
              Back
            </Button>
          </>
        )}
      </Stack>
      <Credits />
    </HomeLayout>
  )
}
