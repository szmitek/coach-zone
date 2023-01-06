import { useRouter } from 'next/dist/client/router';
import Exercises from '../../components/Exercises';
import Pagination from '../../components/Pagination';

export default function OrderPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <Pagination page={page || 1} />
      <Exercises page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
