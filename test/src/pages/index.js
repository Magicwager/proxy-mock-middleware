$("#showSvrInfo").on("click",function(){
    $.ajax({
        type:"GET",
        url:"/test/hello",
        success:function(result){
            if(result.status==1){
                $("#portVal").html(result.data.port);
                $("#hostVal").html(result.data.host);
            }
        }

    })
})