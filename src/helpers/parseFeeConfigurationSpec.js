const parseFeeConfigurationSpec = (FeeConfigurationSpec)=> {
  const parsedFCS = FeeConfigurationSpec.replace(/:\s+APPLY\s+/g, '').split('\n');
  const mappedFCS = parsedFCS.map(feeConfiguration => {
    const FCS = feeConfiguration.replace (/[()]/g, ' ').split(/\s+/);
    const [feeId, feeCurrency, feeLocale, feeEntity, entityProperty, feeType, feeValue] = FCS;
    
    return {feeId, feeCurrency, feeLocale, feeEntity, entityProperty, feeType, feeValue};
  })
  return mappedFCS;
}

export default parseFeeConfigurationSpec;