import { Network, NeuronType } from "../index";

describe('Network tests', function(){

  let cases = [1,2,5,12];

  it('Bias neuron in network is bias type', function(){
    let network = new Network(1,1);
    expect(network.biasNeuron.type).toBe(NeuronType.bias);
  });

  describe('Input neurons in network are input type', function(){
    cases.forEach(number => {
      it(`${number} input neurons`, function(){
        let network = new Network(number,1);
        network.inputNeurons.forEach(neuron => {
          expect(neuron.type).toBe(NeuronType.input);
        });
      });
    });
  });

  describe('Right number of input neurons', function(){
    cases.forEach(number => {
      it(`${number} input neurons`, function(){
        let network = new Network(number,1);
        expect(network.inputNeurons.length).toBe(number);
      });
    });
  });

  describe('Output neurons in network are output type', function(){
    cases.forEach(number => {
      it(`${number} output neurons`, function(){
        let network = new Network(1, number);
        network.outputNeurons.forEach(neuron => {
          expect(neuron.type).toBe(NeuronType.output);
        });
      });
    });
  });

  describe('Right number of output neurons', function(){
    cases.forEach(number => {
      it(`${number} output neurons`, function(){
        let network = new Network(1, number);
        expect(network.outputNeurons.length).toBe(number);
      });
    });
  });

  describe('Computes deepness ok', function(){
    cases.forEach(number => {
      it(`${number} hidden neurons`, function(){
        let network = new Network(1,1);
        let inputId = 1;
        let outputId = 2;
        let idNewNeuron = 10;
        network.createNeuron(NeuronType.hidden, idNewNeuron);
        network.createConnection(inputId, idNewNeuron);
        for (let i=1; i<number; i++){
          idNewNeuron ++;
          network.createNeuron(NeuronType.hidden, idNewNeuron);
          network.createConnection(idNewNeuron-1, idNewNeuron);
        }
        network.createConnection(idNewNeuron, outputId);
        network.orderNetwork();
        expect(network.deepness).toBe(number+1);
      });
    });
  });

});
