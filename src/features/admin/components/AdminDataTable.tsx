import { memo } from 'react';
import { useParams } from 'react-router-dom';
import AdminModulePage from './AdminModulePage';

const AdminDataTable = memo(() => {
  const { module: moduleId = 'hero' } = useParams();
  return <AdminModulePage moduleId={moduleId} />;
});

AdminDataTable.displayName = 'AdminDataTable';
export default AdminDataTable;
