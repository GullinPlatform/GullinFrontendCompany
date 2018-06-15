import Router from 'vue-router'
import store from '../store/index'

// Views
import UserLoginView from '../views/main_pages/user_auth/UserLogin'
import UserForgetPasswordView from '../views/main_pages/user_auth/ForgetPassword'

import DashboardView from '../views/main_pages/dashboard/Dashboard'

import KYCDataView from '../views/main_pages/kyc_data/KYCData'
import WhitelistView from '../views/main_pages/whitelist/Whitelist'

import SettingsView from '../views/main_pages/settings/Settings'
import SettingsSecurityView from '../views/main_pages/settings/SettingsSecurity'

// Error Pages
import NotFoundView from '../views/error_pages/404'

// Permissions
const isNotAuthenticated = (to, from, next) => {
  // If already login
  if (store.getters.is_login) {
    // If verification_level > 2 (wallet created), then load wallet and go to dashboard
    return next({ name: 'dashboard', params: { company: store.getters.me_company } })
  }
  // Else Refresh token
  store.dispatch('refresh')
    .then(() => {
      // If logged in, then check if verification_level < 2 (wallet not created)
      if (store.getters.verification_level < 2) return next({ name: 'user_signup_followup' })
      // If verification_level > 2 (wallet created), then load wallet and go to dashboard
      return store.dispatch('getWallet').then(() => next({ name: 'dashboard', params: { company: store.getters.me_company } }))
    })
    // After refresh, if still logged out, go to login page
    .catch(() => next())
}

const isAuthenticated = (to, from, next) => {
  // If already login
  if (store.getters.is_login)
  // Load wallet and go to the destination
    return store.dispatch('getWallet').then(() => next())

  // Else Refresh token
  store.dispatch('refresh')
    .then(() => {
      // Load wallet and go to the destination
      return store.dispatch('getWallet').then(() => next())
    })
    // After refresh, if still logged out, go to login page
    .catch(() => next({ name: 'user_login' }))
}


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'user_login' },
    }, {
      path: '/login',
      component: UserLoginView,
      name: 'user_login',
      beforeEnter: isNotAuthenticated,
    }, {
      path: '/forget_password',
      component: UserForgetPasswordView,
      name: 'user_forget_password',
      beforeEnter: isNotAuthenticated,
    }, {
      path: '/:company/dashboard',
      component: DashboardView,
      name: 'dashboard',
      beforeEnter: isAuthenticated,
    }, {
      path: '/:company/whitelist',
      component: WhitelistView,
      name: 'whitelist',
      beforeEnter: isAuthenticated,
    }, {
      path: '/:company/kyc_data',
      component: KYCDataView,
      name: 'kyc_data',
      beforeEnter: isAuthenticated,
    }, {
      path: '/:company/settings',
      component: SettingsView,
      name: 'settings',
      beforeEnter: isAuthenticated,
    }, {
      path: '/:company/settings/security',
      component: SettingsSecurityView,
      name: 'settings_security',
      beforeEnter: isAuthenticated,
    }, {
      // not found handler
      path: '/404',
      component: NotFoundView,
      name: '404',
    }, {
      path: '*',
      redirect: { name: '404' },
    }],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  },
})
