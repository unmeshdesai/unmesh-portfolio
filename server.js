const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const mysql = require("mysql2/promise");

const path = require("path");



dotenv.config();



const app = express();

const port = Number(process.env.PORT || 3000);



app.use(cors());

app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "assets")));



const htmlPages = [

  "index.html",

  "education_contact.html",

  "Unmesh_Desai_Resume.html",

  "kgk.html",

  "kgk-dashboards.html",

  "kgk-reports.html",

  "skills.html",

  "crm-projects.html",

  "analytics-dashboard.html",

  "reports.html",

];



const legacyRedirects = {

  "crm-projects.html": "/kgk.html",

  "analytics-dashboard.html": "/kgk-dashboards.html",

  "reports.html": "/kgk-reports.html",

};



htmlPages.forEach((file) => {

  const route = file === "index.html" ? ["/", "/index.html"] : `/${file}`;

  app.get(route, (_req, res) => {

    const redirect = legacyRedirects[file];

    if (redirect) {

      return res.redirect(301, redirect);

    }

    res.sendFile(path.join(__dirname, file));

  });

});



const pool = mysql.createPool({

  host: process.env.DB_HOST || "localhost",

  port: Number(process.env.DB_PORT || 3306),

  user: process.env.DB_USER || "root",

  password: process.env.DB_PASSWORD || "",

  database: process.env.DB_NAME || "portfolio",

  waitForConnections: true,

  connectionLimit: 10,

});



function sanitize(value) {

  return String(value || "").trim();

}



function isValidEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}



app.get("/api/health", async (_req, res) => {

  try {

    await pool.query("SELECT 1");

    res.json({ ok: true, db: "connected" });

  } catch (error) {

    res.status(500).json({ ok: false, error: "Database connection failed" });

  }

});



app.post("/api/contact", async (req, res) => {

  try {

    const name = sanitize(req.body.name);

    const email = sanitize(req.body.email);

    const phone = sanitize(req.body.phone);

    const subject = sanitize(req.body.subject);

    const message = sanitize(req.body.message);



    if (!name || !email || !subject || !message) {

      return res.status(400).json({ error: "Please fill all required fields." });

    }



    if (!isValidEmail(email)) {

      return res.status(400).json({ error: "Please enter a valid email address." });

    }



    if (message.length < 10) {

      return res.status(400).json({ error: "Message should be at least 10 characters." });

    }



    const sql = `

      INSERT INTO contact_submissions

      (name, email, phone, subject, message)

      VALUES (?, ?, ?, ?, ?)

    `;



    await pool.execute(sql, [name, email, phone || null, subject, message]);



    return res.status(201).json({ success: true, message: "Thanks! Your message has been sent." });

  } catch (error) {

    return res.status(500).json({ error: "Something went wrong. Please try again." });

  }

});



app.listen(port, () => {

  console.log(`Contact API running on http://localhost:${port}`);

});

