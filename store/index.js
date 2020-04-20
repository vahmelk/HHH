import Vuex from 'vuex'
import tasks from '~/static/datas'
import time from '~/static/time'

export const store = new Vuex.Store({
    state: {
        page: '',
        token: '',
        topic: null,
        tasks,
        time
    },
    mutations: {
        SET_PAGE(state, { token, page }) {
            state.page = page
            state.token = token
        },
        SET_TOPIC(state, topic) {
            state.topic = topic
        },
        REOLAD(state) {
            state.tasks = tasks
        }
    },
    actions: {
        setCurrentPageTO({ commit }, data) {
            commit('SET_PAGE', data)
        },
        setTopic({ commit }, topic) {
            commit('SET_TOPIC', topic)
        },
        reload({ commit }) {
            console.log('Action')
            commit('REOLAD')
        }
    },
    getters: {
        getToken: state => () => {
            return state.token
        },
        getTopic: state => () => {
            return state.topic || tasks[0]
        },
        getTasks: state => () => {
            return state.tasks || []
        }
    }
})
