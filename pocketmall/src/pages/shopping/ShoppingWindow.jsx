import { useEffect, useState } from "react"
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component"
import ProductCard from "./ProductCard"
import { ProductSkeleton } from "../../utils/Skeleton"
import "../../assets/style/shopping.css"

function ShoppingWindow() {
  let [products, setProducts] = useState([])
  let [nextUrl, setNextUrl] = useState("http://127.0.0.1:8000/api/products/")
  let [hasMore, setHasMore] = useState(true)
  let [loading, setLoading] = useState(false)


  let fetchMoreData = async () => {
    if (!nextUrl || loading) {
      setHasMore(false)
      return
    }

    try {
      setLoading(true)
      const res = await axios.get(nextUrl)

      setProducts(prev => [...prev, ...res.data.results])
      setNextUrl(res.data.next)
      setHasMore(Boolean(res.data.next))
    } catch (err) {
      console.error("Product fetch failed", err)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchMoreData()
  }, [])

  return (
    <section className="shopSection">
      {/* ===== HEADER ===== */}
      <div className="shopHeader">
        <div>
          <h1 className="shopTitle">Men's Collection</h1>
          <p className="shopSubtitle">
            {products.length} products available
          </p>
        </div>

        {/* Placeholder for future filters */}
        <div className="shopActions">
          <select>
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* ===== PRODUCT GRID ===== */}
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<ProductSkeleton />}
        scrollThreshold={0.9}
      >
        <div className="productGrid">
          {products.map(p => (
            <ProductCard key={p.id || p.product_code} product={p} />
          ))}
        </div>
      </InfiniteScroll>

      {/* ===== END STATE ===== */}
      {!hasMore && (
        <p className="endMessage">
          You've reached the end of the list
        </p>
      )}
    </section>
  )
}

export default ShoppingWindow
