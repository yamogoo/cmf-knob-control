import { CMF_PREFIX } from '@/router/urls'

export const _ROOT_PATH_PREFIX = CMF_PREFIX

export const PageURLS = {
  SPLASH: 'splashscreen',
  STANDBY: 'standby'
}

export enum PageTitles {
  SPLASHSCREEN = 'Splashscreen',
  STANDBY_SCREEN = 'Standby'
}

export const absoluteUrls = {
  BASE: `${_ROOT_PATH_PREFIX}`,
  SPLASH: `${_ROOT_PATH_PREFIX}/${PageURLS.SPLASH}`,
  STANDBY: `${_ROOT_PATH_PREFIX}/${PageURLS.STANDBY}`
}
