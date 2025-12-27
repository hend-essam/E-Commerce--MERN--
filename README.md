# E-Commerce Furniture Store

A full-stack e-commerce furniture store built with React, Node.js, and Next.js featuring a customer frontend, admin dashboard, and robust backend API.

## 🏗️ Project Structure

```
e-commerce-furniture-React-main/
├── backend/          # Node.js Express API server
├── frontend/         # React customer-facing application
├── admin/           # Next.js admin dashboard
└── README.md
```

## 🚀 Features

### Customer Frontend (React)

- **Product Catalog**: Browse furniture with filtering and search
- **Shopping Cart**: Add/remove items with quantity management
- **Wishlist**: Save favorite products
- **User Authentication**: Login/Register functionality
- **Order Management**: Place and track orders
- **Responsive Design**: Mobile-friendly interface
- **Smooth Animations**: React Slick carousel and scroll effects

### Admin Dashboard (Next.js)

- **Product Management**: Add, edit, delete furniture products
- **Order Management**: View and manage customer orders
- **Image Upload**: Cloudinary integration for product images
- **Authentication**: Secure admin login
- **Modern UI**: Tailwind CSS styling

### Backend API (Node.js/Express)

- **RESTful API**: Complete CRUD operations
- **Authentication**: JWT-based user and admin auth
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Multer with Cloudinary storage
- **Payment Integration**: Stripe and Razorpay support
- **Security**: bcrypt password hashing, CORS enabled

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **File Upload**: Multer + Cloudinary
- **Payment**: Stripe, Razorpay
- **Validation**: validator
- **Environment**: dotenv

### Frontend

- **Framework**: React 18
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **UI Components**: React Slick, React Scroll
- **Animations**: React Typed
- **Testing**: Jest, React Testing Library
- **Icons**: FontAwesome

### Admin Dashboard

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Notifications**: React Toastify
- **HTTP Client**: Axios

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database
- Cloudinary account (for image storage)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hend-essam/E-Commerce--MERN--.git

cd e-commerce-furniture-React-main
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

```env
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_NAME=your_cloudinary_name
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=your_admin_password
PORT=4000
```

Start backend server:

```bash
npm start
# or for development
npm run server
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:

```env
REACT_APP_BACKEND_URL=http://localhost:4000
```

Start frontend application:

```bash
npm start
```

### 4. Admin Dashboard Setup

```bash
cd admin
npm install
```

Start admin dashboard:

```bash
npm run dev
```

## 🌐 Application URLs

### Local Development
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Admin Dashboard**: http://localhost:5174

### Live Deployment
- **Frontend**: https://e-commerce-mern-mocha.vercel.app
- **Admin Dashboard**: https://e-commerce-mern-phi-kohl.vercel.app

## 🔐 Admin Credentials

- **Email**: admin@gmail.com
- **Password**: 200228

## 📚 API Endpoints

### User Routes (`/api/user`)

- `POST /register` - User registration
- `POST /login` - User login
- `POST /admin` - Admin login

### Product Routes (`/api/product`)

- `GET /list` - Get all products
- `POST /add` - Add new product (Admin)
- `POST /remove` - Remove product (Admin)
- `POST /single` - Get single product

### Cart Routes (`/api/cart`)

- `POST /add` - Add item to cart
- `POST /update` - Update cart item quantity
- `POST /get` - Get user cart
- `DELETE /remove` - Remove item from cart

### Order Routes (`/api/order`)

- `POST /place` - Place new order
- `POST /list` - Get user orders
- `POST /status` - Update order status (Admin)
- `POST /allorders` - Get all orders (Admin)

## 🗂️ Database Models

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  cartData: Object
}
```

### Product Model

```javascript
{
  name: String,
  description: String,
  price: Number,
  image: [String],
  category: String,
  subCategory: String,
  sizes: [String],
  bestseller: Boolean,
  date: Date
}
```

### Order Model

```javascript
{
  userId: ObjectId,
  items: [Object],
  amount: Number,
  address: Object,
  status: String,
  paymentMethod: String,
  payment: Boolean,
  date: Date
}
```

## 🎨 Frontend Pages

- **Home** (`/`) - Landing page with featured products
- **Catalog** (`/catalog`) - Product listing with filters
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form
- **Cart** (`/cart`) - Shopping cart management
- **Wishlist** (`/wishlist`) - Saved products
- **Login** (`/login`) - Authentication page

## 🔧 Admin Features

- **Dashboard** (`/`) - Overview and navigation
- **Add Product** (`/pages/add`) - Product creation form
- **Product List** (`/pages/list`) - Manage existing products
- **Orders** (`/pages/orders`) - Order management

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Configure Cloudinary account
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Update environment variables

### Frontend Deployment

1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or similar platforms
3. Update `REACT_APP_BACKEND_URL` to production API URL

### Admin Dashboard Deployment

1. Build the Next.js app: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Known Issues

- Ensure all environment variables are properly configured
- MongoDB connection string should include proper authentication
- Cloudinary credentials must be valid for image uploads

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Happy Coding! 🛋️✨**
