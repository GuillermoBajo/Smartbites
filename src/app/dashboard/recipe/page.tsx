import { getPageCount } from '@/lib/dao/recipe';
import Pagination from '@/ui/recipe/pagination';
import Search from '@/ui/recipe/search';
import Table from '@/ui/recipe/table';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getPageCount(query);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 md-8">
        <Search placeholder="Search recipe..." />
      </div>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}