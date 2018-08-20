import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Copyright from '@components/Copyright'
import TestHelpers from '@src/../tests/helpers'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Copyright.vue', () => {
  let wrapper
  let store
  // eslint-disable-next-line
  let h
  beforeEach(() => {
    store = new Vuex.Store({})
    wrapper = shallowMount(Copyright, {
      localVue,
      store,
      mocks: {},
      stubs: {},
    })
    h = new TestHelpers(wrapper, expect)
  })

  it('Copyright component mounts without errors', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  let classesSelectors = ['#copyright', '.copyright']

  classesSelectors.forEach(selector => {
    it(selector + ' has class set', () => {
      h.domHas(selector)
    })
  })

  //console.log(process.env)

  classesSelectors.forEach(selector => {
    it(selector + ' contains text', () => {
      let title = process.env.VUE_APP_TITLE
      let date = new Date().getFullYear()
      h.containsText(selector, title + ' © ' + date)
    })
  })
})
