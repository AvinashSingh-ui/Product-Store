import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./Services/productService.js";

import { Layout, Typography, Spin, Alert, Badge, Space } from "antd";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts(
          search,
          controller.signal
        );

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
          setError("Invalid response format received from server.");
        }
      } catch (err) {
        if (controller.signal.aborted) return;

        setError("Unable to fetch products.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [search]);

  const handleAddProduct = async (product) => {
    try {
      setError("");
      setLoading(true);
      await createProduct(product);
      const response = await getProducts(search);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create product."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateProduct = async (id, product) => {
    try {
      setLoading(true);
      setError("");
      await updateProduct(id, product);
      const res = await getProducts(search);
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setError("");
  };

  const handledeleteProduct = async (id) => {
    try {
      setError("");
      setLoading(true);
      await deleteProduct(id);
      const res = await getProducts(search);
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      }
      if (editingProduct?.id === id) {
        setEditingProduct(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete the Product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Header
        style={{
          background: "#001529",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          Product Store
        </Title>
      </Header>

      <Content
        style={{
          maxWidth: 1100,
          margin: "24px auto",
          padding: "0 16px",
          width: "100%",
        }}
      >
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError("")}
            style={{ marginBottom: 20 }}
          />
        )}

        <ProductForm
          onAddProduct={handleAddProduct}
          editingProduct={editingProduct}
          onUpdateProduct={handleUpdateProduct}
          onCancelEdit={handleCancelEdit}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <SearchBar search={search} onSearch={setSearch} />

          <Space>
            <span>Total Products:</span>
            <Badge count={products.length} showZero color="#1677ff" />
          </Space>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <Spin size="large" tip="Loading products..." />
          </div>
        ) : (
          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handledeleteProduct}
          />
        )}
      </Content>
    </Layout>
  );
}

export default App;