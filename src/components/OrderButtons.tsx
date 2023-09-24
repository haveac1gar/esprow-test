import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { sortBy, useAppDispatch, useAppSelector } from '../state';
import { EntryFileRowUI } from '../types';

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
	const dispatch = useAppDispatch();

	const orderRef = useRef<HTMLSelectElement | null>(null);
	const fieldRef = useRef<HTMLSelectElement | null>(null);

	const onClick = useCallback(() => {
		const order = orderRef.current;
		const field = fieldRef.current;

		if (!order || !field) return;

		dispatch(sortBy({
			type: order.value as 'ASC' | 'DESC',
			field: field.value as keyof EntryFileRowUI,
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
					<option value="isActive">
						isActive
					</option>
					<option value="name">
						name
					</option>
					<option value="picture">
						picture
					</option>
					<option value="address">
						address
					</option>
					<option value="registered">
						registered
					</option>
					<option value="email">
						email
					</option>
					<option value="age">
						age
					</option>
				</select>
			</SortingContainer>
			<Button onClick={onClick} type="button">
				SORT!
			</Button>
		</Container>
	);
};
