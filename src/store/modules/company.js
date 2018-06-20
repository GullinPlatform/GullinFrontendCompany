import companyApi from '../../api/company-api'
import * as types from '../mutation-types'

// initial state
const state = {
  current_company: {},
  press_releases: [],
  whitelist: [],
}

const getters = {
  current_company: state => state.current_company,
  current_token_detail: state => state.current_company.token_detail,
  press_releases: state => state.press_releases,
}

const actions = {
  getWhitelist({ commit }, type) {
    return companyApi.getWhitelist(type)
      .then((response) => {
        commit(types.GET_WHITELIST, response)
        return Promise.resolve(response)
      })
      .catch(error => Promise.reject(error))
  },
  getCompany({ commit }, id) {
    return companyApi.getCompany(id)
      .then((response) => {
        commit(types.GET_COMPANY, response)
        return Promise.resolve(response)
      })
      .catch(error => Promise.reject(error))
  },
  listPressReleases({ commit }) {
    return companyApi.listPressReleases()
      .then((response) => {
        commit(types.LIST_PRESS_RELEASES, response)
        return Promise.resolve(response)
      })
      .catch(error => Promise.reject(error))
  },
}

const mutations = {
  [types.LIST_COMPANIES](state, response) {
    state.company_list = response
  },
  [types.GET_COMPANY](state, response) {
    state.current_company = response
  },
  [types.LIST_PRESS_RELEASES](state, response) {
    state.press_releases = response
  },
  [types.GET_WHITELIST](state, response){
    state.whtelist = response
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
