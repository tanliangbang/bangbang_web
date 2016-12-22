/**
 * Created by funny on 2016/11/24.
 */
function getImgDate(_this){
  var file =  _this.files[0];
  console.log(_this);

   _this.previousSibling.style.display="inline-block";
   if(file.type=="image/png"||file.type=="image/jpg"||file.type=="image/jpeg"){
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(){
    _this.previousSibling.previousSibling.innerHTML = "<img src="+this.result+">";
  }
    }else{
    _this.value = null;
   alert("请选择正确的图片");
   }
}

function isEmpty(iptstr){
  if(!iptstr||iptstr==""||iptstr==null){
    return true;
  }
  return false;
}

