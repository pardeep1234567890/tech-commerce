# Cloudinary Setup Instructions

## Step 1: Create a Cloudinary Account
1. Go to https://cloudinary.com/
2. Sign up for a free account
3. After logging in, you'll see your Dashboard

## Step 2: Get Your Credentials
On your Cloudinary Dashboard, you'll find:
- **Cloud Name**
- **API Key**
- **API Secret**

## Step 3: Update .env File
Open `/server/.env` and replace the placeholder values:

```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

## Step 4: Restart the Server
After updating the .env file, restart your server:
```bash
cd server
npm run dev
```

## Features Implemented
✅ File upload with drag & drop UI
✅ Image preview before upload
✅ Automatic upload to Cloudinary
✅ Image optimization (800x800, auto quality, auto format)
✅ 5MB file size limit
✅ Organized in 'tech-commerce/products' folder on Cloudinary
✅ Fallback to URL input if preferred
✅ Loading states during upload

## How It Works
1. Admin selects an image file
2. Image is previewed locally
3. File is automatically uploaded to Cloudinary
4. Cloudinary returns the secure URL
5. URL is saved in the product data
6. Alternative: Can still paste image URLs directly
