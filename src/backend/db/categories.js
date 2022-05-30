import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    id: uuid(),
    categoryName: "Men's Collection",
    img: "https://i.ibb.co/HBkXKXZ/Men-s-collection-1.jpg",
    size: "small",
    description: "Get the latest treds in this section"
  },
  {
    id: uuid(),
    categoryName: "Women's Collection",
    img: "https://i.ibb.co/7bgXdh0/Women-s-collection-1.jpg",
    size: "small",
    description: "Get the latest treds in this section"
  },
  {
    id: uuid(),
    categoryName: "Kid's Collection",
    img: "https://i.ibb.co/rmF1TQ4/Kid-s-collection-1.jpg",
    size: "small",
    description: "Get the latest treds in this section"
  },
  {
    id: uuid(),
    categoryName: "Ethnic Wears",
    img: "https://i.ibb.co/n7ZvL2c/Ethnic-wear-1.jpg",
    size: "small",
    description: "Get the latest Summer treds in this section"
  },
  {
    id: uuid(),
    categoryName: "Traditional Clothing",
    img: "https://i.ibb.co/yVSrPmP/Traditional-clothing-1.jpg",
    size: "small",
    description: "Get the latest treds in this section"
  },
  {
    id: uuid(),
    categoryName: "Newly Launched",
    img: "https://i.ibb.co/Vvhqkym/matheus-ferrero-Tkr-Rvwxjb-8-unsplash-1.jpg",
    size: "large",
    description: "Get the latest treds in this section"
  },
  {
    id: uuid(),
    categoryName: "Newly Launched",
    img: "https://i.ibb.co/7SdMy4r/Men-s-collection.jpg",
    size: "medium",
    heading: "Summer Collection",
    description: "Get the latest Summer treds in this section"
  },
  {
    id: uuid(),
    categoryName: "Newly Launched",
    img: "https://i.ibb.co/7SdMy4r/Men-s-collection.jpg",
    size: "medium",
    heading: "Winter Collection",
    description: "Get the latest Winter treds in this section"
  }
];
