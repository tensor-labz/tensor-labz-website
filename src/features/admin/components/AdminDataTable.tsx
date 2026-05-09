import { memo } from 'react';
import { useParams } from 'react-router-dom';
import CrudTable from './CrudTable';

const AdminDataTable = memo(() => {
  const { module: moduleId = 'hero' } = useParams();
  return <CrudTable moduleId={moduleId} />;
});

AdminDataTable.displayName = 'AdminDataTable';
export default AdminDataTable;
