# ===============================
# CREATE BASE SRC STRUCTURE
# ===============================

$base = "src"

$dirs = @(
  "$base/app",
  "$base/assets/images",
  "$base/assets/styles/components",
  "$base/assets/styles/admin",
  "$base/assets/styles/user",

  "$base/components/common",
  "$base/components/layout",
  "$base/components/admin",
  "$base/components/user/dashboard",
  "$base/components/user/cart",

  "$base/pages/admin",
  "$base/pages/shop",

  "$base/contexts",
  "$base/hooks",
  "$base/utils"
)

$files = @(
  "$base/app/App.jsx",
  "$base/app/main.jsx",
  "$base/app/routes.jsx",

  "$base/assets/styles/base.css",

  "$base/components/common/Skeleton.jsx",
  "$base/components/common/Modal.jsx",
  "$base/components/common/Button.jsx",

  "$base/components/layout/PrimaryNavbar.jsx",
  "$base/components/layout/Footer.jsx",
  "$base/components/layout/BaseLayout.jsx",

  "$base/components/admin/Sidebar.jsx",
  "$base/components/admin/Topbar.jsx",
  "$base/components/admin/AdminOverview.jsx",

  "$base/components/user/dashboard/UserDashboard.jsx",
  "$base/components/user/dashboard/Delivery.jsx",
  "$base/components/user/dashboard/Transaction.jsx",

  "$base/components/user/cart/MyCart.jsx",
  "$base/components/user/cart/DashboardOverview.jsx",

  "$base/pages/admin/ProductList.jsx",
  "$base/pages/admin/ProductCreate.jsx",

  "$base/pages/shop/ShoppingWindow.jsx",
  "$base/pages/shop/ProductDetails.jsx",

  "$base/contexts/CartContext.jsx",
  "$base/contexts/AuthContext.jsx",

  "$base/hooks/useOutsideClick.js",

  "$base/utils/api.js",
  "$base/utils/helpers.js",

  "$base/index.css"
)

foreach ($dir in $dirs) {
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "Created dir: $dir"
  }
}

foreach ($file in $files) {
  if (!(Test-Path $file)) {
    New-Item -ItemType File -Force -Path $file | Out-Null
    Write-Host "Created file: $file"
  }
}

Write-Host "`n✅ Folder structure initialized successfully."
