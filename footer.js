
    jQuery(document).ready(function() {
      
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
