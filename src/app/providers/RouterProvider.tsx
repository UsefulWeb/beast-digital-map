import { Router, Switch, Route as WouterRoute } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
import { Home, Route } from '../../pages'
import S from './RouterProvider.module.scss'

export const RouterProvider = () => (
  <Router hook={useHashLocation}>
    <div className={S.app}>
      <Switch>
        <WouterRoute path="/" component={Home} />
        <WouterRoute path="/map/:type" component={Route} />
      </Switch>
    </div>
  </Router>
)
