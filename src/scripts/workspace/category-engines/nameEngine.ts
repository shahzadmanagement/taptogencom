export function filterAndSortNames(
  names: string[],
  sortOrder: 'none' | 'alpha' | 'length-asc' | 'length-desc' = 'none',
  filterText: string = ''
): string[] {
  let list = [...names];

  if (filterText && filterText.trim().length > 0) {
    const query = filterText.toLowerCase().trim();
    list = list.filter(n => n.toLowerCase().includes(query));
  }

  if (sortOrder === 'alpha') {
    list.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
  } else if (sortOrder === 'length-asc') {
    list.sort((a, b) => a.length - b.length);
  } else if (sortOrder === 'length-desc') {
    list.sort((a, b) => b.length - a.length);
  }

  return list;
}

export function exportNamesToCsv(names: string[], categoryName: string = 'Generated Names'): string {
  const header = `Index,${categoryName},Length\n`;
  const rows = names.map((name, i) => `${i + 1},"${name.replace(/"/g, '""')}",${name.length}`).join('\n');
  return header + rows;
}
