export function sortData(array, field, order = 'desc') {
    return array.sort((a, b) => {
      const dateA = new Date(a[field]);
      const dateB = new Date(b[field]);
  
      if (order === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }
  
