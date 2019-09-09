var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'from';
        var text = 'text';
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
        // Same as:
        // expect(message.from).toBe(from);
        // expect(message.text).toBe(text);
    });

    it('should generate correct location message object', () => {
        var from = 'from';
        var lat = 100.1;
        var lon = -100.1;
        var url = `https://www.google.com/maps?q=${lat},${lon}`
        var message = generateLocationMessage(from, lat, lon);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});
