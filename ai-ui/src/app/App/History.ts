import { createBrowserHistory, History as RouterHistory } from 'history';
export class History {
  public static current: RouterHistory = createBrowserHistory();
}
