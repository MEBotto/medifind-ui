import { useAppSelector } from '@/app/hooks';
import { selectCheckoutPreview } from '@/features/cart/checkoutSelectors';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const formatAmount = (cents: number) =>
  (cents / 100).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CheckoutPage = () => {
  const preview = useAppSelector(selectCheckoutPreview);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Resumen del pedido</h1>
      {preview.empty ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <p>{preview.quantity} unidades en {preview.pharmacyCount} farmacias.</p>
          {preview.groups.map(group => (
            <section key={group.pharmacyId} className="rounded-lg border p-4 space-y-2">
              <h2 className="font-semibold">{group.items[0]?.pharmacyName}</h2>
              {group.items.map(item => (
                <p key={item.listingId}>{item.name} × {item.quantity}</p>
              ))}
              <p>Subtotal estimado: ${formatAmount(group.totalCents)}</p>
            </section>
          ))}
          <p className="font-semibold">Total estimado: ${formatAmount(preview.estimatedTotalCents)}</p>
          <p role="status">La confirmación de pedidos todavía no está disponible.</p>
          <Button disabled>Confirmar pedido</Button>
        </>
      )}
      <Link className="block underline" to="/dashboard/cart">Volver al carrito</Link>
    </section>
  );
};

export default CheckoutPage;
