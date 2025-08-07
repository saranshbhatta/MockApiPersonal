const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
/* ----------------------------- Auth data ---------------------------------- */

function parseBasicAuth(header) {
  if (!header?.startsWith("Basic ")) return null;
  const base64 = header.slice(6);
  const decoded = Buffer.from(base64, "base64").toString("utf-8");
  const [username, password] = decoded.split(":");
  return { username, password };
}

// Fixed signature verification function
function verifySignature() {
  return true;
}

/* ------------------ Shared Utilities ------------------ */
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const atob = (base64) => Buffer.from(base64, "base64").toString("utf-8");
const allowedUsers = [
  { username: "laxmi", password: "laxmisecretpassword" },
  { username: "saransh", password: "saranshsecretpassword" },
];

/* ------------------ Sample Data ------------------ */

const updatingPeopleEmails = [
  "laxmi.mahara@arkbotech.com",
  "hello123456789@hotmail.com",
  "navin.parajuli@arkbotech.com",
  "sarans.bhatt@arkbotech.com",
];

const commonData = {
  titles: ["Mr.", "Ms.", "Mrs.", "Dr.", "Eng."],
  firstNames: [
    "Ram",
    "Sita",
    "Hari",
    "Gita",
    "Shyam",
    "Maya",
    "Ravi",
    "Sunita",
    "Deepak",
    "Mina",
    "Suresh",
    "Kamala",
    "Bishnu",
    "Radha",
    "Krishna",
    "Laxmi",
  ],
  lastNames: [
    "Sharma",
    "Shrestha",
    "Gurung",
    "Tamang",
    "Rai",
    "Limbu",
    "Thapa",
    "Magar",
    "Poudel",
    "Adhikari",
    "Karki",
    "Khadka",
    "Bhandari",
    "Koirala",
  ],
};

