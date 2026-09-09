import ProductBuilder from '../../../../../components/ProductBuilder';
import { getProducts } from '../../../../../lib/storage_actions';

export default async function EditProductRoute(props: any) {
  let id = '';
  if (props?.params) {
    try {
      const params = await Promise.resolve(props.params);
      id = params?.id || '';
    } catch(e) {
      id = props.params.id || '';
    }
  }
  
  if (id) {
    const products = await getProducts();
    const existingProduct = products.find((p: any) => p.id === id);
    return <ProductBuilder productId={id} initialData={existingProduct} />;
  }
  return <ProductBuilder productId={id} />;
}
