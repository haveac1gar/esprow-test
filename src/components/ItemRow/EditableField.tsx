import React, { ChangeEvent, PropsWithChildren, useCallback } from 'react';
import { EntryFileRowUI, ItemId } from '../../types';
import styled from 'styled-components';

import { zonedTimeToUtc } from 'date-fns-tz';
import { format } from 'date-fns';
import {
	itemFieldSelector, updateField, useAppDispatch, useAppSelector,
} from '../../state';

type EditableFieldProps = {
	name: keyof EntryFileRowUI;
	id: ItemId;
};

const Container = styled.div`
	display: inline-flex;
	margin: 0 48px 8px 0;
	flex-direction: column;
	align-items: flex-start;
`;
const Label = styled.label`
	font-size: 12px;
	padding: 0 0 4px 4px;
	width: 100%;
	color: grey;
`;
const Input = styled.input`
	font-size: 14px;
	padding: 4px;
	min-width: 180px;
	align: left;
	outline: none;
	border: none;
	border-bottom: 1px solid grey;
	margin-bottom: 1px;
	transition: all .05s ease;

	&[type=checkbox] {
		min-width: auto;
	}

	&:focus {
		border-bottom: 2px solid red;
		background: lightgray;
		margin-bottom: 0;
	}
`;
const Textarea = styled.textarea`
	font-size: 16px;
	width: 400px;
	outline: none;
	border: none;
	resize: none;
	border-bottom: 1px solid grey;
	margin-bottom: 1px;
	transition: all .05s ease;

	&:focus {
		border-bottom: 2px solid red;
		margin-bottom: 0;
	}
`;

const FieldWrapper = ({ name, id, children }: PropsWithChildren<EditableFieldProps>) => {
	const inputId = `${name}-${id}`;

	return (
		<Container>
			<Label htmlFor={inputId}>
				{name}
			</Label>
			{children}
		</Container>
	);
};

export const CheckboxField = React.memo(({ name, id }: EditableFieldProps) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id));
	const dispatch = useAppDispatch();
	const inputId = `${name}-${id}`;

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateField({
			id,
			name,
			value: Boolean(e.target.checked),
		}));
	}, [dispatch, id, name]);

	return (
		<FieldWrapper name={name} id={id}>
			<Input
				id={inputId}
				type="checkbox"
				checked={Boolean(value)}
				onChange={onChange}
			/>
		</FieldWrapper>
	);
});

export const DateField = React.memo(({ name, id }: EditableFieldProps) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id));
	const dispatch = useAppDispatch();
	const inputId = `${name}-${id}`;

	const inputValue = format(
		zonedTimeToUtc(String(value).split(' ')[0], String(value).split(' ')[1]).getTime(),
		'yyyy-MM-dd',
	);

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		try {
			const newValue = format(new Date(e.target.value).getTime(), "yyyy-MM-dd'T'HH:mm:ss xxx");
			dispatch(updateField({
				id,
				name,
				value: newValue,
			}));
		// eslint-disable-next-line no-empty
		} catch (_e) {}
	}, [dispatch, id, name]);

	return (
		<FieldWrapper name={name} id={id}>
			<Input
				id={inputId}
				type="date"
				value={inputValue}
				onChange={onChange}
			/>
		</FieldWrapper>
	);
});

export const TextField = React.memo(({ name, id, type = 'text' }: EditableFieldProps & { type?: 'email' | 'text'}) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id));
	const dispatch = useAppDispatch();
	const inputId = `${name}-${id}`;

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateField({
			id,
			name,
			value: e.target.value,
		}));
	}, [dispatch, id, name]);

	return (
		<FieldWrapper name={name} id={id}>
			<Input
				id={inputId}
				type={type}
				value={String(value)}
				onChange={onChange}
			/>
		</FieldWrapper>
	);
});

export const NumberField = React.memo(({ name, id }: EditableFieldProps) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id));
	const dispatch = useAppDispatch();
	const inputId = `${name}-${id}`;

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateField({
			id,
			name,
			value: Number(e.target.value),
		}));
	}, [dispatch, id, name]);

	return (
		<FieldWrapper name={name} id={id}>
			<Input
				id={inputId}
				type="number"
				value={String(value)}
				onChange={onChange}
			/>
		</FieldWrapper>
	);
});

export const TextareaField = React.memo(({ name, id }: EditableFieldProps) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id));
	const dispatch = useAppDispatch();
	const inputId = `${name}-${id}`;

	const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(updateField({
			id,
			name,
			value: e.target.value,
		}));
	}, [dispatch, id, name]);

	return (
		<FieldWrapper name={name} id={id}>
			<Textarea
				id={inputId}
				rows={4}
				value={String(value)}
				onChange={onChange}
			/>
		</FieldWrapper>
	);
});
