// factory function

module.exports = function(callInput,smsInput,warningInput,criticalInput,selectedItem) {

  var callsWithSettings = 0;
  var smsWithSettings = 0;
  var combinedTotal = 0;

  var callValue = 0;
  var smsValue = 0;
  var warningValue = 0;
  var criticalValue = 0;

  function value_Call(callInput) {
    callValue = parseFloat(callInput);
  }
  function value_Sms(smsInput) {
    smsValue = parseFloat(smsInput);
  }
  function value_Warning(warningInput) {
    warningValue = parseFloat(warningInput);
  }
  function value_Critical(criticalInput) {
    criticalValue = parseFloat(criticalInput);
  }

  function calculate_CallSms(selectedItem) {

    if (critical()){
      return;
    }
    else if (selectedItem === "call") {
      callsWithSettings += callValue;
    }
    else if (selectedItem === "sms") {
      smsWithSettings += smsValue;
    }
  }

    function calculatedCalls() {
      return callsWithSettings.toFixed(2);
    }

    function calculatedSms() {
      return smsWithSettings.toFixed(2);
    }

    function calculate_Total() {
      combinedTotal = callsWithSettings + smsWithSettings;
    }

   function critical() {
     if (combinedTotal >= criticalValue) {
       return true;
     }
     return false;
   }

    function calculatedTotal() {
      return combinedTotal.toFixed(2);
    }

    function returnAll() {
      return {
        callValue,
        smsValue,
        warningValue,
        criticalValue,
        callsWithSettings,
        smsWithSettings,
        combinedTotal
      }
    }

  return {
    value_Call,
    value_Sms,
    value_Warning,
    value_Critical,
    calculate_CallSms,
    calculatedCalls,
    calculatedSms,
    calculate_Total,
    critical,
    calculatedTotal,
    returnAll
  }
};
