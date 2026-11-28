import { useAppSelector } from '@/app/hooks';
import { selectCheckoutPreview, selectCheckoutRequests } from './checkoutSelectors';

export function useCheckout() {
  const preview = useAppSelector(selectCheckoutPreview);
  const requests = useAppSelector(selectCheckoutRequests);
  return { ...preview, requests };
}
