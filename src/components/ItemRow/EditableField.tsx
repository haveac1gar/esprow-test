import React, {
	ChangeEvent, PropsWithChildren, useCallback, useMemo,
} from 'react';
import { FIELD_TYPE, ItemId } from '../../types';
import styled from 'styled-components';

import {
	itemFieldSelector, updateField, useAppDispatch, useAppSelector,
} from '../../state';
import { getDateStoredValue, getDateUIValue, getFieldType } from './utils';

type EditableFieldProps = {
	name: string;
	id: ItemId;
};

const Container = styled.div`
	display: flex;
	margin: 0 48px 8px 0;
	width: calc((100% - 48px * 2) / 3);
	flex-direction: column;
	align-items: flex-start;
	border-bottom: 1px solid lightgrey;

	&:nth-child(3n) {
		margin-right: 0;
	}
`;
const Label = styled.label`
	font-size: 12px;
	padding: 0 0 4px 4px;
	width: 100%;
	color: grey;
`;
const Input = styled.input`
	font-size: 14px;
	height: 24px;
	padding: 4px;
	width: 100%;
	display: flex;
	outline: none;
	border: none;
	transition: all .05s ease;

	&[type=checkbox] {
		min-width: auto;
	}

	&:focus {
		background: lightgray;
	}
`;
const PlainText = styled.div`
	font-size: 14px;
	height: 24px;
	padding: 4px;
	width: 100%;
	align: left;
	outline: none;
	border: none;
	color: #90917E;
`;
const Textarea = styled.textarea`
	font-size: 14px;
	line-height: 20px;
	height: 73px;
	padding: 4px;
	width: 100%;
	outline: none;
	border: none;
	resize: none;
	transition: all .05s ease;

	&:focus {
		background: lightgray;
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

const CheckboxField = React.memo(({ name, id }: EditableFieldProps) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id)) as boolean;
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
				checked={value}
				onChange={onChange}
			/>
		</FieldWrapper>
	);
});

const DateField = React.memo(({ name, id }: EditableFieldProps) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id)) as string;
	const dispatch = useAppDispatch();
	const inputId = `${name}-${id}`;

	const inputValue = getDateUIValue(value);

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		try {
			dispatch(updateField({
				id,
				name,
				value: getDateStoredValue(e.target.value),
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

const TextField = React.memo(({ name, id, type = 'text' }: EditableFieldProps & { type?: 'email' | 'text'}) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id)) as string;
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
				value={value}
				onChange={onChange}
			/>
		</FieldWrapper>
	);
});

const NumberField = React.memo(({ name, id }: EditableFieldProps) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id)) as number;
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

const TextareaField = React.memo(({ name, id }: EditableFieldProps) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id)) as string;
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
				value={value}
				onChange={onChange}
			/>
		</FieldWrapper>
	);
});

const JSONLIkeField = React.memo(({ name, id }: EditableFieldProps) => (
	<FieldWrapper name={name} id={id}>
		<PlainText>
			{'[{ JSON-like value }]'}
		</PlainText>
	</FieldWrapper>
));

export const EditableField = React.memo(({ name, id }: EditableFieldProps) => {
	const value = useAppSelector(state => itemFieldSelector(state, name, id));
	const valueType = useMemo(() => getFieldType(value), [value]);

	if (valueType === FIELD_TYPE.BOOLEAN) {
		return <CheckboxField name={name} id={id} />;
	}

	if (valueType === FIELD_TYPE.DATE) {
		return <DateField name={name} id={id} />;
	}

	if (valueType === FIELD_TYPE.EMAIL) {
		return <TextField name={name} id={id} type="email" />;
	}

	if (name === 'id') return null;

	if (valueType === FIELD_TYPE.JSON_LIKE_VALUE) {
		return <JSONLIkeField name={name} id={id} />;
	}

	if (valueType === FIELD_TYPE.LONG_TEXT) {
		return <TextareaField name={name} id={id} />;
	}

	if (valueType === FIELD_TYPE.NUMBER) {
		return <NumberField name={name} id={id} />;
	}

	if (valueType === FIELD_TYPE.TEXT) {
		return <TextField name={name} id={id} />;
	}

	// TODO: Unknown
	return null;
});
