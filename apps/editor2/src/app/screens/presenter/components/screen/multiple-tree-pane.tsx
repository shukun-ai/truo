import { IconCaretDown, IconCaretRight } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';
import { useCallback, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BehaviorSubject } from 'rxjs';

type TreeConfig = Record<string, string[]>;

type CollapseConfig = Record<string, boolean>;

const treeConfig$ = new BehaviorSubject<TreeConfig>({
  root: ['wrapper'],
  wrapper: ['title', 'input', 'button'],
  title: ['primaryTitle', 'secondaryTitle'],
  input: [],
  button: [],
});

const collapseStore$ = new BehaviorSubject<CollapseConfig>({});

collapseStore$.subscribe((collapseStore) => {
  console.log('collapseStore change', collapseStore);
});

export type MultipleTreePaneProps = {
  //
};

export const MultipleTreePane = () => {
  const treeConfig = useObservableState(treeConfig$);

  const collapseStore = useObservableState(collapseStore$);

  const DndProvider2 = DndProvider as any;

  return (
    <DndProvider2 backend={HTML5Backend}>
      <TreeNode
        treeConfig={treeConfig}
        collapseStore={collapseStore}
        currentNodeName="root"
        level={0}
        index={0}
      />
    </DndProvider2>
  );
};

const TreeNode = ({
  treeConfig,
  collapseStore,
  currentNodeName,
  level,
  index,
}: {
  treeConfig: TreeConfig;
  collapseStore: CollapseConfig;
  currentNodeName: string;
  level: number;
  index: number;
}) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'ITEM',
    item: { currentNodeName, treeConfig, level },
  }));

  const isOpen = useMemo(() => {
    const collapse = collapseStore[currentNodeName];
    return collapse === false ? false : true;
  }, [collapseStore, currentNodeName]);

  const toggleCollapse = useCallback(() => {
    const collapseStore = collapseStore$.getValue();
    const open = collapseStore[currentNodeName];
    console.log('currentNodeName', currentNodeName, open);
    collapseStore$.next({
      ...collapseStore$.getValue(),
      [currentNodeName]: open === false ? true : false,
    });
  }, [currentNodeName]);

  return (
    <div ref={drag}>
      {index === 0 && (
        <DroppableDivider
          widgetId={currentNodeName}
          position="top"
          level={level}
        />
      )}
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 20 * level }}></div>
          <div onClick={toggleCollapse}>
            {isOpen ? <IconCaretDown /> : <IconCaretRight />}
          </div>
          <div style={{ flex: 1 }}>{currentNodeName}</div>
        </div>
      </div>
      {isOpen && (
        <List>
          {treeConfig[currentNodeName]?.map((childNode, index) => (
            <TreeNode
              treeConfig={treeConfig}
              collapseStore={collapseStore}
              currentNodeName={childNode}
              level={level + 1}
              index={index}
            />
          ))}
        </List>
      )}
      <DroppableDivider
        widgetId={currentNodeName}
        position="bottom"
        level={level}
      />
    </div>
  );
};

const List = ({ children }: { children: JSX.Element[] }) => {
  return <div>{children}</div>;
};

const DroppableDivider = ({
  widgetId,
  position,
  level,
}: {
  widgetId: string;
  position: 'top' | 'bottom';
  level: number;
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => {
      console.log('dropped', item, widgetId, position);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const style = useMemo(() => {
    if (isOver && canDrop) {
      return { flex: 1, height: 34, background: 'green' };
    }
    if (canDrop) {
      return { flex: 1, height: 12, background: '#f2f2f2' };
    }
    return {
      flex: 1,
      height: 12,
    };
  }, [canDrop, isOver]);

  return (
    <div style={{ display: 'flex' }} ref={drop}>
      <div style={{ width: 20 * level }}></div>
      <div style={style}></div>
    </div>
  );
};
