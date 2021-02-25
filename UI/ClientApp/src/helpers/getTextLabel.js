export const Arrays = (data, name) => {
  let arrayItem = [];
  if (data && Array.isArray(data)) {
    data.map((item, key) => {
      arrayItem.push({ label: item.Text, value: item.Value });
    });
  }
  return arrayItem;
};

export const ArraysKey = (data, name) => {
  let arrayItem = [];
  if (data && Array.isArray(data)) {
    data.map((item, key) => {
      arrayItem.push({ label: item.Value, value: item.Key });
    });
  }
  return arrayItem;
};




