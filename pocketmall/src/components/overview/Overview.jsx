
import '../../assets/style/overview.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// images
import mensClothing from '../../assets/images/mensClothing.jpg'
import womensClothing from '../../assets/images/womensClothing.avif'
import kidsClothing from '../../assets/images/kidsClothing.webp'

// sale
import pocetMallSale from '../../assets/images/pocketMallSale.png'


function Overview() {

  let [loading,setLoading] = useState(false)
  let [page,setPage] = useState(null)

  let navigate = useNavigate()


  let handlePage=(page)=>{
    setLoading(true)
    setPage(page)
    console.log("directing to Page:",page.toUpperCase())

    setTimeout(() => {
      navigate('shopping')
      setLoading(false)
    }, 2000);

  }

  return (
    <>
    <div className='shoppingMall'>
            <div className='mensBlock'>
              <img src={mensClothing} alt="" />
              
              <div 
              onClick={()=>handlePage("mens")} 
              style={{pointerEvents:loading && (page=="womens" || page=="kids") ? "none":"auto"}}>
              
              <span>
                {loading && page=="mens" ?"Loading...":"MENS"} </span></div>
            </div>

            <div onClick={()=>handlePage("womens")} className='womensBlock'
              style={{pointerEvents:loading && (page=="mens" || page=="kids") ? "none":"auto"}}
              >
              <img src={womensClothing} alt="" />
              <div><span>  {loading && page=="womens" ?"Loading...":"WOMENS"}</span></div>

            </div>

            <div onClick={()=>handlePage("kids")} className='kidsBlock'
              style={{pointerEvents:loading && (page=="womens" || page=="mens") ? "none":"auto"}}>
              <img src={kidsClothing} alt="" />
              <div><span>  {loading && page=="kids" ?"Loading...":"KIDS"}</span></div>
            </div>
          </div>

          <div className='saleWindow'>
            <div className='saleBgImg'>
              <img src={pocetMallSale} alt="" />
              <div className='exploreDeals'><button>Discover Deals</button></div>
            </div>

          </div>
    </>
  )
}

export default Overview
