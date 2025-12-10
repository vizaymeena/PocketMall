import '../assets/style/skeleton.css'
export default function SkeletonCard() {
  return (
    <div className="listItem skeleton">
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
