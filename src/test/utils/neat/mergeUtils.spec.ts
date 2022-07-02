import { Connection, Network } from "src/main/logic";
import { mergeConnectionInto } from "src/main/utils";
import { TestUtils } from "src/test/testUtils";

describe(TestUtils.title('MergeUtils'), function(){

  describe('Merge connection', function(){

    it('Both are enabled', function(){
      let network = new Network();
      let father = new Connection(network.inputNeurons[0], network.outputNeurons[0], Math.random(), true);
      let mother = new Connection(network.inputNeurons[1], network.outputNeurons[1], -father.weight, true);
      mergeConnectionInto(father, mother, network);
      network.connections.forEach(child => {
        expect(child.enabled).toBeTrue();
        let equalToFather = (child.from.id === father.from.id) && (child.to.id === father.to.id) && (child.weight === father.weight);
        let equalToMother = (child.from.id === mother.from.id) && (child.to.id === mother.to.id) && (child.weight === mother.weight);
        expect(equalToFather || equalToMother).toBeTrue();
      })
    })

    it('Both not enabled', function(){
      let network = new Network();
      let father = new Connection(network.inputNeurons[0], network.outputNeurons[0], Math.random(), false);
      let mother = new Connection(network.inputNeurons[1], network.outputNeurons[1], -father.weight, false);
      mergeConnectionInto(father, mother, network);
      network.connections.forEach(child => {
        expect(child.enabled).toBeFalse();
        let equalToFather = (child.from.id === father.from.id) && (child.to.id === father.to.id) && (child.weight === father.weight);
        let equalToMother = (child.from.id === mother.from.id) && (child.to.id === mother.to.id) && (child.weight === mother.weight);
        expect(equalToFather || equalToMother).toBeTrue();
      })
    })

    it('Only father enabled', function(){
      let network = new Network();
      let father = new Connection(network.inputNeurons[0], network.outputNeurons[0], Math.random(), true);
      let mother = new Connection(network.inputNeurons[1], network.outputNeurons[1], -father.weight, false);
      mergeConnectionInto(father, mother, network);
      network.connections.forEach(child => {
        expect(child.enabled).toBeTrue();
        let equalToFather = (child.from.id === father.from.id) && (child.to.id === father.to.id) && (child.weight === father.weight);
        let equalToMother = (child.from.id === mother.from.id) && (child.to.id === mother.to.id) && (child.weight === mother.weight);
        expect(equalToFather).toBeTrue();
        expect(equalToMother).toBeFalse();
      })
    })

    it('Only mother enabled', function(){
      let network = new Network();
      let father = new Connection(network.inputNeurons[0], network.outputNeurons[0], Math.random(), false);
      let mother = new Connection(network.inputNeurons[1], network.outputNeurons[1], -father.weight, true);
      mergeConnectionInto(father, mother, network);
      network.connections.forEach(child => {
        expect(child.enabled).toBeTrue();
        let equalToFather = (child.from.id === father.from.id) && (child.to.id === father.to.id) && (child.weight === father.weight);
        let equalToMother = (child.from.id === mother.from.id) && (child.to.id === mother.to.id) && (child.weight === mother.weight);
        expect(equalToFather).toBeFalse();
        expect(equalToMother).toBeTrue();
      })
    })
  })
})
