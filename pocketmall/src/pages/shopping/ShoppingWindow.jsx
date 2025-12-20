import { useEffect, useRef, useState } from "react"
import axios from "axios"
import "../../assets/style/shopping.css"
import { Search } from "lucide-react"
import ProductCard from "./ProductCard"
import { ProductSkeleton } from "../../utils/Skeleton"

const PAGE_SIZE = 10
const MAX_RENDERED_ITEMS = 30

function ShoppingWindow() {
  const [products, setProducts] = useState([])
  const [nextUrl, setNextUrl] = useState("http://127.0.0.1:8000/api/products/")
  const [loading, setLoading] = useState(false)

  const loadingRef = useRef(false)
  const observerRef = useRef(null)
  const bottomRef = useRef(null)

  const mergeUnique = (prev, next) => {
    const map = new Map()
    prev.forEach(p => map.set(p.id, p))
    next.forEach(p => map.set(p.id, p))
    return Array.from(map.values())
  }

  const loadMore = async () => {
    if (!nextUrl || loadingRef.current) return

    loadingRef.current = true
    setLoading(true)

    try {
      const res = await axios.get(nextUrl)
      const data = res.data

      setProducts(prev => {
        const merged = mergeUnique(prev, data.results)

        if (merged.length > MAX_RENDERED_ITEMS) {
          return merged.slice(merged.length - MAX_RENDERED_ITEMS)
        }

        return merged
      })

      setNextUrl(data.next)
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }

  // initial load
  useEffect(() => {
    loadMore()
  }, [])

  // observer setup (ONLY ONCE)
  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    })

    if (bottomRef.current) {
      observerRef.current.observe(bottomRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="category">
      <div className="searchBox">
        <input type="search" placeholder="Search Items" />
        <button><Search color="white" /></button>
      </div>

     <main className="productItems">
        <div className="productsGrid">
          {products.map(el => (
            <ProductCard key={el.id} product={el} />
          ))}
        </div>
        
        {/* FIXED loader slot */}
        <div className="loaderSlot">
          {loading &&
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
        </div>
          
        {/* Observer OUTSIDE layout flow */}
        <div ref={bottomRef} className="observerSentinel" />
      </main>

    </div>
  )
}

export default ShoppingWindow
