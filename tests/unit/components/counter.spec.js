import {shallowMount, /*mount*/ } from '@vue/test-utils'
import Counter from '@/components/Counter';

describe('Counter', () => { 

    let wrapper = shallowMount(Counter);

    beforeEach(() =>{
      wrapper=shallowMount(Counter)
    })

    // test('Debe de hacer match con el snapshot', () => { 
    //     const wrapper = shallowMount(Counter);
    //     expect( wrapper.html() ).toMatchSnapshot()
    //  })

    test('h2 debe de tener el valor por defecto "Counter" ', () => { 

        
        // expect( wrapper.find('h10').exists() ).toBe(true)
        expect( wrapper.find('h2').exists() ).toBeTruthy()
        const h2Value = wrapper.find('h2').text()//encuentra el primero, findAll
        expect(h2Value).toBe('Counter')

     })

     test('El valor por defecto debe de ser 100 en el p', () => { 
        //wrapper
      
        //pTags
        const value = wrapper.find('[data-testid="counter"]')
        //expect segundo p === 100
        expect( value.text() ).toBe("100")

      })


    test('debe de incrementar y decrementar en 1  el valor del contador', async() => { 

      
      const [ increaseBtn, decreaseBtn ] = wrapper.findAll('button')
      //simular el clic
      await increaseBtn.trigger('click')
      await increaseBtn.trigger('click')
      await increaseBtn.trigger('click')
      await decreaseBtn.trigger('click')
      await decreaseBtn.trigger('click')

      const value = wrapper.find('[data-testid="counter"]').text()


      expect(value).toBe('101')

      })


      test('debe de establecer el valor pordefecto', () => { 

        // const { start } = wrapper.props()
        const start = wrapper.props('start')
        // console.log(typeof start)//number
        //para evaluar el start en el html
        const value = wrapper.find('[data-testid="counter"]').text()
        expect(Number(value)).toBe(start)

      })

      test('Debe de mostrar la prop title', () => { 

        const title = 'Hola mundo!!!'
      
        const wrapper = shallowMount(Counter, {
          props: {
            title,
            start: '5'
          }
        })
        // console.log(wrapper.html())
        expect(wrapper.find('h2').text()).toBe(title)

      })

})