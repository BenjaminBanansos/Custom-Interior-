import ProductBuilder from '../../../../../components/ProductBuilder';

export default async function EditProductRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductBuilder productId={id} />;
}
