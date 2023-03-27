function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/signup'),
    verify: path(ROOTS_AUTH, '/verify'),
}

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
      app: path(ROOTS_DASHBOARD, '/app')
    },
    // ROOT MENU
    cases: {
      root: path(ROOTS_DASHBOARD, '/cases'),
      list: path(ROOTS_DASHBOARD, '/cases/list'),
      show: path(ROOTS_DASHBOARD, '/cases/show/:id'),
      add: path(ROOTS_DASHBOARD, '/cases/add'),
      edit: path(ROOTS_DASHBOARD, '/cases/edit/:id'),
    },
    suits: {
      root: path(ROOTS_DASHBOARD, '/suits'),
      list: path(ROOTS_DASHBOARD, '/suits/list'),
      show: path(ROOTS_DASHBOARD, '/suits/show/:id'),
      add: path(ROOTS_DASHBOARD, '/suits/add'),
      edit: path(ROOTS_DASHBOARD, '/suits/edit/:id')
    },
  };