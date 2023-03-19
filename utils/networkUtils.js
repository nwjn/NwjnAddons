import Promise from"../../PromiseV2";import socketFactory from"./letsEncryptCerts";

if(!global.networkUtilsThingSoopyPromise){

let jURL=Java.type("java.net.URL");
let jStandardCharsets=Java.type("java.nio.charset.StandardCharsets");
let jCollectors=Java.type("java.util.stream.Collectors");
let jBufferedReader=Java.type("java.io.BufferedReader");
let jInputStreamReader=Java.type("java.io.InputStreamReader");
let jString=Java.type("java.lang.String");
var JHttpsUrlConnection=Java.type("javax.net.ssl.HttpsURLConnection");

function getUrlContent(theUrl,{userAgent="Mozilla/5.0",includeConnection=false,postData=undefined,timeout=30000}={}){

if(global.soopyv2loggerthing){
global.soopyv2loggerthing.logMessage("Loading API: "+theUrl,4);
}






let conn=new jURL(theUrl).openConnection();
if(conn instanceof JHttpsUrlConnection){
conn.setSSLSocketFactory(socketFactory);
}
conn.setRequestProperty("User-Agent",userAgent);
conn.setConnectTimeout(timeout);
conn.setReadTimeout(timeout);

if(postData){
conn.setRequestMethod("POST");
conn.setRequestProperty("Content-Type","application/json");
conn.setDoOutput(true);

let jsonInputString=new jString(JSON.stringify(postData));

let os;
try{
os=conn.getOutputStream();
input=jsonInputString.getBytes("utf-8");
os.write(input,0,input.length);
}finally{
os.close();
}
}

let stringData;

if(conn.getResponseCode()<400){
stringData=new jBufferedReader(
new jInputStreamReader(conn.getInputStream(),jStandardCharsets.UTF_8)).
lines().
collect(jCollectors.joining("\n"));

conn.getInputStream().close();
}else{
stringData=new jBufferedReader(
new jInputStreamReader(conn.getErrorStream(),jStandardCharsets.UTF_8)).
lines().
collect(jCollectors.joining("\n"));

conn.getErrorStream().close();
}

if(includeConnection){
return{stringData,connection:conn};
}

return stringData;
}

function fetch(url,options={userAgent:"Mozilla/5.0",timeout:30000}){
let loadedConnection=undefined;
let loadedString=undefined;
let loadedJSON=undefined;

let ret={
loadSync(){
if(loadedString===undefined){
options.includeConnection=true;

try{
let data=getUrlContent(url,options);
loadedString=data.stringData;
loadedConnection=data.connection;
}catch(e){
errorData=e;
loadedString=null;
}
}

return ret;
},
load(_ifError=false){return Promise.resolve().then(()=>{return(()=>{
if(loadedString===undefined){return(()=>{
options.includeConnection=true;return(

new Promise((res,rej)=>{
pendingRequests.push({
callback:(data)=>{
loadedString=data.stringData;
loadedConnection=data.connection;
res();
},
errcallback:(e)=>{
rej(e);
},
url:url,
options:options});

}))})()}})()}).then(()=>{})},


textSync(){
ret.loadSync();

return loadedString;
},
text(){return Promise.resolve().then(()=>{return(
ret.load())}).then(()=>{

return loadedString})},

jsonSync(){
if(loadedJSON===undefined){
let str=ret.textSync();

loadedJSON=JSON.parse(str);
}

return loadedJSON;
},
json(){return Promise.resolve().then(()=>{return(()=>{
if(loadedJSON===undefined){return Promise.resolve().then(()=>{return(
ret.text())}).then((_resp)=>{let str=_resp;

loadedJSON=JSON.parse(str)})}})()}).then(()=>{


return loadedJSON})},

responseCode(){
return loadedConnection?.getResponseCode()||-1;
}};

return ret;
}

let pendingRequests=[];
let pendingResolves=[];

register("tick",()=>{
try{
while(pendingResolves.length>0){
let[callback,data]=pendingResolves.shift();

callback(data);
}
}catch(e){
console.log(JSON.stringify(e,undefined,2));
console.log(e.stack);
}

if(pendingRequests.length>0){
while(pendingRequests.length>0){
let req=pendingRequests.shift();

new Thread(()=>{
try{
let data=getUrlContent(req.url,req.options);

pendingResolves.push([req.callback,data]);
}catch(e){
pendingResolves.push([req.errcallback,e]);
}
}).start();
}
}
});

global.networkUtilsThingSoopyPromise=fetch;
}

export default global.networkUtilsThingSoopyPromise;