// 'use client';
// import React from 'react';
// import Cookies from 'js-cookie';

// const AllUsers = () => {
//   let user;
//   const token = Cookies.get('token');
//   if (token) {
//     // Decode the token and extract user information
//     const decodedToken = JSON.parse(atob(token.split('.')[1]));
//     user = decodedToken;
//   }
//   const timer = setTimeout(() => {
//     console.log(user.email);
//   }, 3000);

//   return (
//     <div>{user ? <p>Hello well done</p> : <p>Not signed it..........</p>}</div>
//   );
// };

// export default AllUsers;
