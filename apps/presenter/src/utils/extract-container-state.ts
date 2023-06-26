// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractContainerState = (states: any, containerId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newStates: any = {};
  for (const [id, value] of Object.entries(states)) {
    const idSet = id.split(':');

    if (idSet[0] === '_app') {
      newStates[idSet[1]] = value;
    } else if (idSet[0] === 'container' && idSet[1] === containerId) {
      newStates[idSet[2]] = value;
    } else if (idSet[0] === 'repository' && idSet[1] === containerId) {
      newStates[idSet[2]] = value;
    }
  }
  return newStates;
};
