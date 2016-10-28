var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store assertion in response
    var from = 'Phil';
    var text = 'Be my friend?';
    var message = generateMessage(from, text);
    // asset from matches value passed in
    expect(message.createdTimestamp).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
