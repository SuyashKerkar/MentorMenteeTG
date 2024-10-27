const internshipDetailsServices = require('../../services/studentServices/internshipDetailsServices')
exports.internshipDetails = async (req, res)=>{
    try {
        const internshipDetailsService = await internshipDetailsServices.intdetails(req.body, req.files);
        res.json(internshipDetailsService);;
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
      }
};

exports.getInternships = async (req, res)=>{
  try {
      const getInternships = await internshipDetailsServices.getInternshipRecord(req.body.email);
      res.json(getInternships);;
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
};

exports.delInternship = async (req, res)=>{
  try {
      const delInternship = await internshipDetailsServices.deleteInternshipRecord(req.body.int_id);
      res.json(delInternship);;
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
};