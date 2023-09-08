import { CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import { javascriptLanguage } from '@codemirror/lang-javascript';
import { syntaxTree } from '@codemirror/language';
import { Extension } from '@codemirror/state';
import { getStorePath, stringPathToArray } from '@shukun/util-functions';
import { MutableRefObject } from 'react';

export const createJsStateCompletions = (
  completionStateRef: MutableRefObject<Record<string, unknown>>,
): Extension => {
  return javascriptLanguage.data.of({
    autocomplete: (context: CompletionContext) =>
      createCompleteJSDoc(completionStateRef, context),
  });
};

const createCompleteJSDoc = (
  completionStateRef: MutableRefObject<Record<string, unknown>>,
  context: CompletionContext,
): CompletionResult | null => {
  const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);

  if (
    nodeBefore.name === '.' &&
    nodeBefore.parent &&
    nodeBefore.parent.name === 'MemberExpression'
  ) {
    const siblingFrom = nodeBefore.prevSibling?.from;
    const siblingTo = nodeBefore.prevSibling?.to;

    if (!siblingFrom || !siblingTo) {
      return null;
    }

    const siblingDoc = context.state.sliceDoc(siblingFrom, siblingTo);

    const storePath = stringPathToArray(siblingDoc, '$');
    const partialState = getStorePath(completionStateRef.current, storePath);

    if (typeof partialState !== 'object' || Array.isArray(partialState)) {
      return null;
    }

    const firstLevelKeys = Object.keys(partialState);
    const options = firstLevelKeys.map((tag) => ({
      label: tag,
      type: 'property',
    }));

    return {
      from: nodeBefore.from + 1,
      options,
    };
  }

  return null;
};
