import {Page1} from './containers/Page1';
import {Page2} from './containers/Page2';

export const routes = [
  {
    component: Page1,
    exact: true,
    name: "page1",
    path: "/",
  },
  {
    component: Page2,
    exact: true,
    name: "page2",
    path: "/page2",
  }
];
