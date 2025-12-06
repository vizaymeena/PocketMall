Write-Host "🚀 Starting PocketMall project restructuring..." -ForegroundColor Cyan

# --- CREATE NEW STRUCTURE ---

# Create folders
mkdir "components/admin" -Force
mkdir "components/product" -Force
mkdir "components/product/stepper" -Force
mkdir "components/banners" -Force
mkdir "components/overview" -Force
mkdir "components/reviews" -Force
mkdir "pages/admin" -Force
mkdir "pages/shopping" -Force

# --- MOVE + RENAME FILES ---

# Admin Components
Write-Host "Moving admin components..."
Move-Item "components\Admindashboard.jsx" "components\admin\AdminDashboard.jsx"
Move-Item "components\AdminOverview.jsx" "components\admin\AdminOverview.jsx"

# Product Components
Write-Host "Moving product components..."
Move-Item "components\ProductDetails.jsx" "components\product\ProductDetails.jsx"
Move-Item "components\SimilarProduct.jsx" "components\product\SimilarProduct.jsx"

# Stepper Components
Write-Host "Moving stepper..."
Move-Item "components\productStepper\ProductStepper.jsx" "components\product\stepper\ProductStepper.jsx"
Move-Item "components\productStepper\Steps.jsx" "components\product\stepper\Steps.jsx"

# Banner Components
Write-Host "Moving banners..."
Move-Item "components\Billboard.jsx" "components\banners\Billboard.jsx"

# Overview Component
Write-Host "Moving Overview..."
Move-Item "components\Overview.jsx" "components\overview\Overview.jsx"

# Reviews Component
Write-Host "Moving Reviews..."
Move-Item "components\Reviews.jsx" "components\reviews\Reviews.jsx"

# --- MOVE PAGES ---

Write-Host "Moving pages..."
Move-Item "pages\ProductCreation.jsx" "pages\admin\ProductCreation.jsx"
Move-Item "pages\ShoppingWindow.jsx" "pages\shopping\ShoppingWindow.jsx"

# --- MOVE LAYOUT FILES ---

Write-Host "Renaming layout files..."
Rename-Item "layout\Base.jsx" "BaseLayout.jsx"
Rename-Item "layout\Navbar.jsx" "PrimaryNavbar.jsx"

# --- REMOVE OLD FOLDERS ---

Write-Host "Cleaning up old folders..."
Remove-Item "components\productStepper" -Recurse -Force

Write-Host "Folder structure successfully updated!" -ForegroundColor Green
