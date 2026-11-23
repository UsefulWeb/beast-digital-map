import { Home, Route } from '@pages/index'
import { Router, Switch, Route as WouterRoute } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
import { AppShell } from '../ui'

export const RouterProvider = () => (
  <Router hook={useHashLocation}>
    <AppShell>
      <Switch>
        <WouterRoute path="/" component={Home} />
        <WouterRoute path="/map/:type" component={Route} />
      </Switch>
    </AppShell>
  </Router>
)
