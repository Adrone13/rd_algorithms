const arrayToTree = (values, i = 0) => {
  if (i >= values.length || values[i] == null) {
    return null;
  }

  return {
    data: values[i],
    left: arrayToTree(values, 2 * i + 1),
    right: arrayToTree(values, 2 * i + 2)
  }
}

module.exports = {
  arrayToTree,
};
