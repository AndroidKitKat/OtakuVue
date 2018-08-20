import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Main from '@layouts/Main'
import TestHelpers from '@src/../tests/helpers'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Main.vue', () => {
  let wrapper
  let store
  // eslint-disable-next-line
  let h
  beforeEach(() => {
    store = new Vuex.Store({})
    wrapper = shallowMount(Main, {
      localVue,
      store,
      slots: {
        default: '<div class="default"></div>',
      },
      mocks: {},
      stubs: {},
    })
    h = new TestHelpers(wrapper, expect)
  })

  it('Main component mounts without errors', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  let classesSelectors = ['#main', '.main']

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

  let slotSelectors = ['.default']

  slotSelectors.forEach(selector => {
    it('If slot is populated with an element with the selector ' + selector, () => {
      h.domHas(selector)
    })
  })
})
