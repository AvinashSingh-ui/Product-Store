import { Card, Button, Typography, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.image}
          style={{ height: 180, objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x200?text=No+Image";
          }}
        />
      }
      actions={[
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(product)}
        >
          Edit
        </Button>,
        <Popconfirm
          title="Delete product"
          description="Are you sure you want to delete this product?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => onDelete(product.id)}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>,
      ]}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Title level={5} style={{ marginBottom: 8 }} ellipsis={{ rows: 1 }}>
          {product.name}
        </Title>
        <Text strong style={{ fontSize: 18, color: "#1677ff" }}>
          Rs.{Number(product.price).toLocaleString()}
        </Text>
      </div>
    </Card>
  );
}

export default ProductCard;
