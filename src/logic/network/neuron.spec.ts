import { Neuron, NeuronType } from "../index";

describe('Neuron tests', () => {

  describe('Equals OK', function(){
    let id = [1,2,3,5,8,12];
    id.forEach(number => {
      it(`id = ${number}`, function(){
        let neuron1 = new Neuron(NeuronType.input, number);
        let neuron2 = new Neuron(NeuronType.input, number);
        expect(neuron1 === neuron2).toBeTrue();
      })
    })
  });

  it('Function Equals', function(){
    expect(true).toBeTrue();
  })
});
