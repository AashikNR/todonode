var fs = require('fs');

once = ()=>{
    var obj = {
        table: []
     };
    obj.table.push({id: 1, value:"first"});
    var json = JSON.stringify(obj);
    fs.writeFile('myjsonfile.json', json, 'utf8', (err) => {
        if (err) throw err;
    });
}

// once()

var add = (val)=>{
var obj = {
    table: []
 };
 var json = JSON.stringify(obj);
 fs.readFile('myjsonfile.json', 'utf8', (err, data)=>{
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data);
    obj.table.push({id:obj.table[obj.table.length-1].id+1, value:val});
    json = JSON.stringify(obj);
    fs.writeFile('myjsonfile.json', json, 'utf8', (err) => {
        if (err) throw err;
        console.log('Data added to file');
    });
}});
}


var edit = (val,new_value)=>{
    var data = fs.readFileSync('myjsonfile.json');
    var remove = val;
    var json = JSON.parse(data);

    for (var i = 0; i < json.table.length ; i++) {
        if (json.table[i].value == val)
            var id_var = json.table[i].id
        }

    var table = json.table;
    json.table = table.filter((table) => { return table.value !== remove });
    fs.writeFileSync('myjsonfile.json', JSON.stringify(json, null, 2));
    console.log("Edited Successfully")




    var obj = {
        table: []
     };
     var json = JSON.stringify(obj);
     fs.readFile('myjsonfile.json', 'utf8', (err, data)=>{
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data);
        obj.table.push({id:id_var, value:new_value});
        json = JSON.stringify(obj);
        fs.writeFile('myjsonfile.json', json, 'utf8', (err) => {
            if (err) throw err;
        });
    }});

}

var remove = (val)=>{
    var data = fs.readFileSync('myjsonfile.json');
    var remove = val;
    var json = JSON.parse(data);
    var table = json.table;
    json.table = table.filter((table) => { return table.value !== remove });
    fs.writeFileSync('myjsonfile.json', JSON.stringify(json, null, 2));
    console.log("Deleted Successfully")
}

var list = ()=>{
    fs.readFile('myjsonfile.json', (err, data) => {
        if (err) throw err;
        let jsonData = JSON.parse(data);
        for (var i = 0; i < jsonData.table.length ; i++) {
            console.log("ID :",jsonData.table[i].id,"DATA :",jsonData.table[i].value);
          }
    });
}

const test = process.argv.slice(2)

if ((test[0] ===  "add")&&(typeof test[1] !== 'undefined')) {
    add(test[1]);
} else if ((test[0] === "delete")&&(typeof test[1] !== 'undefined')){
    remove(test[1]);
} else if  ((test[0] === "edit")&&(typeof test[1] !== 'undefined')&&(typeof test[2] !== 'undefined')) {
    edit(test[1],test[2]);
} else if (test[0] === "list") {
    list();
} else {
    console.log("Entered Option is not available!")
}