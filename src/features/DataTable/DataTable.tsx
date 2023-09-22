import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { useEntryFile, useEntryFileFields } from '../../state';
import styled from 'styled-components';

const GridWrapper = styled.div`
  width: 500px;
  height: 200px;
	background: red;
`;
const Table = styled.table`
	padding: 16px 0;
`;
const TableRow = styled.tr`
	padding: 16px 0;
`;
const RowItem = styled.td`
  padding-right: 16px;
  height: 40px;
  vertical-align: text-top;
  font-size: 14px;

	&:last-of-type {
		padding-right: 0;
	}
`;
const HeadingItem = styled(RowItem)`
  font-weight: 700;
  font-size: 16px;
`;

// const Cell = ({ columnIndex, rowIndex, style }) => (
// 	<div style={style}>
// 		Item
// 		{' '}
// 		{rowIndex}
// 		,
// 		{columnIndex}
// 	</div>
// );
export const DataTable = () => {
	const entryFile = useEntryFile();
	const entryFields = useEntryFileFields();
	const entryFieldsUI = entryFields.filter(field => field !== 'id');

	return (
		<GridWrapper>
			<AutoSizer>
				{/* @ts-ignore */}
				{({ height, width }) => (
					<Grid
						columnCount={entryFieldsUI.length}
						columnWidth={width}
						rowCount={entryFile.length}
						rowHeight={height}
						height={800}
						width={600}
					>
						{(props) => {
							console.log(props);

							return null;
						} }
					</Grid>
				)}
			</AutoSizer>
		</GridWrapper>
	);
};
