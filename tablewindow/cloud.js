function setweights(data, message){
    var localwords = seperate(message);

    localwords.forEach(d=>{
        var found = false;
        data.forEach(e=>{
            if(d===e.word){
                e.count = e.count +1;
                e.weight=calcsize(e.count)
                found = true;
            }
        })  
        if(!found){
            data.push({word:d, count:1, weight:calcsize(1)});
        }  

        data.forEach(e=>{
            // if(d===e.word){
                // e.count = e.count +1;
            e.weight=calcsize(e.count);
                // found = true;
            // }
        })  
    })
}