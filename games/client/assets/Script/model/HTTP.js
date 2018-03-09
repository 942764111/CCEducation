//var URL = "http://47.104.3.58:8240";
 var URL = "http://47.104.3.58";
//var URL = "http://192.168.1.162:8240";
var HTTP = HTTP||{
        sessionId : 0,
        userId : 0,
        master_url:URL,
        url:URL,
        sendRequest : function(post,path,data,handler,extraUrl){
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = "?";
            for(var k in data){
                if(str != "?"){
                    str += "&";
                }
                str += k + "=" + data[k];
            }
            if(extraUrl == null){
                extraUrl = HTTP.url+':'+post+'';
            }
            var requestURL = extraUrl + path + encodeURI(str);
            console.log("RequestURL:" + requestURL);
            xhr.open("GET",requestURL, true);
            if (cc.sys.isNative){
                xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
            }
            
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                    console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                    try {
                        var ret = JSON.parse(xhr.responseText);
                        if(handler !== null){
                            handler(ret);
                        }                        /* code */
                    } catch (e) {
                        throw new Error(e);
                    }
                    finally{
                        cc.log("hide");    
                        if(cc.vv && cc.vv.wc){
                            cc.log("hide");    
                        }
                    }
                }
            };
            cc.log("show");
            if(cc.vv && cc.vv.wc){
   
                //cc.vv.wc.show();
            }
            xhr.send();
            return xhr;
        },
};

module.exports = HTTP;