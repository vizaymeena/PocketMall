import '../../../assets/style/userdashboard/delivery.css'
import deliveryProduct from '../../../assets/images/bluetshirt.jpg'



export default function Delivery() {

    let deliveryList = [

        {img:deliveryProduct,pname:"mens winter jacket",size:"m",color:'black',price:1200,status:"Out for Delivery",expected:"tommarow"},
        {img:deliveryProduct,pname:"womens winter jacket",size:"xl",color:'green',price:2000,status:"Out for Delivery",expected:"tommarow"},
        {img:deliveryProduct,pname:"kids winter jacket",size:"m",color:'black',price:1200,status:"Out for Delivery",expected:"tommarow"},
        {img:deliveryProduct,pname:"kids winter jacket",size:"m",color:'black',price:1200,status:"Out for Delivery",expected:"tommarow"},
        {img:deliveryProduct,pname:"kids winter jacket",size:"m",color:'black',price:1200,status:"Out for Delivery",expected:"tommarow"},
        {img:deliveryProduct,pname:"kids winter jacket",size:"m",color:'black',price:1200,status:"Out for Delivery",expected:"tommarow"},
        {img:deliveryProduct,pname:"kids winter jacket",size:"m",color:'black',price:1200,status:"Out for Delivery",expected:"tommarow"},
        {img:deliveryProduct,pname:"kids winter jacket",size:"m",color:'black',price:1200,status:"Out for Delivery",expected:"tommarow"}
    ]

  return (
    <div className="deliverySection">

      <div className="deliveryHeader">
        <h2 className="deliveryTitle">In Delivery</h2>
        <span className="deliverySubtitle">
          Track your ongoing orders
        </span>
      </div>

      <div className="deliveryList">

       { deliveryList.map((el,key)=>(

         <div className="deliveryCard" key={key}>
          <div className="deliveryProduct">

            <div className="deliveryImageWrapper">
              <img className="deliveryImage" src={el.img} alt="Product"  />
            </div>
            <div className="deliveryDetails">
              <h3 className="deliveryProductName">{el.pname} </h3>

              <p className="deliveryMeta">Size: <span>{el.size}</span> · Color: <span>{el.color}</span></p>

              <p className="deliveryPrice">₹ {el.price} </p>
            </div>
          </div>

          {/* Right: Status Info */}
          <div className="deliveryStatus">
            <div className="deliveryProgress">
              <span className="progressLabel">Status</span>
              <span className="progressValue">{el.status}</span>
            </div>

            <div className="deliveryEta">
              <span className="etaLabel">Expected</span>
              <span className="etaValue">{el.expected}</span>
            </div>

            <button className="deliveryTrackBtn">Track Order</button>
          </div>

        </div>
       ))}

        {/* Repeat card for more items */}

      </div>
    </div>

  )
}