/* ------------------ Data Generators ------------------ */
function generatePeople(maxCount = 100) {
  const { firstNames, lastNames, titles } = commonData;

  const provinces = [
    "Province 1",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province",
  ];
  const clusters = [
    "Eastern",
    "Central",
    "Western",
    "Mid-Western",
    "Far-Western",
  ];
  const districts = [
    "Kathmandu",
    "Lalitpur",
    "Bhaktapur",
    "Kaski",
    "Chitwan",
    "Morang",
    "Jhapa",
    "Sunsari",
    "Banke",
    "Kailali",
  ];
  const branches = [
    "Head Office",
    "Regional Office",
    "Branch Office",
    "Sub Branch",
    "Extension Counter",
  ];
  const departments = [
    "Information Technology",
    "Human Resources",
    "Finance & Accounts",
    "Marketing",
    "Operations",
    "Risk Management",
    "Audit",
    "Legal",
  ];
  const middleNames = ["Bahadur", "Kumar", "Kumari", "Prasad", "Devi", ""];
  const designations = [
    "Senior Manager",
    "Manager",
    "Assistant Manager",
    "Officer",
    "Senior Officer",
    "Assistant Officer",
    "Executive",
    "Senior Executive",
    "Analyst",
    "Coordinator",
  ];
  const genders = ["Male", "Female", "Other"];
  const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
  const functionalTitles = [
    "Team Lead",
    "Project Manager",
    "Technical Lead",
    "Business Analyst",
    "System Administrator",
    "Database Administrator",
    "Network Engineer",
  ];

  var peopleArray = Array.from({ length: maxCount }, (_, i) => {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const joinDate = new Date(
      Date.now() - randomInt(30, 3650) * 24 * 60 * 60 * 1000
    );
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - randomInt(22, 65));

    return {
      employeeId: i + 1,
      province: getRandomItem(provinces),
      cluster: getRandomItem(clusters),
      district: getRandomItem(districts),
      branchId: randomInt(1, 100),
      branch: getRandomItem(branches),
      departmentId: randomInt(1, 20),
      department: getRandomItem(departments),
      levelId: randomInt(1, 10),
      deviceId: `DEV${randomInt(1000, 9999)}`,
      firstName,
      middleName: getRandomItem(middleNames) || null,
      lastName,
      designationId: randomInt(1, 50),
      designation: getRandomItem(designations),
      personalMobile: `98${randomInt(10000000, 99999999)}`,
      mobile: `98${randomInt(10000000, 99999999)}`,
      phone: `01-${randomInt(4000000, 5999999)}`,
      ein: `EIN${randomInt(100000, 999999)}`,
      gender: getRandomItem(genders),
      father: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
      maritalStatus: getRandomItem(maritalStatuses),
      citizenshipNo: `${randomInt(10, 99)}-${randomInt(10, 99)}-${randomInt(
        10,
        99
      )}-${randomInt(10000, 99999)}`,
      citizenshipIssueDate: new Date(
        dob.getFullYear() + 16,
        dob.getMonth(),
        dob.getDate() + randomInt(0, 3650)
      ),
      dob,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomInt(
        1,
        9999
      )}@rigohrm.com`,
      joinDate,
      lastPromotionDate:
        randomInt(0, 2) === 1
          ? new Date(joinDate.getTime() + randomInt(365, 1825) * 86400000)
          : null,
      functionalTitle: getRandomItem(functionalTitles),
      functionalTitleId: randomInt(1, 20),
      profilePictureURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
      title: getRandomItem(titles),
      retirementDate:
        randomInt(0, 10) === 1
          ? new Date(dob.getFullYear() + 60, dob.getMonth(), dob.getDate())
          : null,
      totalRows: maxCount,
      directManagerEmployeeId:
        i > 0 && randomInt(0, 3) === 1 ? randomInt(1, i + 1) : null,
    };
  });
  let updatingPeopleArray = generateUpdateablePeople();

  return [...peopleArray, ...updatingPeopleArray];
}

function generateCitizenPeople(maxCount = 100) {
  const { firstNames, lastNames, titles } = commonData;

  const branches = [
    "Kathmandu",
    "Pokhara",
    "Chitwan",
    "Biratnagar",
    "Nepalgunj",
    "Dharan",
    "Butwal",
    "Janakpur",
  ];
  const departments = [
    "IT",
    "HR",
    "Finance",
    "Marketing",
    "Operations",
    "Sales",
    "Admin",
    "Legal",
  ];
  const designations = [
    "Manager",
    "Officer",
    "Assistant",
    "Executive",
    "Analyst",
    "Coordinator",
    "Specialist",
    "Lead",
  ];
  const levels = ["Junior", "Mid", "Senior", "Principal", "Lead"];
  const functionalNames = [
    "Software Development",
    "Data Analysis",
    "Customer Service",
    "Project Management",
    "Quality Assurance",
    "Business Development",
  ];

  const timestamp = new Date().toTimeString();

  var peopleArray = Array.from({ length: maxCount }, (_, i) => {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const branch = `${getRandomItem(branches)} ${timestamp}`;

    return {
      empCode: `EMP${(i + 1).toString().padStart(4, "0")}`,
      adDomainUser: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      title: getRandomItem(titles),
      empName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomInt(
        1,
        9999
      )}@company.com`,
      mobile: `98${randomInt(10000000, 99999999)}`,
      branchCode: `BR${randomInt(1, 99).toString().padStart(2, "0")}`,
      branchName: branch,
      departmentId: randomInt(1, 20).toString(),
      departmentName: getRandomItem(departments),
      designationId: randomInt(1, 50).toString(),
      designation: getRandomItem(designations),
      levelId: randomInt(1, 10).toString(),
      levelName: getRandomItem(levels),
      jobName: `${getRandomItem(levels)} ${getRandomItem(designations)}`,
      attRecord: randomInt(0, 1) === 1 ? "Active" : "Inactive",
      functionalCode: `FC${randomInt(1, 99).toString().padStart(2, "0")}`,
      functionalName: getRandomItem(functionalNames),
    };
  });

  let updatingPeopleArray = generateUpdateablePeople();

  return [...peopleArray, ...updatingPeopleArray];
}

function generateUpdateablePeople() {
  const branches = [
    "Kathmandu",
    "Pokhara",
    "Chitwan",
    "Biratnagar",
    "Nepalgunj",
    "Dharan",
    "Butwal",
    "Janakpur",
  ];
  const departments = [
    "IT",
    "HR",
    "Finance",
    "Marketing",
    "Operations",
    "Sales",
    "Admin",
    "Legal",
  ];
  const designations = [
    "Manager",
    "Officer",
    "Assistant",
    "Executive",
    "Analyst",
    "Coordinator",
    "Specialist",
    "Lead",
  ];
  const levels = ["Junior", "Mid", "Senior", "Principal", "Lead"];
  const functionalNames = [
    "Software Development",
    "Data Analysis",
    "Customer Service",
    "Project Management",
    "Quality Assurance",
    "Business Development",
  ];
  const { titles } = commonData;
  return updatingPeopleEmails.map((email, i) => {
    const [user] = email.split("@");
    const [firstNameRaw, lastNameRaw] = user.split(".");
    const firstName = firstNameRaw || "Unknown";
    const lastName = lastNameRaw || "User";

    return {
      empCode: `EMP${(i + 1).toString().padStart(4, "0")}`,
      adDomainUser: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      title: getRandomItem(titles),
      empName: `${firstName} ${lastName}`,
      email,
      mobile: `98${randomInt(10000000, 99999999)}`,
      branchCode: `BR${randomInt(1, 99).toString().padStart(2, "0")}`,
      branchName: `Branch ${randomInt(1, 10)}`,
      departmentId: randomInt(1, 20).toString(),
      departmentName: getRandomItem(departments),
      designationId: randomInt(1, 50).toString(),
      designation: getRandomItem(designations),
      levelId: randomInt(1, 10).toString(),
      levelName: getRandomItem(levels),
      jobName: `${getRandomItem(levels)} ${getRandomItem(designations)}`,
      attRecord: randomInt(0, 1) === 1 ? "Active" : "Inactive",
      functionalCode: `FC${randomInt(1, 99).toString().padStart(2, "0")}`,
      functionalName: getRandomItem(functionalNames),
    };
  });
}

