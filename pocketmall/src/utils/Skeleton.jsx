import '../assets/style/skeleton.css'
export function SkeletonCard() {
  return (
    <div className="listItem skeletonProduct">
      <div className="left">
        <div className="imgSkeleton"></div>
      </div>
      <div className="center">
        <div className="line w1"></div>
        <div className="line w2"></div>
        <div className="line w3"></div>
      </div>
      <div className="right">
        <div className="btnSkeleton"></div>
        <div className="btnSkeleton"></div>
      </div>
    </div>
  );
}


export function ProductSkeleton() {
  return (
    <div className="productCard skeleton">
      <div className="productOverview">
        <div className="productTop skeleton-img" />
        <div className="productBottom">
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
        </div>
      </div>
    </div>
  )
}
