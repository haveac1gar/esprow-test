import React from 'react';
import { FIELD_TYPE } from '../types';

type EditableFieldProps = {
  type: FIELD_TYPE;
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableField = ({ type, value, onChange }: EditableFieldProps) => {
	return (
		<>
			Editable Field: (
			{type}
			)
			{' '}
			{value}
		</>
	);
};
