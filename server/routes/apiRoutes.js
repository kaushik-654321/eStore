import express from "express";

const router = express.Router();

router.get("/fruits",(req,res)=>{
    const fruits = [
        {
          id: 1,
          name: 'Grapes',
          category: 'Fruits',
          image: 'img/fruite-item-5.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
          price: '$4.99 / kg',
        },
        {
          id: 2,
          name: 'Raspberries',
          category: 'Fruits',
          image: 'img/fruite-item-2.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
          price: '$4.99 / kg',
        },
        {
          id: 3,
          name: 'Apricots',
          category: 'Fruits',
          image: 'img/fruite-item-4.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
          price: '$4.99 / kg',
        },
        {
          id: 4,
          name: 'Oranges',
          category: 'Fruits',
          image: 'img/fruite-item-2.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
          price: '$4.99 / kg',
        },
        {
          id: 6,
          name: 'Apricots',
          category: 'Fruits',
          image: 'img/fruite-item-4.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
          price: '$4.99 / kg',
        },
        {
          id: 7,
          name: 'Apricots',
          category: 'Fruits',
          image: 'img/fruite-item-4.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
          price: '$4.99 / kg',
        },
        // Add more fruits here
      ];
      res.json(fruits);
})
export default router;