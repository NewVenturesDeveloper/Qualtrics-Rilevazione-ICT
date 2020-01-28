
    jQuery(document).ready(function() {
        if ($("#EndOfSurvey").length > 0) {
            var inputs = jQuery("input[type='text']");
            inputs.attr("disabled", true);
            jQuery("#QID859").hide();
            jQuery("#QID861").hide();
        }
        
        var scroller = $("#NextButton").after('<a href="#" id="scroll-top" style="display: none; text-align: center"> <i class="fas fa-chevron-up"></i><br><span>Torna su</span></a>') 
        jQuery(document).ready(function() {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 200) {
                    $('#TocSidebarContainer').addClass("closed");
                    $('#scroll-top').fadeIn();
                } else {
                    $('#scroll-top').fadeOut();
                }
            });
            $('#scroll-top').click(function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 600);
                return false;
            });
        });
      
        var getQueryVariable = function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return variable;
        };
        try {
            var encrypted = getQueryVariable("sid").replace(/ewsdcgfhvg/g, "");
            var usr = JSON.parse(atob(encrypted));
    
            var fiscalnumber = (usr.fiscalnumber.indexOf("TINIT-") > -1) ? usr.fiscalnumber.replace("TINIT-", "") : usr.fiscalnumber;
            document.getElementById('QR~QID855~1').value = usr.name;
            document.getElementById('QR~QID855~2').value = usr.familyname;
            document.getElementById('QR~QID855~4').value = usr.email;
        } catch (err) {
            var msg = "URL non valido";
            jQuery("div#ErrorMessage").show();
            jQuery("#QID855").hide();
        }

    });
