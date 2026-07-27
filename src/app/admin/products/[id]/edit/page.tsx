import ProductBuilder from '../../../../../components/ProductBuilder';

export default function EditProductRoute({ params }: { params: { id: string } }) {
  return <ProductBuilder productId={params.id} />;
}
