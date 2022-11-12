import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe('Pruebas en indecision ', () => { 

    let wrapper;
    let clgSpy;

    //mock del fetch API
    //crea promesa resuelta
    global.fetch = jest.fn( ()=> Promise.resolve({
        json: () => Promise.resolve({
            answer: "yes",
            forced: false,
            image: "https://yesno.wtf/assets/yes/2.gif"
        })
    }))

    beforeEach( ()=>{
        wrapper = shallowMount(Indecision)
        clgSpy = jest.spyOn(console, 'log')
        jest.clearAllMocks()

    } )

    test('debe hacer match con el snapshot', () => { 
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('escribir en el input no debe de disparar nada (console.log)', async() => { 
        //vm es la instancia de VUe
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

        const input  = wrapper.find('input');
        await input.setValue('Hola mundo')

        //evaluar si  el clg es llamado
        // expect(clgSpy).toHaveBeenCalledTimes(2)
        expect(clgSpy).toHaveBeenCalled()
        // expect(getAnswerSpy).not().toHaveBeenCalled()
        expect(getAnswerSpy).toHaveBeenCalledTimes(0)

    })



    test('escribir "?" debe de disparar el getAnswer', async() => { 

        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )
        const input  = wrapper.find('input');
        await input.setValue('Hola Mundo?')
        expect(clgSpy).toHaveBeenCalledTimes(2)
        expect(getAnswerSpy).toHaveBeenCalled()


    })



    test('pruebas en getAnswer', async() => {
    
        await wrapper.vm.getAnswer()
 
        const img = wrapper.find('img')
        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect(wrapper.vm.answer).toBe('Si!')
    })


    test('pruebas en getAnswer - Fallo en API', async() => { 


        //fallo en el API
        fetch.mockImplementationOnce( () => Promise.reject('API is down') )
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')

        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe('No se pudo cargar del API')

    })

 })