import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "Men premium Jeans",
    price: 5000,
    categoryName: ["Men Clothing"],
    img: "https://m.media-amazon.com/images/I/61S5a0LL0sL._UX569_.jpg",
    rating: 4
  },
  {
    _id: uuid(),
    title: "Men premium Jacket",
    price: 2000,
    categoryName: ["Men Clothing", "Summer Collection"],
    img: "https://i.ibb.co/HBkXKXZ/Men-s-collection-1.jpg",
    rating: 2
  },
  {
    _id: uuid(),
    title: "Men premium T-shirt",
    price: 1400,
    categoryName: ["Men Clothing", "Newly Launched"],
    img:
      "https://cdn.shopify.com/s/files/1/0266/6276/4597/products/300865964INDIGO_2_1024x1024.jpg?v=1637582856",
    rating: 4
  },
  {
    _id: uuid(),
    title: "Women Kurti",
    price: 2400,
    categoryName: ["Women Clothing"],
    img: "https://m.media-amazon.com/images/I/41f6BReA+PS.jpg",
    rating: 3
  },
  {
    _id: uuid(),
    title: "Women T-shirt",
    price: 3700,
    categoryName: ["Women Clothing"],
    img: "https://src1.ilogo.in/images/products/708/custom-womens-t-shirt.webp",
    rating: 4
  },
  {
    _id: uuid(),
    title: "Women premium Saree",
    price: 5400,
    categoryName: ["Women Clothing"],
    img:
      "https://assetscdn1.paytm.com/images/catalog/product/A/AP/APPWOMEN-MODE-MWOME702682E3DDEBBB/1562971154135_0..jpg?imwidth=320&impolicy=hq",
    rating: 3
  },
  {
    _id: uuid(),
    title: "Kid's tee",
    price: 400,
    categoryName: ["Kids Clothing", "Summer Collection"],
    img:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcThm05_gQJZL1fCyoJ-2foI8DZdzRsKmwGTKE1GpEMmYNzJVZqkf5_4e7TP7ybduq9VA87aZZdDurHPetoE0-iEMQ7tSoNuEdnTVpoT5ORQ2tHfPuRccoxDSX0&usqp=CAc",
    rating: 4
  },
  {
    _id: uuid(),
    title: "Kid's suit",
    price: 4000,
    categoryName: ["Kids Clothing", "Newly Launched"],
    img:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQdIuez9zv8ySaDR4FblOdtV6QMS9sFYxxscC34HoMEFvxkVnm08njmk82RT0Nx-3AEr2KDXeP83Mo&usqp=CAc",
    rating: 3
  },
  {
    _id: uuid(),
    title: "Men's Kurta",
    price: 4000,
    categoryName: ["Ethnic Wears", "Traditional Clothing"],
    img:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT97VWrYrFsYRr4J4wMAXPanu5Xgfa9bijWLaUjTGGamHCbmYor83cMJ8aD_XzCEtqZLuvQu2vEXtwAamSAT0t1fqRPRWq6kgcBhA1Qe7hZ_s4pbZlarQxr&usqp=CAc",
    rating: 4
  }
];
