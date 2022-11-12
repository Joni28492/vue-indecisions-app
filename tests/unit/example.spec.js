

describe('example component', ()=>{
  
  test( 'Debe de ser mayor a 10', ()=>{
    //Arreglar
    let value = 10;
    //Estimulo
    value = value + 2
    //observar el resultado
    expect(value).toBeGreaterThan(10)
  })

})

