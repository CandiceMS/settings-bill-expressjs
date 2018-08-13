module.exports = function(callInput,smsInput,warningInput,criticalInput,selectedItem) {

  var callsWithSettings = 0;
  var smsWithSettings = 0;
  var combinedTotal = 0;

  var callValue = 0;
  var smsValue = 0;
  var warningValue = 0;
  var criticalValue = 0;

  let cost = '';
  let type = '';
  let timestamp = '';
  let action = {};
  let actions = [];

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
      cost = callValue;
      type = selectedItem;
      timestamp = new Date();
    }
    else if (selectedItem === "sms") {
      smsWithSettings += smsValue;
      cost = smsValue;
      type = selectedItem;
      timestamp = new Date();
    }
    record();
    pushAction();
  }

    let calculatedCalls = function() {
      return callsWithSettings.toFixed(2);
    }

    let calculatedSms = function() {
      return smsWithSettings.toFixed(2);
    }

    let calculate_Total = function() {
      combinedTotal = callsWithSettings + smsWithSettings;
    }

   function critical() {
     if (combinedTotal >= criticalValue) {
       return true;
     }
     return false;
   }

    let calculatedTotal = function() {
      return combinedTotal.toFixed(2);
    }

    let addClasses = function () {
      if (combinedTotal >= warningValue && combinedTotal < criticalValue) {
        return "warning";
      }

      if (combinedTotal > warningValue && combinedTotal >= criticalValue) {
        return "danger";
      }
    }
    function record() {
      action = {
        type,
        cost,
        timestamp
      }
      // console.log(action);
      // return action;
    }

    function pushAction() {
      actions.push(action);
      console.log(actions);
    }

    function returnAll() {
      return {
        callValue,
        smsValue,
        warningValue,
        criticalValue,
        calculatedCalls,
        calculatedSms,
        calculatedTotal,
        addClasses,
        cost,
        type,
        timestamp,
        action,
        actions
      }
    }
    let clearAll = function() {
      callsWithSettings = 0;
      smsWithSettings = 0;
      combinedTotal = 0;

      callValue = 0;
      smsValue = 0;
      warningValue = 0;
      criticalValue = 0;
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
    returnAll,
    addClasses,
    clearAll,
    record,
    pushAction
  }
}
