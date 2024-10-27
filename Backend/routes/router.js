const express = require('express')
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { upload, uploads } = require("../utils/multer")

router.use(cors());
router.use(bodyParser.json());


const loginController = require('../controllers/loginController')
const registrationController = require('../controllers/registerController')
const personaldetailsController = require('../controllers/studentControllers/personalDetailsController')
const prevYearController = require('../controllers/studentControllers/prevYearController')
const currentYearController = require('../controllers/studentControllers/currentYearController')
const internshipController = require('../controllers/studentControllers/intenshipController')
const cocurrActController = require('../controllers/studentControllers/cocurriActivityController')
const etcActController = require('../controllers/studentControllers/etcActivityController')
const careerPathController = require('../controllers/studentControllers/carrierPathController')
const mentorController = require('../controllers/mentorControllers/mentorController')
const studentController = require('../controllers/studentControllers/studentController')



// Student Routes
router.post('/login', loginController.login);
router.post('/register', registrationController.register);
router.post('/personaldetails', upload.none(), personaldetailsController.personaldetails);
router.post("/pydetails", uploads, prevYearController.pydetails);
router.post("/cydetails", upload.none(), currentYearController.cydetails);
router.post("/internships", upload.array("internship"), internshipController.internshipDetails);
router.post("/cocurriact", upload.array("codoc"),cocurrActController.cocurrActivity);
router.post("/etccurriact", upload.array("etcdoc"), etcActController.etcActivity);
router.post("/carrierPath", upload.none(), careerPathController.carrierPath);


// student get routes
router.post('/getStudentDetails',upload.none(), personaldetailsController.getStudent);
router.post('/getParentsDetails',upload.none(), personaldetailsController.getParent);
router.get('/allStudents',studentController.allStudents);
router.post('/getStudentpyDetails',upload.none(), prevYearController.getPyDetails);
router.post('/getStudentcyDetails',upload.none(), currentYearController.getcyDetails);
router.post('/getInternships',upload.none(), internshipController.getInternships);
router.post('/deleteInt',upload.none(), internshipController.delInternship);

// mentor routes
router.get('/allMentors',mentorController.allMentors);


module.exports = router;