// let proof = require('./app.js');

function addEmUp(x, y, z){
  return x + y  + z
};

test('Is this jest working so far', function(){
  expect(addEmUp(2, 4, 6)).toBe(12);
});
