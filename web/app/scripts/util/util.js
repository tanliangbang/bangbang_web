function changeTime(currDate,str){
  var nowDate = new Date(currDate);
  var year = nowDate.getFullYear();    //获取完整的年份(4位,1970-????)
  var month = nowDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
  var day = nowDate.getDate();        //获取当前日(1-31)
  var hh = nowDate.getHours();
  var mm = nowDate.getMinutes();
  var ss = nowDate.getSeconds();
  if(str=="china"){
    return (year+'年'+month+'月'+day+"日"+ "  " +hh+":"+mm +":"+ss);
  }
  if(month<10){
    month =  "0"+month
  }

  if(day<10){
    day =  "0"+day
  }

  if(hh<10){
    hh = "0"+hh;
  }
  if(mm<10){
    mm = "0"+mm;
  }

  if(ss<10){
    ss = "0"+ss;
  }
  return (year+str+month+str+day+"  "+hh+":"+mm+":"+ss);
}
