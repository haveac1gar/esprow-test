import React, {
	useCallback,
	useEffect, useMemo, useRef, useState,
} from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import { calcVirtualizedList } from './utils';
import { MemoizedItemRow } from '../ItemRow';
import { EntryFile, EntryFileRow } from '../../types';

type VirtualizedListProps = {
  items: EntryFile,
};

const Container = styled.div`
  flex: 1;
  overflow-y: scroll;
	position: relative;
`;
const CustomHeight = styled.div.attrs<{ $height: number }>(props => ({
	style: {
		height: props.$height,
	},
}))`
  width: 100%;
`;

const MeasureRowHeight = styled.div`
	position: absolute;
	z-index: -1;
	opacity: 0;
	width: 100%;
`;

export const VirtualizedList = ({
	items,
}: VirtualizedListProps) => {
	const [containerHeight, setContainerHeight] = useState(0);
	const [rowHeight, setRowHeight] = useState(0);
	const [scrollTop, setScrollTop] = useState(0);
	const containerRef = useRef<null | HTMLDivElement>(null);
	const measureRowHeightRef = useRef<null | HTMLDivElement>(null);

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

				if (Math.abs(newScrollTop - prevScrollTop) <= containerHeight / 2) return prevScrollTop;

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
		rowHeight,
		itemsLength: items.length,
	}), [
		rowHeight,
		scrollTop,
		containerHeight,
		items.length,
	]);

	const visibleItems = useMemo(
		() => items.slice(firstVisibleItemIndex, lastVisibleItemIndex),
		[items, firstVisibleItemIndex, lastVisibleItemIndex]
	);

	const renderRow = useCallback((row: EntryFileRow, idx: number) => <MemoizedItemRow key={JSON.stringify(row)} {...row} isOdd={idx % 2 === 0} />, []);

	useEffect(() => {
		const measurer = measureRowHeightRef.current;
		if (!measurer) return;

		setRowHeight((prev) => {
			if (prev) return prev;

			const newHeight = measurer.getBoundingClientRect().height || 0;
			if (!newHeight) return prev;

			return newHeight;
		});
	}, [items]);

	return (
		<Container ref={containerRef}>
			<MeasureRowHeight ref={measureRowHeightRef}>
				{renderRow(items[0], 0)}
			</MeasureRowHeight>
			<CustomHeight $height={offsetTop} />
			{visibleItems.map(renderRow)}
			<CustomHeight $height={offsetBottom} />
		</Container>
	);
};
