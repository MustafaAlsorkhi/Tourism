const express = require("express");
const db = require('./db.js');
const validator = require("validator");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/home", async (req, res) => {
  try {
    let result = await db.query(
      `SELECT users.fullname, blogs.blog_id, blogs.title, blogs.img_url FROM users INNER JOIN blogs ON users.user_id = blogs.blog_id;`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("error in getting the home page");
  }
}); 

app.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }
  try {
    const checkQuery = "SELECT user_id FROM users WHERE email = $1";
    const checkResult = await db.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    const insertQuery = `INSERT INTO users (fullname, email, password)
                            VALUES ($1, $2, $3)
                            RETURNING user_id`;

    const insertValues = [fullname, email, password];
    const result = await db.query(insertQuery, insertValues);
    const newUserId = result.rows[0].user_id;

    res
      .status(201)
      .json({ message: "User added successfully", user_id: newUserId });
  } catch (error) {
    console.error("Failed to register : ", error);
    res.status(500).json({ error: "Failed to register" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkQuery =
      "SELECT user_id, fullname, email FROM users WHERE email = $1 AND password = $2";
    const checkResult = await db.query(checkQuery, [email, password]);

    if (checkResult.rows.length === 1) {    //datatybe ===
      res
        .status(200)
        .json({ message: "Login successful", user: checkResult.rows[0] });
    } else {
      res.status(401).json({ error: "Invalid email or password" });   //Unauthorized
    }
  } catch (error) {
    console.error("Login failed: ", error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/add-blog", async (req, res) => {
  const { title, img_url, description} = req.body;

  // if (!req.session || !req.session.userId) {
  //   return res.status(401).json({ error: "Unauthorized, Please login and try again." });
  // }

  try {
       
    const query = `INSERT INTO blogs (title, img_url, description)
            values ($1, $2, $3)
            RETURNING blog_id`;
    const values = [title, img_url, description];
    
    const result = await db.query(query, values);
    const newBlogId = result.rows[0].blog_id;

    res
      .status(201)
      .json({ message: "Blog added successfully", id: newBlogId });
    
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ error: "Failed to add the blog" });
  }
});

app.get("/getBlog/:id", async (req, res) => {
  try {
    const query = "SELECT * FROM blogs WHERE blog_id = $1";
    const blogId = req.params.id;
    const result = await db.query(query, [blogId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Failed to get one blog: ", error);
    res.status(500).json({ error: "Failed to get one blog" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


















































// const express = require('express')

// const bodyParser = require('body-parser');

// const app = express()
// app.use(express.json())
// app.use(bodyParser.json());

// const db = require('./db.js');


// app.post('/add-user', async (req, res) => {
//     try {
//       const { fullname, email,password } = req.body;
  
//       // Insert user into the database
//       const result = await db.query(`INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3)`, [fullname, email, password]);
//       console.log('Insert result:', result);
      
  
//       res.json(result.rows);
//     }  catch (error) {
//       if (error.constraint === 'users_email_key') {
//         console.error('Error adding user: Email already exists');
//         res.status(400).json({ error: 'Email already exists' });
//       } else {
//         console.error('Error adding user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//     }
    
//   });

//   app.post('/login',async(req,res)=>{
//     try {
//         const {email,password } = req.body;
    
//         // Insert user into the database
//         const result = await db.query(`select * from users where email=$1 and password =$2`, [ email, password]);
//         res.send(result.rows[0]);
//         const userId = result.rows[0].id;
//         console.log('Insert result:', userId);
        

      
//       }  catch (error) {
//         if (error.constraint === 'users_email_key') {
//           console.error('Error adding user: Email ');
//           res.status(400).json({ error: 'error' });
//         } else {
//           console.error('Error adding user:', error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         }
//       }
    
// })
// app.post('/add-blog', async (req, res) => {
//     try {
//       const { name, image_url,description,user_id } = req.body;
  
//       // Insert user into the database
//       const result = await db.query(`INSERT INTO blogs (name, image_url,description,user_id) VALUES ($1, $2, $3,$4)`, [name, image_url,description,user_id]);
//       console.log('Insert result:', result);
      
  
//       res.json(result.rows);
//     }  catch (error) {
//       if (error.constraint === 'users_email_key') {
//         console.error('Error adding user: Email already exists');
//         res.status(400).json({ error: 'Email already exists' });
//       } else {
//         console.error('Error adding user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//     }
    
//   });

// app.get('/hello', function (req, res) {
//   res.send('Hello Worldd')
//   console.log('The Server is Running')
// })


// app.get('/postgreas', async (req, res) => {
//     try {
//     //    await db.query(`insert into employees values(222,'Kamel','omar',555)`);  
//     //   const result = await db.query('SELECT * FROM employees');   
//     //   res.json(result.rows);
//     `
//     CREATE TABLE Users (
//       id SERIAL PRIMARY KEY,
//       username VARCHAR(50) NOT NULL,
//       email VARCHAR(100) NOT NULL,
//       password VARCHAR(100) NOT NULL
//     );
  
//     CREATE TABLE Blogs (
//       id SERIAL PRIMARY KEY,
//       title VARCHAR(100) NOT NULL,
//       description TEXT,
//       image_url VARCHAR(255),
//       user_id INT REFERENCES Users(id)
//     );
//   `
//   res.send('The tables were created successfully');

//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     }
//   });
// app.get('/postgreas', async (req, res) => {
//     try {

//         const result = await db.query('SELECT * FROM users');   
//     res.send(result.rows);
//     console.log('Insert succss')

//     } catch (error) {
        
//     }
// });

// app.get('/postgreass', async (req, res) => {
//     try {

//         const result = await db.query('SELECT * FROM blogs');   
//     res.send(result.rows);
//     console.log('Insert succss')

//     } catch (error) {
//     }
// });


// app.post('/reg', async (req, res) => {
//     try {

//         const result = await db.query('insert into  blogs');   
//     res.send(result.rows);
//     console.log('Insert succss')

//     } catch (error) {
//     }
// });



//     app.listen(3000, ()=>{
//         console.log('Im leasining the port 3000')
//     })