import { PRERENDERED_BATCHES, VIEWPORTS_PER_BATCH } from '../constants';

type CalcVirtualizedListProps = {
  scrollTop: number;
  containerHeight: number;
  rowHeight: number;
	itemsLength: number;
};
type CalcVirtualizedListResult = {
  offsetTop: number;
  offsetBottom: number;
	firstVisibleItemIndex: number;
	lastVisibleItemIndex: number;
};

export const calcVirtualizedList = ({
	scrollTop,
	containerHeight,
	rowHeight,
	itemsLength,
}: CalcVirtualizedListProps): CalcVirtualizedListResult => {
	const itemsPerViewport = containerHeight / rowHeight;
	const itemsPerBatch = Math.ceil(itemsPerViewport * VIEWPORTS_PER_BATCH);
	const batchHeight = itemsPerBatch * rowHeight;

	const firstVisibleBatchIndex = Math.max(
		Math.ceil(scrollTop / batchHeight),
		0
	);
	const lastVisibleBatchIndex = Math.min(
		firstVisibleBatchIndex + PRERENDERED_BATCHES,
		Math.ceil(itemsLength / itemsPerBatch),
	);
	const firstVisibleItemIndex = Math.max((firstVisibleBatchIndex - 1) * itemsPerBatch, 0) || 0;
	const lastVisibleItemIndex = Math.min(lastVisibleBatchIndex * itemsPerBatch, itemsLength) || 0;

	return {
		offsetBottom: (itemsLength - lastVisibleItemIndex) * rowHeight || 0,
		offsetTop: firstVisibleItemIndex * rowHeight || 0,
		firstVisibleItemIndex,
		lastVisibleItemIndex,
	};
};
