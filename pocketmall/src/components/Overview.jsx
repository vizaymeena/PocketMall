import React from 'react'
import '../assets/style/overview.css'

// images
import mensClothing from '../assets/images/mensClothing.jpg'
import womensClothing from '../assets/images/womensClothing.avif'
import kidsClothing from '../assets/images/kidsClothing.webp'

// sale
import pocetMallSale from '../assets/images/pocketMallSale.png'


function Overview() {
  return (
    <>
    <div className='shoppingMall'>
            <div className='mensBlock'>
              <img src={mensClothing} alt="" />
              
              <div><span>MENS</span></div>
            </div>

            <div className='womensBlock'>
              <img src={womensClothing} alt="" />
              <div><span>WOMENS</span></div>

            </div>

            <div className='kidsBlock'>
              <img src={kidsClothing} alt="" />
              <div><span>KIDS</span></div>
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