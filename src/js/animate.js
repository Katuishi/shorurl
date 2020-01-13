

$(document).ready(function(){
    $("#form").submit(function (params) {
        params.preventDefault();
        var value = $("#url").val();
       
        $.post({
            traditional: true,
            url: '/submit',
            contentType: 'application/json',
            data: JSON.stringify( {"url":value } ),
            dataType: 'json',
            success: function(res)
            { 
                $(".copy-info").text("copy",function (params) {
                    $(this).show();
                });
                if(res.status == 200)
                {
                    $("#cont-info").fadeOut(function (alv) {
                        $(this).css({
                            "background-color":"#007bff",
                            "display":"flex"
                        });
                        $("#label-info").text(res.message);
                    }).slideDown(300);
                   
                   
                }
                else if (res.status == 400) {
                    $(".copy-info").hide();
                    $("#cont-info").fadeOut(function (alv) {
                        $(this).css({
                            "background-color":"#dc3545",
                            "display":"flex"
                        });
                        $("#label-info").text(res.message);
                    }).slideDown(300).fadeOut(5000);
                   
                } 
                
            }
     
        });
    });

    $(".copy-info").click(function (e) {
        e.preventDefault();
       
        jQuery(this).text("Copied")
        var element = $("#label-info")
        var $temp = jQuery("<input class='temp-field'>");
        jQuery(this).after($temp);
        $temp.val(jQuery(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
        jQuery(this).focus();
    })

    
});

