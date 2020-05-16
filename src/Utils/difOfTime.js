export default function difOfTime(date1,date2){
        
    const dt1 = new Date("January 31 1980 "+date1);
    const dt2 = new Date("January 31 1980 "+date2);

    let diffTime = Math.abs(dt1 - dt2); 
    
    let diffHours = Math.floor(  diffTime / (1000 * 60 * 60) ); 
    diffHours = ("0" + (diffHours)).slice(-2); 

    diffTime = diffTime - ( diffHours * 1000 * 60 * 60); 

    let diffMinutes = Math.floor(diffTime / (1000 * 60)); 
    diffMinutes = ("0" + (diffMinutes)).slice(-2); 

    diffTime = diffTime - ( diffMinutes * 1000 * 60 );

    let diffSeconds = Math.floor(diffTime / (1000)); 
    diffSeconds = ("0" + (diffSeconds)).slice(-2); 
    
    return diffHours+':'+diffMinutes+':'+diffSeconds; 

}