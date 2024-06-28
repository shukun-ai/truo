import { performance } from 'perf_hooks';

import { Logger } from '@nestjs/common';

/**
 * temporary decorator to log mongodb execution time
 */
export function MethodMetric() {
  const logger = new Logger('MethodMetric');

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const startDate = new Date();
      const start = performance.now();
      const result = await originalMethod.apply(this, args);
      const end = performance.now();
      const atomName = args?.[2]?.name;
      const duration = end - start;
      if (duration > 1000 * 3) {
        logger.log(
          `[METRIC] ${propertyKey} executed ${atomName} in ${duration.toFixed(
            0,
          )} ms, start ${startDate.toISOString()}`,
        );
      }
      return result;
    };

    return descriptor;
  };
}
