import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetListingDetailQuery } from '@/features/catalog/catalogApi';

export default function DetailPage() {
  const { listingId } = useParams();
  useGetListingDetailQuery(listingId ?? skipToken);
  return null;
}
