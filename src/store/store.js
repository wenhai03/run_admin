import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 初始化状态
const state = {
  count: 0
}

//包含多个对应事件回调函数的对象
const actions = {
  increment ({commit}) {
    commit('ADD')
  },
  decrement ({commit}) {
    commit('DEL')
  },
  oddIf ({commit, state}) {
    if (state.count % 2 === 0) {
      commit('ODDIF')
    }
  },
  increment1 ({commit}) {
    setTimeout(() => {
      commit('ADD')
    }, 1000)
  }
}

//包含多个更新state函数的对象
const mutations = {
  ADD () {
    state.count++
  },
  DEL () {
    state.count--
  },
  ODDIF () {
    state.count++
  }
}
const getters = {
  evenOrOdd (state) { // 不需要调用，只需要读取
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
