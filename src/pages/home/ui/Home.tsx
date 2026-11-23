import { MAP_CATALOG, type MapId } from '@entities/map'
import { BASE_URL } from '@shared/config'
import { Button, Stack } from '@shared/ui'
import { useLocation } from 'wouter'
import { Credits } from './Credits'
import { HomeLayout } from './HomeLayout'
import { HomeLogo } from './HomeLogo'

const logo = `${BASE_URL}images/ui/logo.png`

export const Home = () => {
  const [, setLocation] = useLocation()

  return (
    <HomeLayout>
      <HomeLogo src={logo} alt="Beast logo" />
      <Stack align="center" gap={10}>
        {MAP_CATALOG.map((item) => (
          <Button
            key={item.id}
            variant="fixed"
            onClick={() => setLocation(`/map/${item.id as MapId}`)}
          >
            {item.title.includes('Northern') ? (
              <>
                the Northern
                <br />
                Expanse
              </>
            ) : (
              <>
                the <br />
                Drenched Lands
              </>
            )}
          </Button>
        ))}
      </Stack>
      <Credits />
    </HomeLayout>
  )
}
