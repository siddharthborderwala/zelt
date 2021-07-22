import { useTypedSelector } from './use-typed-selector';

const showFunction = `
  import _React from 'react';
  import _ReactDOM from 'react-dom';

  let show = (value) => {
    const root = document.querySelector('#root');

    if (typeof value === 'object' && value.$$typeof && value.props) {
      _ReactDOM.render(value, root);
    } else if (typeof value === 'object') {
      root.innerHTML = JSON.stringify(value, null, 2);
    } else {
      root.innerHTML = value;
    }
  };
`;

const showFunctionNoop = 'let show = () => {}';

export const useCumulativeCode = (id: string): string => {
  return useTypedSelector(({ cells }) => {
    const { data, order } = cells;
    const orderedCells = order.map((id) => data[id]);

    const cumulativeCodeArray = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === id) {
          cumulativeCodeArray.push(showFunction);
        } else {
          cumulativeCodeArray.push(showFunctionNoop);
        }
        cumulativeCodeArray.push(c.content);
      }
      if (c.id === id) {
        break;
      }
    }
    return cumulativeCodeArray;
  }).join('\n');
};
