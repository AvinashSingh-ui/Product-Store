import { Row, Col, Empty } from "antd";
import ProductCard from "./ProductCard";

function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <Empty
        description="No products found."
        style={{ margin: "48px 0" }}
      />
    );
  }

  return (
    <Row gutter={[20, 20]}>
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <ProductCard
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;
