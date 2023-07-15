# Desafio Latam - Final Project: Frontend Development

Members:
- Rodrigo González
- Matias Cuadros
- Leslie Reyes

## Description
The second milestone consists of the development of the client application with React for a book ecommerce. This is done using:

- React Router for navigating views by paths
- Components for code reuse and section separation
- Hooks for agile and reactive development
- Context for global state management

## Views

- Home `(/)`: Landing page where store banners and product carousels are displayed.
- Books `(/books)`: Where you can see the complete catalog of books, filter by category and sort by author, title and price.
- BookDetail `(/books/:id)`: It displays specific information of the requested book: name, author, price, stock, category and review.
- Register `(/register)`: Allows you to register a new user in the store. 
- Login `(/login)`: For user login and grants access to protected routes.
- User `(/user)`: Access to your registration information, edit profile, view your favorites, add address and view purchase history.
- Cart `(/cart)`: Shows the detail of the purchase, value and quantity, allows to increase or decrease the quantity of each product, and displays the total.

## Protected routes
These routes can only be accessed once logged in and includes:
- `/user`
- `/user/favorites`
- `/user/address`
- At bookDetail: Add to favorites and add to cart buttons
- `/cart`

## API
As the project has not yet developed its API, json files were used to display the books, categories and authors. In addition, [Platzi Fake Store API](https://fakeapi.platzi.com/) was used to generate a login, save token and access protected paths.

For login, enter the following credentials, issued by the APi:

```jsx
  email: john@mail.com
  password: changeme
```

## Dependencies
- This react project was created with [Vite](https://vitejs.dev/)
- To install dependencies run: `npm install` 
- To run de app: `npm run dev`