import React from 'react';
import { EntryFileRow, ItemId } from '../../types';
import styled from 'styled-components';
import {
	TextField, TextareaField, NumberField, CheckboxField, DateField,
} from './EditableField';
import { itemFieldSelector, useAppSelector } from '../../state';

export const ITEM_ROW_HEIGHT = 130;

const Container = styled.div`
  width: 100%;
  height: ${ITEM_ROW_HEIGHT}px;
	overflow: hidden;
	display: flex;
	padding: 16px 0;
	border-bottom: 1px dotted grey;
`;

const LeftContent = styled.div`
	width: 100px;
	display: flex;
	margin-right: 16px;
`;
const ImgWrapper = React.memo(styled.img`
	border-radius: 16px;
	width: 100px;
	height: 100px;
`);
const AboutContent = styled.div`
	width: 400px;
	flex-direction: column;
	flex-wrap: wrap;
	margin-right: 16px;
`;
const RightContent = styled.div`
	flex: 1;
	flex-direction: column;
	flex-wrap: wrap;
`;

const Image = ({ id, name }: { id: ItemId, name: string }) => {
	const imgSrc = useAppSelector(state => itemFieldSelector(state, 'picture', id));

	return <ImgWrapper src={String(imgSrc)} alt={name} />;
};

const ItemRow = ({ id, name }: EntryFileRow) => {
	return (
		<Container>
			<LeftContent>
				<Image id={id} name={name} />
			</LeftContent>
			<RightContent>
				<TextField name="picture" id={id} />
				<NumberField name="age" id={id} />
				<TextField name="name" id={id} />
				<TextField type="email" name="email" id={id} />
				<TextField name="address" id={id} />
				<DateField name="registered" id={id} />
				<CheckboxField name="isActive" id={id} />
			</RightContent>
			<AboutContent>
				<TextareaField name="about" id={id} />
			</AboutContent>
		</Container>
	);
};

export const MemoizedItemRow = React.memo(ItemRow, (prev, next) => prev.id === next.id) as typeof ItemRow;
