import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allExercisesMeta {
      count
    }
  }
`;

export default function Pagination({ page, sportCategory }) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return 'Loading...';
  if (error) return <DisplayError error={error} />;
  const { count } = data._allExercisesMeta;
  const pageCount = Math.ceil(count / perPage);
  console.log(sportCategory)
  return (
    <PaginationStyles>
      <Head>
        <title>
          Coach Zone - Page {page} of {pageCount}
        </title>
      </Head>
        <Link href={{ pathname: '/exercises', query: { page: page - 1, sportCategory: sportCategory } }}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
        <Link href={{ pathname: '/exercises', query: { page: page + 1, sportCategory: sportCategory } }}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}
