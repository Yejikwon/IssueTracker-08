import * as config from '../config';

export const GET_ISSUE = (id) => config.BASE_URL + 'api/issues/' + id;

export const GET_AUTH = config.BASE_URL + 'auth/';

export const POST_ISSUE = config.BASE_URL + 'api/issues';

export const GET_LABELS = config.BASE_URL + 'api/labels';

export const POST_LABEL = config.BASE_URL + 'api/labels';

export const DELETE_LABELS = (id) => config.BASE_URL + 'api/labels/' + id;

export const GET_OPEN_ISSUE = config.BASE_URL + 'api/issues/open';

export const GET_CLOSED_ISSUE = config.BASE_URL + 'api/issues/closed';

export const GET_ALL_USERS = config.BASE_URL + 'api/users';
