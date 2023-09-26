import React from 'react';
import { EntryFileRow } from '../../types';
import styled from 'styled-components';
import { EditableField } from './EditableField';

const Container = styled.div<{ $isOdd: boolean }>`
  width: 100%;
	overflow: hidden;
	display: flex;
	padding: 16px;
	border-bottom: 1px dotted grey;

	flex-direction: row;
	flex-wrap: wrap;
	background: ${({ $isOdd }) => ($isOdd ? 'lightgreen' : 'lightyellow')};
`;

const ItemRow = ({ id, isOdd, ...rest }: EntryFileRow & { isOdd: boolean }) => {
	const fieldNames = Object.keys(rest);

	if (!fieldNames.length) return null;

	return (
		<Container $isOdd={isOdd}>
			{fieldNames.map(name => <EditableField name={name} id={id} key={`${name}-${id}`} />)}
		</Container>
	);
};

export const MemoizedItemRow = React.memo(ItemRow, (prev, next) => prev.id === next.id) as typeof ItemRow;
