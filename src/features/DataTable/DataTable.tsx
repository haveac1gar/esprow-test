import React from 'react';
import { useEntryFile, useEntryFileFields } from '../../state';
import styled from 'styled-components';

const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
`;
const Table = styled.table`
`;
const TableRow = styled.tr`
`;
const RowItem = styled.td`
  padding: 0 16px 16px 16px;
  height: 40px;
  vertical-align: text-top;
  font-size: 14px;
`;
const HeadingItem = styled(RowItem)`
  font-weight: 700;
  font-size: 16px;
`;

export const DataTable = () => {
  const entryFile = useEntryFile();
  const entryFields = useEntryFileFields();

  return (
    <TableWrapper>
      <Table>
        <TableRow>
          {entryFields.map(col => (<HeadingItem key={col}>{col}</HeadingItem>))}
        </TableRow>
        {entryFile.map(el => {
          return (
            <TableRow key={el.idx}>
              {entryFields.map(col => {
                if (Object.prototype.hasOwnProperty.call(el, col)) {
                  return <RowItem key={`${el.idx}-${col}`}>{`${el[col]}`}</RowItem>
                }

                return <RowItem key={`${el.idx}-${col}`}></RowItem>
              })}
            </TableRow>
          )
        })}
      </Table>
    </TableWrapper>
  )
};
