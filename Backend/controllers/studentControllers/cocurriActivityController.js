const cocurrActivityServices = require('../../services/studentServices/cocurriActivityService')

exports.cocurrActivity = async (req, res)=>{
    try {
        const cocurrActivityService = await cocurrActivityServices.cocurrAct(req.body, req.files);
        res.json(cocurrActivityService);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
      }
};

exports.getActivity = async (req, res)=>{
  try {
      const cocurrActivityService = await cocurrActivityServices.getcocurrAct(req.body.email);
      res.json(cocurrActivityService);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
};
exports.delActivity = async (req, res)=>{
  try {
      const cocurrActivityService = await cocurrActivityServices.delActivity(req.body.co_id);
      res.json(cocurrActivityService);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
};