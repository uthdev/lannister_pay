import parseFeeConfigurationSpec from '../helpers/parseFeeConfigurationSpec';
import client from '../helpers/init_redis';

export default class  FeesController {
  static async setUpFee(req, res, next) {
    try {
      const {FeeConfigurationSpec} = req.body;
      const bulkFCS = parseFeeConfigurationSpec(FeeConfigurationSpec);
      await client.set('FeeConfigurationSpec', JSON.stringify(bulkFCS));
      return res.status(200).json({
        "status": "ok"
      })
      
    } catch (error) {
      next(error);
    }
  }

  static async computeTransactionFee(req, res, next) {
    const {
      Amount, Currency, CurrencyCountry, 
      Customer: { BearsFee }, 
      PaymentEntity: { Issuer, Brand, Number, Type, Country }  
    } = req.body;
    if(Currency !== 'NGN') return res.status(422).json({
      "Error": "No fee configuration for USD transactions."
    });
    let locale = CurrencyCountry == Country ? 'LOCL' : 'INTL';
    try {
      const FCSs = await client.get('FeeConfigurationSpec');
      const feeConfigurationSpecs = JSON.parse(FCSs)
      let applicableFCS;
      for (let i = 0; i < feeConfigurationSpecs.length; i++) {
        const {feeLocale, feeEntity, entityProperty } = feeConfigurationSpecs[i];
        if(feeLocale == '*' && feeEntity == '*' && entityProperty == '*') {
          applicableFCS = feeConfigurationSpecs[i];
        } else if(feeLocale == '*' && feeEntity !== '*') {
          if(feeEntity == Type && entityProperty == '*') {
            applicableFCS = feeConfigurationSpecs[i];
          } else if(feeEntity == Type && (entityProperty === Number || entityProperty === Brand || entityProperty === Issuer)) {
            applicableFCS = feeConfigurationSpecs[i];
          }
        } else if(feeLocale == locale && feeEntity !== '*') {
          if(feeEntity == Type && entityProperty == '*') {
            applicableFCS = feeConfigurationSpecs[i];
          } else if(feeEntity == Type && (entityProperty === Number || entityProperty === Brand || entityProperty === Issuer)) {
            applicableFCS = feeConfigurationSpecs[i];
          }
        }
      }
      const { feeId, feeType, feeValue } = applicableFCS;
      let AppliedFeeValue;
      if(feeType === 'FLAT') {
        AppliedFeeValue = parseFloat(feeValue);
      } else if(feeType === 'PERC') {
        AppliedFeeValue = Math.round((feeValue / 100) * Amount);
      } else if(feeType === 'FLAT_PERC') {
        const [flat, perc] = feeValue.split(':');
        AppliedFeeValue = Math.round((1 * flat) + parseFloat((perc / 100) * Amount))
      }

      const ChargeAmount = BearsFee ? parseFloat(Amount) + AppliedFeeValue : parseFloat(Amount);
      const SettlementAmount = ChargeAmount - AppliedFeeValue
      return res.status(200).json({
        AppliedFeeId: feeId,
        AppliedFeeValue: parseInt(AppliedFeeValue),
        ChargeAmount: parseInt(ChargeAmount),
        SettlementAmount: parseInt(SettlementAmount)
      });
    } catch (error) {
      next(error);
    }
  }
}