import { Home, Route } from '@pages/index'
import { BASE_URL } from '@shared/config'
import { Router, Switch, Route as WouterRoute } from 'wouter'
import { AppShell } from '../ui'

const base = BASE_URL.replace(/\/$/, '')

export const RouterProvider = () => (
  <Router base={base}>
    <AppShell>
      <Switch>
        <WouterRoute path="/" component={Home} />
        <WouterRoute path="/map/:type" component={Route} />
      </Switch>
    </AppShell>
  </Router>
)
