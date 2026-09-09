import ProductBuilder from '../../../../../components/ProductBuilder';

export default function EditProductRoute(props: any) {
  const id = props?.params?.id || '';
  return <ProductBuilder productId={id} />;
}
