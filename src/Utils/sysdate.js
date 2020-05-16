export default function sysdate(){

    const now = new Date; 
    const day = ("0" + (now.getDay() + 1)).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);

    return day+'/'+month+'/'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes(); 
 
}