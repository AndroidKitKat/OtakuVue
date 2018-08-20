import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MainLayout from '@layouts/MainLayout'
import TestHelpers from '@src/../tests/helpers'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MainLayout.vue', () => {
  let wrapper
  let store
  // eslint-disable-next-line
  let h
  beforeEach(() => {
    store = new Vuex.Store({})
    wrapper = shallowMount(MainLayout, {
      localVue,
      store,
      slots: {
        default: '<div class="default"></div>',
        header: '<div class="header"></div>',
        main: '<div class="main"></div>',
        footer: '<div class="footer"></div>',
      },
      mocks: {},
      stubs: {},
    })
    h = new TestHelpers(wrapper, expect)
  })

  it('MainLayout component mounts without errors', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  let slotSelectors = ['.header', '.main', '.footer']

  slotSelectors.forEach(selector => {
    it('If slot is populated with an element with the selector ' + selector, () => {
      h.domHas(selector)
    })
  })
})
