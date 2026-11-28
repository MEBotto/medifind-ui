import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetCatalogProductQuery } from '@/features/catalog/catalogApi';

export default function DetailPage() {
  const { productId } = useParams();
  useGetCatalogProductQuery(productId ?? skipToken);
  return null;
}
