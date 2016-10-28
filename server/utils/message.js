var generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdTimestamp: new Date().getTime(),
  };
};

module.exports = {generateMessage};
