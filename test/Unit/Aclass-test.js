import Aclass from '../../src/Aclass';
import { expect } from 'chai';

const A = new Aclass();

describe("Testing class A", function() {

  // I had slow internet
  this.timeout(10000);

  it("Adding 1 to 1 yields 2", function() {
    expect(A.addOne(1)).to.equal(2);
  });

  it("Adding 2 to 1 yields 3", function() {
    expect(A.addTwo(1)).to.equal(3);
  });

  it("Adding 2 to result of Adding 1 to 1 yields 4", function() {
    let one = 1;
    var result;

    result = A.addOne(one);
    result = A.addTwo(result);

    expect(result).to.equal(4);
  });

  it("Can login to dev, use auth to find Dermatoscope in our device database", function(done){

    A.login(process.env.TEST_USER,process.env.TEST_PASS)
     .then(()=>{
       return A.fetchDevices()
     })
     .then(devices=>{
       const deviceNamesOnly = devices.devices.map(d => d.name);
       // We expect there to be a Dermatoscope
       expect(deviceNamesOnly.find(r=>r === 'Dermatoscope')).to.not.equal(undefined);
       done();
     });

  })
});
