import { FilterInterface, getActiveFilterConditions } from './filter.interface';

export function ucFirst(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function lcFirst(str: string) {
  return str[0].toLowerCase() + str.slice(1);
}

//удаляем всякие спецсимволы
export const simplifyString = (s: string) => {
  const chars = {
    ё: 'е',
    á: 'a',
    à: 'a',
    â: 'a',
    ã: 'a',
    ä: 'a',
    å: 'a',
    è: 'е',
    é: 'е',
    ê: 'е',
    ë: 'е',
    ì: 'i',
    í: 'i',
    î: 'i',
    ï: 'i',
    ñ: 'n',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ü: 'u',
    ý: 'y',
    ÿ: 'y',
  };
  return s.replace(/[ёáàâãäåèéêëìíîïñòóôõöùúûüýÿ]/g, m => chars[m]).toLowerCase();
};

export function searchWithFilters<T>(items: Array<T>, filters: FilterInterface[], query: string, fields?: Array<string>): Array<T> {
  const conditions = getActiveFilterConditions(filters);
  items = items.filter(i => conditions.every(c => c(i)));
  return filter(items, query, fields);
}

export function filter<T>(items: Array<T>, query: string, fields?: Array<string>): Array<T> {
  // заменяем в строке string все элементы из find на replace
  let multireplaceString = (string: string, find: string, replace: string) => {
    for (let i = 0; i < find.length; i++) {
      let regExp = new RegExp(find[i], 'g');
      string = string.replace(regExp, replace[i]);
    }
    return string;
  };

  //удаляем всякие спецсимволы
  let simplifyString = (string: string) => {
    string = string + '';
    return multireplaceString(string.toLowerCase(), 'ёáàâãäåèéêëìíîïñòóôõöùúûüýÿ', 'еaaaaaaeeeeiiiinooooouuuuyy').replace(/\s\s+/g, ' ');
  };

  if (!query) return items; // фильтр пустой, значит все подходят

  let queries = simplifyString(query).split(' ');

  let checkWholeItem = function (item) {
    for (let q of queries) {
      if (!checkPart(q, item)) {
        return false;
      } //каждая из частей запроса должна входить хотя бы в одну из частей элемента
    }
    return true;
  };

  let checkPart = function (value, item) {
    let parts = [];
    if (fields) {
      for (let field of fields) {
        let part = item;
        for (let f of field.split('.')) {
          if (!part[f]) {
            part = '';
            break;
          } else {
            part = part[f];
          }
        }
        parts.push(part);
      }
    } else {
      //фильтруем массив простых элементов
      parts.push(item);
    }
    for (let p of parts) {
      if (simplifyString(p).indexOf(value) !== -1) {
        return true;
      }
    }

    return false;
  };

  let result = [];
  for (let item of items) {
    if (checkWholeItem(item)) {
      result.push(item);
    }
  }

  return result;
}
