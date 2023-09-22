import React, { useCallback } from 'react';
import { EntryFileRaw, LoadingStatus, useLoadingState, useSetEntryFile, useSetLoadingState } from '../../state';

export const FileLoader = () => {
  const setEntryFile = useSetEntryFile();
  const setLoadingState = useSetLoadingState();

  const handleFileChosen = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingState(LoadingStatus.LOADING)

    try {
      e.preventDefault();

      const files = e.target.files;

      if (!files || !files[0]) {
        setLoadingState(LoadingStatus.ERROR);
        return;
      }

      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        try {
          const entryFile = JSON.parse(fileReader.result as string) as EntryFileRaw;
          setEntryFile(entryFile);
          console.log('set Loading state OPENED')
          setLoadingState(LoadingStatus.OPENED);
        } catch (e) {
          setLoadingState(LoadingStatus.ERROR);
        }
      }

      fileReader.readAsText(files[0]);
    } catch (e) {
      setLoadingState(LoadingStatus.ERROR);
    }
  }, []);

  return (
    <input
      type='file'
      accept='json'
      onChange={handleFileChosen}
    />
  )
};