// const express = require("express");
// const jwtToken = require("jsonwebtoken");

// function authenticationMiddleware(request, response, next) {
//     const authHeader = request.headers.authorization;
//     if (!authHeader) {
//         return response.status(401).send({ error: 'Unauthorized status.' });
//     }
    
//     const token = authHeader.split(' ')[1];
//     console.log(token);

//     const createdToken = async () => {
//       const token1 = await jwtToken.sign({ user: "user"}, "secretOrPublicKey")
//     }

    
    
//     jwtToken.verify(token, "secretOrPublicKey", (error) => {
//         if (error) {
//             return response.status(401).json({ message: 'Invalid or expired token.' });
//         }
//         next();
//     });
// }

// module.exports = authenticationMiddleware;
