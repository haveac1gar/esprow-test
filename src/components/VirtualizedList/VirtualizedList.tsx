import React, {
	useCallback,
	useEffect, useMemo, useRef, useState,
} from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import { calcVirtualizedList } from './utils';
import { ITEM_ROW_HEIGHT, MemoizedItemRow } from '../ItemRow';
import { EntryFile, EntryFileRow } from '../../types';

type VirtualizedListProps = {
  items: EntryFile,
};

const Container = styled.div`
  flex: 1;
  overflow-y: scroll;
`;
const CustomHeight = styled.div.attrs<{ $height: number }>(props => ({
	style: {
		height: props.$height,
	},
}))`
  width: 100%;
`;

export const VirtualizedList = ({
	items,
}: VirtualizedListProps) => {
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

		const updateScrollTop = () => {
			setScrollTop((prevScrollTop) => {
				if (!containerRef.current) return prevScrollTop;

				const newScrollTop = containerRef.current.scrollTop;

				if (Math.abs(newScrollTop - prevScrollTop) <= containerHeight / 4) return prevScrollTop;

				return newScrollTop;
			});
		};

		container.addEventListener('scroll', updateScrollTop);

		return () => {
			container.removeEventListener('scroll', updateScrollTop);
		};
	}, [containerHeight]);

	const {
		firstVisibleItemIndex, lastVisibleItemIndex, offsetBottom, offsetTop,
	} = useMemo(() => calcVirtualizedList({
		scrollTop,
		containerHeight,
		rowHeight: ITEM_ROW_HEIGHT,
		itemsLength: items.length,
	}), [
		scrollTop,
		containerHeight,
		items.length,
	]);

	const visibleItems = useMemo(
		() => items.slice(firstVisibleItemIndex, lastVisibleItemIndex),
		[items, firstVisibleItemIndex, lastVisibleItemIndex]
	);

	const renderRow = useCallback((row: EntryFileRow) => <MemoizedItemRow key={row.id} {...row} />, []);

	return (
		<Container ref={containerRef}>
			<CustomHeight $height={offsetTop} />
			{visibleItems.map(renderRow)}
			<CustomHeight $height={offsetBottom} />
		</Container>
	);
};
