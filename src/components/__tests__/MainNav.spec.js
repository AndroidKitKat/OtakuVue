import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MainNav from '@components/MainNav'
import TestHelpers from '@src/../tests/helpers'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

describe('MainNav.vue', () => {
  let wrapper
  let store
  // eslint-disable-next-line
  let h
  beforeEach(() => {
    store = new Vuex.Store({})
    wrapper = shallowMount(MainNav, {
      localVue,
      store,
      mocks: {},
      stubs: {},
    })
    h = new TestHelpers(wrapper, expect)
  })

  it('Main component mounts without errors', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  let classesSelectors = ['#header__nav', '.header__nav', '.nav']

  classesSelectors.forEach(selector => {
    it(selector + ' has class set', () => {
      h.domHas(selector)
    })
  })

  classesSelectors.forEach(selector => {
    it('If ' + selector + ' has the role attribute', () => {
      h.hasAttribute(selector, 'role')
    })
  })
})
