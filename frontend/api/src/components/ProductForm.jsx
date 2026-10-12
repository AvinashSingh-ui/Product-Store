import { useEffect, useState } from "react";
import { Card, Input, Button, Space } from "antd";
import {EditOutlined, PlusOutlined,CloseOutlined,PictureOutlined,ShoppingOutlined} from "@ant-design/icons";

function ProductForm({
  onAddProduct,
  editingProduct,
  onUpdateProduct,
  onCancelEdit,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(String(editingProduct.price));
      setImage(editingProduct.image);
    } else {
      setName("");
      setPrice("");
      setImage("");
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name: name.trim(),
      price: Number(price),
      image: image.trim(),
    };

    try {
      if (editingProduct) {
        await onUpdateProduct(editingProduct.id, product);
        onCancelEdit();
      } else {
        await onAddProduct(product);
      }

      setName("");
      setPrice("");
      setImage("");
    } catch {
      // Parent component handles API errors.
    }
  };

  const handleCancel = () => {
    setName("");
    setPrice("");
    setImage("");
    onCancelEdit();
  };

  return (
    <Card
      title={editingProduct ? "Edit Product" : "Add New Product"}
      style={{ marginBottom: 24 }}
    >
      <form onSubmit={handleSubmit}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Input
            prefix={<ShoppingOutlined />}
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="number"
            min="0"
            prefix="₹"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <Input
            type="url"
            prefix={<PictureOutlined />}
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />

          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={editingProduct ? <EditOutlined /> : <PlusOutlined />}
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>

            {editingProduct && (
              <Button icon={<CloseOutlined />} onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </Space>
        </Space>
      </form>
    </Card>
  );
}

export default ProductForm;
