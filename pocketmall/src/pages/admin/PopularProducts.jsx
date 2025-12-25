import '../../assets/style/admindashboard/popularproducts.css'

export default function PopularProducts() {
  return (
    <div className="popularProducts">
      <h2>Popular Products</h2>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Nike Air Max</td>
            <td>320</td>
            <td>₹3.2L</td>
          </tr>
          <tr>
            <td>Adidas Runner</td>
            <td>280</td>
            <td>₹2.7L</td>
          </tr>
          <tr>
            <td>Puma Flex</td>
            <td>210</td>
            <td>₹1.9L</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
