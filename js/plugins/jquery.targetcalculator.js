/********************************************************************************************************
 ** Plugin to manage the target counter (e.g. Brokerage Counter)
 ********************************************************************************************************/
(function($){
 
    $.fn.extend({ 
         
        // pass the options variable to the function
        TargetCalculator: function(options)
        {
            // override default settings
            var defaults =
            {
                statAttr    :   "data-plugin-targetcalculator", // the data attribute that contains the counter stats
                prefix      :   "$",                         // optional text prefixed to the numbers
                failureMsg  :   "You need {0} more",         // 0 : placeholder for actual number
                successMsg  :   "You have qualified"         // default success message
            };
            var options =  $.extend(defaults, options);
           
            var Functions =
            {
                UpdateTarget    :   function ($container, $target)
                {
                    $container.find(".target-body").html(options.prefix + $target);
                },
                
                UpdateActual    :   function ($container, $actual)
                {
                    $container.find(".stat .actual").html(options.prefix + $actual);
                },
            
                // update and animate the filled bar
                UpdateBar       :   function($container, actual, target)
                {
                    var percent = (actual / target * 100);
                    if (percent > 0)
                        $container.find(".bar-fill").animate({ width: percent + '%'}, 1000);

                    // show the counter if the target has not been met
                    if (actual < target)
                    {
                        $container.find(".actual").html(options.prefix + actual);
                        $container.find(".stat").show();
                    }
                },
                
                // determines which success/failure to display
                UpdateMessage   :   function($container, actual, target)
                {
                    // target not achieved => failure
                    if (actual < target)
                    {
                        var diff = target - actual;
                        var msg  = options.failureMsg.replace(/({\d+})/g, diff);  // enter the diff in the placeholder
                        var $failureMsg = $container.siblings(".brokerage-message.fail");
                        $failureMsg.find(".text").html(msg);
                        $failureMsg.show();
                    }
                    else
                    {
                        var $message = $container.siblings(".brokerage-message.success");
                        $message.find(".text").html(options.successMsg);
                        $container.siblings(".brokerage-message.success").show();
                    }
                }
            };
 
            return this.each(function()
            {
                var o = options;
                
                // convert string paramter to numbers
                var counterStats = $(this).attr(o.statAttr).split(",");
                var actual = Number(counterStats[0]);
                var target = Number(counterStats[1]);
                
                // update the target text
                Functions.UpdateTarget($(this), target);

                // update the actual text
                Functions.UpdateActual($(this), actual);
                
                // update and animate the filled bar
                Functions.UpdateBar($(this), actual, target);
                
                // display the appropriate message
                Functions.UpdateMessage($(this), actual, target);
                
            });
        }
    });
})(jQuery);