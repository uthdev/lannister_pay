const parseFeeConfigurationSpec = (FeeConfigurationSpec)=> {
  console.log(FeeConfigurationSpec);
  const parsedFCS = FeeConfigurationSpec.replace(/: APPLY /g, '').split('\n');
  
  console.log(parsedFCS);
  return parsedFCS;
}

export default parseFeeConfigurationSpec;