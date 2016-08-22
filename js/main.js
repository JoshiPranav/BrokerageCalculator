$(document).ready(function()
{
    // target counter jquery plugin
    $("[data-plugin-targetcalculator]").TargetCalculator({
        failureMsg : "You need ${0} more in brokerage to qualify"  // custom failure message
    });
});