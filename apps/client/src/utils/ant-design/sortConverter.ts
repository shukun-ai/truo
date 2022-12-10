export function convertAntdSortToSearchOrder(
  order: 'descend' | 'ascend',
): 'asc' | 'desc' {
  if (order === 'ascend') {
    return 'asc';
  }

  if (order === 'descend') {
    return 'desc';
  }

  throw new Error(`The order from ant is not matched: ${order}`);
}

export function convertSearchOrderToAntdSort(
  order: 'asc' | 'desc',
): 'ascend' | 'descend' {
  if (order === 'asc') {
    return 'ascend';
  }

  if (order === 'desc') {
    return 'descend';
  }

  throw new Error(`The order from search order is not matched: ${order}`);
}
