let express = require('express')
let app = express()
let sqlite = require('sqlite3').verbose();


let db = new sqlite.Database("database.db" , (err)=>{
    if (err){
        console.log('BHAG JAAO YAHA SE TERA DATABASE NHI BNA')
    }else{
        console.log('DATABASE Updated')
    }
});


let scema = `CREATE TABLE IF NOT EXISTS Messages(name VARCHAR , message VARCHAR);`
db.exec(scema , (err)=>{
    if(err){
        console.log('There was an error')
        console.log(err)
    }else{
        console.log('Scema applied sucessfully')
    }
})

let PORT = process.env.PORT || 3000


app.use(express.static('public'))
app.use(express.json())

app.post("/saveMessage" , (req , res)=>{
    console.log("Data fetched")

    let data = req.body

    let datain = `INSERT INTO Messages VALUES("${data.sender}" , "${data.msg}");`

    db.exec(datain , (err)=>{
        if(err){
            console.log("There was an error in inserting values")
        }else{
            console.log("The data inserted in database sucessfully")
        }
    })

    console.log(data)

    res.send("Sab thik hai")
})


app.get('/getallpost' , (req , res)=>{

    let sql = `SELECT * FROM Messages;`

    let allData = []

    db.all(sql , (err , rows)=>{
        if (err){
            console.log('There was error in fetching data')
        }else{
            rows.forEach(row => {
                let mydata = {
                    sender: row.name,
                    msg: row.message
                }

                allData.push(mydata)
            })
            console.log(allData)

            res.send(allData)
        }
    });

})


app.listen(PORT , ()=>{
    console.log(`Server started at port ${PORT}`);
    
})