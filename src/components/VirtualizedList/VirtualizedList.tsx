import React, {
	useCallback,
	useEffect, useMemo, useRef, useState,
} from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { noop } from '../../utils';
import { calcVirtualizedList } from './utils';

type VirtualizedListProps<T> = {
  rowHeight: number;
  RowComponent: (a: T) => JSX.Element;
  items: T[],
};

const Container = styled.div`
  flex: 1;
  overflow-y: scroll;
`;
const CustomHeight = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
`;

export const VirtualizedList = <T extends { id: string }>({
	RowComponent,
	items,
	rowHeight,
}: VirtualizedListProps<T>) => {
	const [containerHeight, setContainerHeight] = useState(0);
	const [scrollTop, setScrollTop] = useState(0);
	const containerRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		const updateContainerHeight = debounce(() => {
			if (!containerRef.current) return;

			const { height } = containerRef.current.getBoundingClientRect();
			setContainerHeight(height);
		}, 100);

		window.addEventListener('resize', updateContainerHeight);
		updateContainerHeight();

		return () => {
			window.removeEventListener('resize', updateContainerHeight);
		};
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return noop;

		const updateScrollTop = throttle(() => {
			if (!containerRef.current) return;

			setScrollTop(containerRef.current.scrollTop);
		}, 50);

		container.addEventListener('scroll', updateScrollTop);

		return () => {
			container.removeEventListener('scroll', updateScrollTop);
		};
	}, []);

	const {
		firstVisibleItemIndex, lastVisibleItemIndex, offsetBottom, offsetTop,
	} = useMemo(() => calcVirtualizedList({
		scrollTop,
		containerHeight,
		rowHeight,
		itemsLength: items.length,
	}), [
		scrollTop,
		containerHeight,
		rowHeight,
		items.length,
	]);

	const visibleItems = useMemo(
		() => items.slice(firstVisibleItemIndex, lastVisibleItemIndex),
		[items, firstVisibleItemIndex, lastVisibleItemIndex]
	);

	const renderRow = useCallback((el: T) => <RowComponent key={el.id} {...el} />, [RowComponent]);

	// return (
	// 	<Container ref={containerRef}>
	// 		{items.map(renderRow)}
	// 	</Container>
	// );

	// useEffect(() => {
	// 	console.log({
	// 		firstVisibleItemIndex, lastVisibleItemIndex, itemsLength: items.length, visibleItemsLength: visibleItems.length,
	// 	});
	// }, [firstVisibleItemIndex, lastVisibleItemIndex, items.length, visibleItems.length]);

	return (
		<Container ref={containerRef}>
			<CustomHeight height={offsetTop} />
			{visibleItems.map(renderRow)}
			<CustomHeight height={offsetBottom} />
		</Container>
	);
};
