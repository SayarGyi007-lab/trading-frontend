# Order Matching System

A web-based system that allows users to submit buy/sell orders for products, automatically matches orders based on **price-time-volume priority**, and displays the trade history.

---

## Overview

This system is designed for trading scenarios where multiple buyers and sellers interact. Users can submit orders, view matched trades, and track the status of their orders in real time.  

**Key Features:**
- Submit buy/sell orders
- Automatic order matching
- View matched trades
- Check order status (fully filled, partially filled, or pending)

---

## What Users Can Do

1. **Submit Orders**
   - Choose **Order Type**: Buy / Sell.
   - Select a **Product**.
   - Enter **Price per kg ($)** and **Volume (kg)**.
   - Submit the order. It will be saved in the system and considered for matching.

2. **View Matched Orders**
   - See all trades executed automatically.
   - Each trade displays:
     - Matching ID
     - Seller ID
     - Buyer ID
     - Product ID
     - Price
     - Volume

3. **Check Order Status**
   - Orders can be:
     - **Fully matched**
     - **Partially filled**
     - **Pending** (waiting for a matching order)

---

## Technology Stack

- **Frontend:** React.js / HTML / CSS / TypeScript  
- **Backend:** Node.js (Express)  
- **Database:** PostgreSQL 
- **API:** RESTful endpoints for submitting and retrieving orders  
- **Matching Algorithm:** Limit order matching with **price-time-volume priority**

---


## Matching Logic

**Limit order matching algorithm (price-time-volume priority):**  

1. **Price Priority:** Highest buy price matches lowest sell price first.  
2. **Time Priority:** Earlier orders at the same price are matched first.  
3. **Volume Priority:** Larger volumes may take precedence if price and time are equal.  


## Demo

Try the live demo here:  
[🔗 Demo Link](https://main.d5w1nq79p3uig.amplifyapp.com)  


---


