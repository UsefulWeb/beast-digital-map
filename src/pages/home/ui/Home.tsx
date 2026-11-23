import { useLocation } from 'wouter'
import { MapSelector } from '../../../components/organisms/MapSelector/MapSelector'
import { BASE_URL } from '../../../shared/config'
import { Credits } from './Credits'
import S from './Home.module.scss'

const logo = `${BASE_URL}images/logo_small.png`

export const Home = () => {
  const [, setLocation] = useLocation()
  const onMapSelect = (type: string) => {
    setLocation(`/map/${type}`)
  }

  return (
    <div className={S.container}>
      <div className={S.image__container}>
        <img className={S.logo} src={logo} alt="Beast logo" />
      </div>
      <MapSelector onSelect={onMapSelect} />
      <Credits />
    </div>
  )
}
