import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import { nextTick } from 'vue'

import CarouselStack from './CarouselStack.vue'

describe('CarouselStack', () => {
  describe('carousel-slider__item', () => {
    describe('Attributes', () => {
      test.each([
        [2, 0],
        [3, 0]
      ])('should render %i items DOM element', async (items, sid) => {
        const component = mount(CarouselStack, {
          props: {
            sid,
            items
          }
        })

        await nextTick()

        const itemEls = component.findAll('[data-testid="carousel-stack__item"]')

        expect(itemEls.length).toBe(items)
        expect(itemEls.length).toMatchSnapshot()
      })

      test.each([
        [2, 0],
        [3, 0]
      ])('should have the id attr range (0 < %i)', async (items, sid) => {
        const component = mount(CarouselStack, {
          props: {
            sid,
            items
          }
        })

        await nextTick()

        const itemEls = component.findAll('[data-testid="carousel-stack__item"]')

        for (let idx = 0; idx < itemEls.length; idx++) {
          expect(itemEls[idx].attributes('id')).toBe(`${idx}`)
          expect(itemEls[idx].attributes('id')).toMatchSnapshot()
        }
      })
    })

    describe('Slots', () => {
      test.each(['<p>Default slot content</p>'])(
        'should render the "default" slot content (%s)',
        (defaultSlotContent) => {
          const component = mount(CarouselStack, {
            props: {
              sid: 0,
              items: 1
            },
            slots: {
              default: defaultSlotContent
            }
          })

          const html = component.findAll('[data-testid="carousel-stack__item"]')[0].html()
          expect(html).toContain(defaultSlotContent)
          expect(html).toMatchSnapshot()
        }
      )

      test.each(['<p>Named slot content</p>'])(
        'should render the "named" slot content (%s)',
        (slideSlotContent) => {
          const component = mount(CarouselStack, {
            props: {
              sid: 0,
              items: 1
            },
            slots: {
              slide_0: slideSlotContent
            }
          })

          const html = component.findAll('[data-testid="carousel-stack__item"]')[0].html()
          expect(html).toContain(slideSlotContent)
          expect(html).toMatchSnapshot()
        }
      )
    })
  })

  describe('pagination', () => {
    test.each([
      [2, true],
      [3, true]
    ])(
      'should show MainPagination if items > 1 && showPagination: true',
      (items, showPagination) => {
        const component = mount(CarouselStack, {
          props: {
            sid: 0,
            items,
            showPagination
          }
        })

        expect(component.getComponent({ name: 'MainPagination' }))
      }
    )

    test.each([
      [1, true],
      [0, true],
      [2, false],
      [1, false]
    ])(
      'should not render MainPagination if items count = %i and showPagination = %b',
      (items, showPagination) => {
        const component = mount(CarouselStack, {
          props: {
            sid: 0,
            items,
            showPagination
          }
        })

        const pagination = component.find('[data-testid="MainPagination"]')
        const isPaginationExist = pagination.exists()

        expect(isPaginationExist).toBe(false)
        expect(isPaginationExist).toMatchSnapshot()
      }
    )
  })
})
