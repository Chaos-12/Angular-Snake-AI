import { Directions, InputTypes, Network, NeuronType } from "src/main/logic";
import { TestUtils } from "src/test/testUtils";

describe(TestUtils.title('Network'), function(){

  let cases = [1,2,5,12];

  it('Bias neuron in network is bias type', function(){
    let network = new Network();
    expect(network.biasNeuron.type).toBe(NeuronType.bias);
  });

  it('Right number of input neurons', function(){
    let network = new Network();
    expect(network.inputNeurons.length).toBe(Directions.length*InputTypes.length);
  })

  it('Right number of output neurons', function(){
    let network = new Network();
    expect(network.outputNeurons.length).toBe(Directions.length);
  })

  describe('Computes deepness ok', function(){
    cases.forEach(number => {
      it(`${number} hidden neurons`, function(){
        let network = new Network();
        let inputId = network.inputNeurons[0].id;
        let outputId = network.outputNeurons[0].id;
        network.createNeuron(NeuronType.hidden);
        let idNewNeuron = network.hiddenNeurons[0].id;
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
