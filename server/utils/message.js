var generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdTimestamp: new Date().getTime(),
  };
};

var generateLocationMessage = (from, longitude, latitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${longitude},${latitude}`,
    createdTimestamp: new Date().getTime(),
  };
};

module.exports = {generateMessage, generateLocationMessage};
