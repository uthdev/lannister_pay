import parseFeeConfigurationSpec from '../helpers/parseFeeConfigurationSpec';

export default class  FeesController {
  static async setUpFee(req, res) {
    const {FeeConfigurationSpec} = req.body;
    const parsedFCS = parseFeeConfigurationSpec(FeeConfigurationSpec);
    res.status(200).json({
      "status": "ok"
    })
  }
}