/* ------------------ Routes ------------------ */

// GET /api/people
// app.get("/api/people", async (req, res) => {
//   const maxCount = parseInt(req.query.maxCount) || 100;
//   await delay(150);
//   res.json(generatePeople(maxCount));
// });
// GET /api/people
// GET /api/people
app.get("/api/RigoPeople", async (req, res) => {
  console.log("bhitraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  try {
    // Check for Bearer token
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        Code: "401",
        Message: "Unauthorized: Bearer token required",
      });
    }

    // Check for tenantId header
    const tenantId = req.headers["tenantid"] || req.headers["tenantId"];

    if (!tenantId) {
      return res.status(400).json({
        Code: "400",
        Message: "Bad Request: tenantId header required",
      });
    }

    // Extract token
    const token = authHeader.slice(7); // Remove 'Bearer ' prefix

    // Generate tokens for allowed users (using crypto hash of username+secret)
    const crypto = require("crypto");
    const validTokens = allowedUsers.map((user) => {
      const tokenData = `${user.username}-${user.password}-token-secret`;
      return crypto.createHash("sha256").update(tokenData).digest("hex");
    });

    if (!validTokens.includes(token)) {
      return res.status(401).json({
        Code: "401",
        Message: "Unauthorized: Invalid token",
      });
    }

    const maxCount = parseInt(req.query.maxCount) || 100;
    await delay(150);
    res.json(generatePeople(maxCount));
  } catch (err) {
    console.error("Error in /api/people:", err);
    res.status(500).json({ Code: "500", Message: "Internal Server Error" });
  }
});

// POST /api/citizen-people
app.post("/api/CotizenPeople", async (req, res) => {
  console.log("bhitraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  try {
    const auth = parseBasicAuth(req.headers["authorization"]);
    const { FunctionName, Data, Signature, TimeStamp } = req.body;

    if (
      !auth ||
      !allowedUsers.some(
        (u) => u.username === auth.username && u.password === auth.password
      )
    ) {
      return res
        .status(401)
        .json({ Code: "401", Message: "Unauthorized: Invalid credentials" });
    }

    if (!FunctionName || !Data || !Signature || !TimeStamp) {
      return res
        .status(400)
        .json({ Code: "100", Message: "Missing required body fields" });
    }

    // Validate TimeStamp (within ±5 minutes)
    const reqTime = new Date(TimeStamp);
    const now = new Date();
    const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const timeDiff = Math.abs(utcNow - reqTime);

    // if (isNaN(reqTime) || timeDiff > 5 * 60 * 1000) {
    //   return res
    //     .status(400)
    //     .json({ Code: "102", Message: "Invalid or expired TimeStamp" });
    // }

    if (isNaN(reqTime) || timeDiff > 5 * 60 * 1000000) {
      return res
        .status(400)
        .json({ Code: "102", Message: "Invalid or expired TimeStamp" });
    }

    // Decode Base64 Data
    let decodedData;
    try {
      const jsonString = Buffer.from(Data, "base64").toString("utf-8");
      decodedData = JSON.parse(jsonString);
    } catch (e) {
      console.error("Data decode error:", e);
      return res
        .status(400)
        .json({ Code: "101", Message: "Invalid Base64 Data" });
    }

    // Validate Signature
    const isValid = verifySignature();

    if (!isValid) {
      return res
        .status(403)
        .json({ Code: "403", Message: "Signature verification failed" });
    }

    // Simulated result
    const response = {
      Code: "200",
      Message: "Success",
      Data: generateCitizenPeople(),
    };

    console.log(response, "responseresponseresponseresponse");

    res.json(response);
  } catch (err) {
    console.error("Error in /api/citizen-people:", err);
    res.status(500).json({ Code: "999", Message: "Something went wrong" });
  }
});

/* ------------------ Start Server ------------------ */
app.listen(PORT, () => {
  console.log(`✅ RigoHRM API running at http://localhost:${PORT}`);
});
