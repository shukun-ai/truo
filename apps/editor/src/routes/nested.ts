import { RoutePath } from './path';

export function getNestedRoute(parent: RoutePath, child: RoutePath) {
  if (!child.startsWith(parent)) {
    throw new Error('The child is not starts with parent.');
  }
  const remaining = child.substring(parent.length, child.length);
  return remaining ? remaining : '/';
}

export function adaptNestedRoute(parent: RoutePath) {
  return `${parent}/*`;
}
