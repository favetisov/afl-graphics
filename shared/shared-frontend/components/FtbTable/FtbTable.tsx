import { Center, Skeleton, Text } from '@mantine/core';
import { range } from 'lodash';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Equal as EqualIcon } from 'tabler-icons-react';
import s from './FtbTable.module.scss';
import { FtbTableRow } from './FtbTableRow';

export const FtbTable = ({
  entities,
  columns,
  rowHref,
  rowHeight,
  onSort,
  onRowClick,
  scrollableParent,
  className,
}: {
  entities: Array<any>;
  columns: Array<{ name: string; render: (row) => any; className?: string }>;
  rowHeight: number;
  rowHref?: (row) => string;
  onSort?: (from, to) => any;
  onRowClick?: (row) => any;
  scrollableParent?: any;
  className: string;
}) => {
  const tableRef = useRef();
  const [rangeFrom, setRangeFrom] = useState(0);
  const [rangeTo, setRangeTo] = useState(20);

  useEffect(() => {
    if (!scrollableParent) scrollableParent = window;
  });

  const RowLink = ({ entity, children }) => {
    if (rowHref) {
      return <Link href={rowHref(entity)}>{children}</Link>;
    } else {
      return children;
    }
  };

  const renderContents = () => {
    return entities.map((e, idx) => {
      return idx >= rangeFrom && idx <= rangeTo ? (
        <FtbTableRow idx={entities[idx]._id} key={idx}>
          <Draggable draggableId={idx + ''} index={idx} key={idx} isDragDisabled={!Boolean(onSort)}>
            {(provided, snapshot) => (
              <RowLink entity={entities[idx]}>
                <tr
                  ref={provided.innerRef}
                  className={(snapshot.isDragging ? s.dragging : '') + ' ' + (entities[idx].show === false ? s.hidden : '')}
                  {...provided.draggableProps}
                  onClick={() => onRowClick && onRowClick(entities[idx])}
                >
                  {onSort && (
                    <td className={s.handlerTd} {...provided.dragHandleProps}>
                      <EqualIcon size={18} />
                    </td>
                  )}
                  {columns.map(c => (
                    <td key={c.name} className={c.className} style={{ height: rowHeight + 'px' }}>
                      {c.render(entities[idx])}
                    </td>
                  ))}
                </tr>
              </RowLink>
            )}
          </Draggable>
        </FtbTableRow>
      ) : null;
    });
  };

  const onScroll = () => {
    if (tableRef.current && entities?.length) {
      const containerTop = 70; //header height
      const containerBottom = window.innerHeight;
      const { top: elTop } = (Array.from((tableRef.current as any).querySelectorAll('tbody'))[0] as any).getBoundingClientRect();
      const visibleHeight = containerBottom - Math.max(containerTop, elTop);
      const visibleItemsNumber = Math.ceil(visibleHeight / rowHeight);
      const topDistance = Math.max(0, containerTop - elTop);
      const startItemIdx = Math.floor(topDistance / rowHeight);
      const additionalItemsBuffer = 2; // rendering some more items before and after viewport to reduce glitch on scroll start
      const newRangeFrom = Math.max(0, startItemIdx - additionalItemsBuffer);
      const newRangeTo = Math.min(entities.length, startItemIdx + visibleItemsNumber + additionalItemsBuffer);
      if (newRangeFrom != rangeFrom) setRangeFrom(newRangeFrom);
      if (newRangeTo != rangeTo) setRangeTo(newRangeTo);
    }
  };
  onScroll();

  useEffect(() => {
    const scrollElement = scrollableParent || window;
    scrollElement.addEventListener('scroll', onScroll);
    return () => scrollElement.removeEventListener('scroll', onScroll);
  });

  const onDragEnd = result => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    } else if (result.destination.index === result.source.index) {
      // no movement
      return;
    } else if (onSort) {
      onSort(result.source.index, result.destination.index);
    }
  };

  const renderBody = () => {
    if (!entities) {
      return (
        <tbody>
          {range(0, 20).map(i => (
            <tr key={i} style={{ height: rowHeight + 'px' }}>
              {onSort && <td className={s.handlerTd} key={'handler'}></td>}
              {columns.map(c => (
                <td key={c.name} className={c.className}>
                  <Skeleton height={rowHeight - 12} my={6} width="100%" radius="md" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    } else if (!entities.length) {
      return (
        <tbody>
          <tr style={{ height: rowHeight + 'px' }}>
            {onSort && <td className={s.handlerTd} key={'handler'}></td>}
            <td colSpan={columns.length}>
              <Center p={'md'}>
                <Text size={'xs'}>Nothing found</Text>
              </Center>
            </td>
          </tr>
        </tbody>
      );
    } else {
      return (
        <Droppable droppableId="table">
          {(droppableProvided: DroppableProvided) => (
            <tbody ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className={s.tbody}>
              {rangeFrom > 0 && (
                <tr style={{ height: rangeFrom * rowHeight + 'px' }}>
                  <td></td>
                </tr>
              )}
              {renderContents()}
              {rangeTo > 0 && (
                <tr
                  style={{
                    height: (entities.length - 1 - rangeTo) * rowHeight + 'px',
                  }}
                >
                  <td></td>
                </tr>
              )}
            </tbody>
          )}
        </Droppable>
      );
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <table style={{ width: '100%', borderSpacing: 0, position: 'relative' }} ref={tableRef} className={s.table}>
          <thead>
            <tr>
              {onSort && <th className={s.handlerTd} key={'drag'} />}
              {columns.map(c => (
                <th key={c.name} className={c.className}>
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          {renderBody()}
        </table>
      </DragDropContext>
    </>
  );
};
