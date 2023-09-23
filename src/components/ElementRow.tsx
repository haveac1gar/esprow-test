import React from 'react';
import { EntryFileRow } from '../types';
import styled from 'styled-components';

export const ELEMENT_ROW_HEIGHT = 100;

const Container = styled.div`
  width: 100%;
  height: ${ELEMENT_ROW_HEIGHT}px;
	overflow: hidden;
	display: flex;
	padding: 8px 0;
`;

const LeftContent = styled.div`
	width: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-right: 16px;
`;
const ImgWrapper = React.memo(styled.img`
	border-radius: 16px;
	width: 100%;
	height: 100%;
`);
const RightContent = styled.div`
	flex: 1;
`;

const ElementRow = ({
	isActive,
	picture,
	age,
	name,
	email,
	address,
	about,
	registered,
}: EntryFileRow) => {
	return (
		<Container>
			<LeftContent>
				<ImgWrapper src={picture} alt={name} />
			</LeftContent>
			<RightContent>
				{isActive}
				{picture}
				{age}
				{name}
				{email}
				{address}
				{about}
				{registered}
			</RightContent>
		</Container>
	);
};

export const MemoizedElementRow = React.memo(ElementRow, (prev, next) => prev.id === next.id) as typeof ElementRow;
