import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { sortBy, useAppDispatch, useAppSelector } from '../state';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 16px;
`;
const SortingContainer = styled.div`
	display: flex;
	flex-directon: column;
`;
const Button = styled.button`
	outline: none;
	padding: 16px 48px;
	font-size: 14px;
`;

export const OrderButtons = () => {
	const filename = useAppSelector(state => state.entryFile.name);
	const fieldNames = useAppSelector(state => state.entryFile.fieldNames);
	const dispatch = useAppDispatch();

	const orderRef = useRef<HTMLSelectElement | null>(null);
	const fieldRef = useRef<HTMLSelectElement | null>(null);

	const onClick = useCallback(() => {
		const order = orderRef.current;
		const field = fieldRef.current;

		if (!order || !field) return;

		dispatch(sortBy({
			type: order.value as 'ASC' | 'DESC',
			field: field.value,
		}));
	}, [dispatch]);

	if (!filename) return null;

	return (
		<Container>
			<SortingContainer>
				<select id="sortingOrder" ref={orderRef}>
					<option value="ASC">
						Ascending
					</option>
					<option value="DESC">
						Descending
					</option>
				</select>
				<select id="sortingField" ref={fieldRef}>
					{fieldNames.map(name => (name === 'id' ? null : (
						<option key={name} value={name}>{name}</option>
					)))}
				</select>
			</SortingContainer>
			<Button onClick={onClick} type="button">
				SORT!
			</Button>
		</Container>
	);
};
