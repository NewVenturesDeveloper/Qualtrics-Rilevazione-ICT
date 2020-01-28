$(document).ready(function () {

    var newNode = $("#PreviousButton").after(' <a target="_blank" href=" https://questionari.agid.gov.it/jfe/form/SV_3pZlSh3ZPpwptZP?update=last"  id="some-link" style="cursor:pointer; padding-right:10px"><span>Hai domande?</span></a>');

    var logout = $("#Toc ul li:last-child").after(' <li class=" Incomplete   "> <a href="https://questionari.agid.gov.it/jfe/form/SV_5oqprCo1vJ5ESu9"> <span class="TocIcon">  </span> <span class="TocText">Salva e Chiudi</span> <div class="clear"></div> </a> </li>');

    var download = $("#Questions .EndOfSurvey").after('<div class="cont-download-menu"> <a onclick="saveR()" style="cursor:pointer; padding-right:10px"><button class="button-alert">Download dati inseriti</button></a> <div id="TocSidebarContainer" class="" style="top:auto; display: none; left: -380px; z-index:10001;"> <div id="TocSidebar"> <a href="#" id="TOCToggle"> <div id="TocSidebarIcons"> <div id="TocIcon"></div> <div id="TocArrow"></div> </div> </a> <div class="clear"></div> <div id="TocSidebarContent"> <div id="Toc">   <ul>   <li class=" Incomplete   "> <a href="#QID51" id="FL_3"> <span class="TocIcon">  22%  </span> <span class="TocText">Sezione A - Informazioni Generali</span> <div class="clear"></div> </a> </li>    <li class=" Incomplete   "> <a href="#QID49" id="FL_21"> <span class="TocIcon">  </span> <span class="TocText">Sezione B - Natura e strumenti d&rsquo;acquisto</span> <div class="clear"></div> </a> </li>    <li class=" Incomplete   sanita" style="display:none;"> <a href="#QID694" id="FL_39"> <span class="TocIcon">  5%  </span> <span class="TocText">Sezione B _Sanità</span> <div class="clear"></div> </a> </li>    <li class=" Incomplete   "> <a href="#QID43" id="FL_29"> <span class="TocIcon">  </span> <span class="TocText">Sezione C - Finalità e ambiti</span> <div class="clear"></div> </a> </li>    <li class=" Incomplete   "> <a href="#QID44" id="FL_4"> <span class="TocIcon">  </span> <span class="TocText">Sezione D - Progetti</span> <div class="clear"></div> </a> </li>    <li class=" Incomplete   "> <a href="#QID623" id="FL_30"> <span class="TocIcon">  </span> <span class="TocText">Sezione E - Allegato</span> <div class="clear"></div> </a> </li>   </ul></div> </div> </div></div></div>')
    //  var scroller = $("#PreviousButton").after('<a href="#" id="scroll-top" style="display: none; text-align: center"> <i class="fas fa-chevron-up"></i><br><span>Torna su</span></a>')
    var scroller = $("#Logo").after('<a href="#" id="scroll-top" style="display: none; text-align: center"> <i class="fas fa-chevron-up"></i><br><span>Torna su</span></a>')

    //    TOGLIE "CONFERMA" DAL MENU
    console.log($("#TocSidebarContainer"))
    // if($("#TocSidebarContainer").contains('Riepilogo')){

    // }

    if (document.getElementById("QID694")) {
        console.log(document.getElementsByClassName("sanita")[0])
        document.getElementsByClassName("sanita")[0].style.display = "block"
    }

    var testoFinale = $("#Questions .EndOfSurvey")[0].innerHTML
    //    testoFinale= testoFinale.toString()
    console.log($("#Questions .EndOfSurvey")[0].innerHTML)
    //    if (testoFinale.contains('Riepilogo')){
    //    console.log($("dovrebbe"))x
    //        document.getElementById("TocSidebarContainer").style.display= "block"
    //    }
    //    if (testoFinale.contains('Grazie')){
    //    console.log($("mah"))
    //        document.getElementById("TocSidebarContainer").style.display= "none"
    //    }
    if ($(".cont-download-menu").length > 0) {
        // console.log($(".cont-download-menu"));
        document.getElementById("TocSidebarIcons").onclick = function () {

            if (document.getElementById("TocSidebarContainer").classList.value == " closed" || document.getElementById("TocSidebarContainer").classList.value == "closed") {

                document.getElementById("TocSidebarContainer").classList.remove("closed");
            }
            else if (document.getElementById("TocSidebarContainer").classList.value == "") {

                document.getElementById("TocSidebarContainer").classList.add("closed");
                //    console.log(document.getElementById("TocSidebarContainer").classList)
            }
        };
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#TocSidebarContainer').addClass("closed");
            $('#scroll-top').fadeIn();
        }
        else {
            $('#scroll-top').fadeOut();
        }
    });
    $('#scroll-top').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });


    if ($("#EndOfSurvey").length > 0) {
        var inputs = jQuery("input[type='text']");
        inputs.attr("disabled", true);
        jQuery("#QID859").hide();
        jQuery("#QID861").hide();
    }

    $("#NextButton").after('<a href="#" id="scroll-top" style="display: none; text-align: center"> <i class="fas fa-chevron-up"></i><br><span>Torna su</span></a>') 
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