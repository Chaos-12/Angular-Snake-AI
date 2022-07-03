import { Connection, Network, NeuronType } from "src/main/logic";
import { InnovationUtils, mergeConnectionInto, mergeNetworks } from "src/main/utils";
import { TestUtils } from "src/test/testUtils";

describe(TestUtils.title('MergeUtils'), function(){

  describe('Merge connection', function(){

    it('Both are enabled', function(){
      let network = new Network();
      let startNeuron = network.inputNeurons[0];
      let finalNeuron = network.outputNeurons[0];
      let innovation = InnovationUtils.getOrCreateInnovation(startNeuron.id, finalNeuron.id);
      let father = new Connection(startNeuron, finalNeuron, Math.random(), true);
      let mother = new Connection(startNeuron, finalNeuron, -father.weight, true);
      mergeConnectionInto(father, mother, network);
      let child = network.connections.get(innovation);
      expect(child?.enabled).toBeTrue();
      let equalToFather = (child?.from.id === father.from.id) && (child.to.id === father.to.id) && (child.weight === father.weight);
      let equalToMother = (child?.from.id === mother.from.id) && (child.to.id === mother.to.id) && (child.weight === mother.weight);
      expect(equalToFather || equalToMother).toBeTrue();
      expect(equalToFather && equalToMother).toBeFalse();
    })

    it('Both not enabled', function(){
      let network = new Network();
      let startNeuron = network.inputNeurons[0];
      let finalNeuron = network.outputNeurons[0];
      let innovation = InnovationUtils.getOrCreateInnovation(startNeuron.id, finalNeuron.id);
      let father = new Connection(startNeuron, finalNeuron, Math.random(), false);
      let mother = new Connection(startNeuron, finalNeuron, -father.weight, false);
      mergeConnectionInto(father, mother, network);
      let child = network.connections.get(innovation);
      expect(child?.enabled).toBeFalse();
      let equalToFather = (child?.from.id === father.from.id) && (child.to.id === father.to.id) && (child.weight === father.weight);
      let equalToMother = (child?.from.id === mother.from.id) && (child.to.id === mother.to.id) && (child.weight === mother.weight);
      expect(equalToFather || equalToMother).toBeTrue();
      expect(equalToFather && equalToMother).toBeFalse();

    })

    it('Only father enabled', function(){
      let network = new Network();
      let startNeuron = network.inputNeurons[0];
      let finalNeuron = network.outputNeurons[0];
      let innovation = InnovationUtils.getOrCreateInnovation(startNeuron.id, finalNeuron.id);
      let father = new Connection(startNeuron, finalNeuron, Math.random(), true);
      let mother = new Connection(startNeuron, finalNeuron, -father.weight, false);
      mergeConnectionInto(father, mother, network);
      let child = network.connections.get(innovation);
      expect(child?.enabled).toBeTrue();
      let equalToFather = (child?.from.id === father.from.id) && (child.to.id === father.to.id) && (child.weight === father.weight);
      let equalToMother = (child?.from.id === mother.from.id) && (child.to.id === mother.to.id) && (child.weight === mother.weight);
      expect(equalToFather).toBeTrue();
      expect(equalToMother).toBeFalse();
    })

    it('Only mother enabled', function(){
      let network = new Network();
      let startNeuron = network.inputNeurons[0];
      let finalNeuron = network.outputNeurons[0];
      let innovation = InnovationUtils.getOrCreateInnovation(startNeuron.id, finalNeuron.id);
      let father = new Connection(startNeuron, finalNeuron, Math.random(), false);
      let mother = new Connection(startNeuron, finalNeuron, -father.weight, true);
      mergeConnectionInto(father, mother, network);
      let child = network.connections.get(innovation);
      expect(child?.enabled).toBeTrue();
      let equalToFather = (child?.from.id === father.from.id) && (child.to.id === father.to.id) && (child.weight === father.weight);
      let equalToMother = (child?.from.id === mother.from.id) && (child.to.id === mother.to.id) && (child.weight === mother.weight);
      expect(equalToFather).toBeFalse();
      expect(equalToMother).toBeTrue();
    })
  })

  describe('Merge network', function(){

    it('Right number of input neurons', function(){
      let father = new Network();
      let mother = new Network();
      let child = mergeNetworks(father, mother);
      expect(child.inputNeurons.length).toBe(father.inputNeurons.length);
    })

    it('Right number of output neurons', function(){
      let father = new Network();
      let mother = new Network();
      let child = mergeNetworks(father, mother);
      expect(child.outputNeurons.length).toBe(father.outputNeurons.length);
    })

    it('Inherits neurons from parents', function(){
      let father = new Network();
      let fatherHiddenNumber = father.neuronMap.size +1;
      father.createNeuron(NeuronType.hidden, fatherHiddenNumber);
      let mother = new Network();
      let motherHiddenNumber = mother.neuronMap.size +2;
      mother.createNeuron(NeuronType.hidden, motherHiddenNumber);
      let child = mergeNetworks(father, mother);
      let childHiddenNeurons = child.hiddenNeurons;
      expect(childHiddenNeurons.length).toBe(2);
      expect(child.hiddenNeurons[0].id).toBe(fatherHiddenNumber);
      expect(child.hiddenNeurons[1].id).toBe(motherHiddenNumber);
    })

    it('Does not repeats neurons from parents', function(){
      let father = new Network();
      let mother = new Network();
      let newHiddenNumber = father.neuronMap.size +1;
      father.createNeuron(NeuronType.hidden, newHiddenNumber);
      mother.createNeuron(NeuronType.hidden, newHiddenNumber);
      let child = mergeNetworks(father, mother);
      let childHiddenNeurons = child.hiddenNeurons;
      expect(childHiddenNeurons.length).toBe(1);
      expect(child.hiddenNeurons[0].id).toBe(newHiddenNumber);
    })
  })

  it('Does not duplicate connections', function(){
    let father = new Network();
    let mother = new Network();
    let startId = father.inputNeurons[0].id;
    let finalId = father.outputNeurons[0].id;
    father.createConnection(startId, finalId);
    mother.createConnection(startId, finalId);
    let child = mergeNetworks(father, mother);
    expect(child.connections.size).toBe(father.connections.size);
  })
})
