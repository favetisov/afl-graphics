import { useMemo } from 'react';
export const FtbTableRow = ({ idx, children }: any) => useMemo(() => children, [idx]);
