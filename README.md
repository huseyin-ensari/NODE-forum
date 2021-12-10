# API For Forum Web Pages

![mongo.db](https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb&logoColor=4EA94B)
![node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![pug.js](https://img.shields.io/badge/Pug-E3C29B?style=for-the-badge&logo=pug&logoColor=black)

This api is for forum websites. Such as ekşi sözlük and stack overflow.

If we want to explain it simply: Users can ask questions, give answers to these questions. They may like the questions and answers.

Of course, some features can be added. For example, categories can be created for questions. Maybe I can add it soon.

I am currently creating a frontend for this api.

If you want to try the working version of this repository [click](https://node-forum-api.herokuapp.com/).

---

What to do if you want to download and use the repository;

📂 ./src/configs/.env

```bash
SYSTEM_URL= http://localhost:3000
MONGO_URL = < Your db url >

# Json web token
JWT_SECRET = < Json web token secret key >
JWT_EXPIRE = < Json web token expire : 10s etc. >

# Cookie
JWT_COOKIE = 10

# Reset Password
RESET_PASSWORD_EXPIRE = 3600000

# Node Mailer
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = < Your gmail adress >
SMTP_PASS = < Gmail password or gmail app password >
```
