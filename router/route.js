const router = require('express').Router();
const items = require('../model/formdb');

router.get('/',async (req,res)=>{
    try{
        let result = await items.find();
        res.render('index',{data:result});
    }catch(err){
        console.log(err)
    }
    
})

router.get('/form',(req,res)=>{
    res.render('form');
})

router.post('/formpost',async (req,res)=>{
    let body = req.body;
    const color = body.color;
    const size = body.size;
    let arr=[];

    await size.map((se)=>{
        color.map((col)=>{
            arr.push(`${col}/${se}`)
        })
    });

    const arr_json = JSON.stringify(arr);

    let item = new items({name:body.name,mobile:body.mobile,email:body.email,amount:body.amount,variants:arr_json});
    let result = await item.save();

    if(result){
        res.redirect('/')
    }else{
        res.status(401).send("Something went Wrong!")
    }
})

// Delete a specific combination...

router.get('/deleteme/', async (req,res)=>{
    console.log('yaha', req.query)
    let _id = req.query.id;
    let index = req.query.index;
    
    try{
        let result = await items.findOne({_id});
        let variants = JSON.parse(result.variants);
        variants.splice(index, 1);
        // console.log(variants);
        try{
            let deleted =  await items.findByIdAndUpdate(_id,{variants:JSON.stringify(variants)});
            res.redirect('/')
            
        }catch(error){
            console.log(error)
        }

    }catch(err){
        console.log(err)
    }
})

// Update a specific item from the list...

router.post('/update', async (req,res)=>{
    let body = req.body;
    // console.log(body)
    parseInt
    try{
        let result = await items.findOne({_id:body.id});
        let variants = JSON.parse(result.variants);
        variants[parseInt(body.index)] = body.color+'/'+body.size;
        // console.log("variants>>", variants);
        try{
            let updated =  await items.findByIdAndUpdate(body.id,{name:body.name,mobile:body.mobile,email:body.email,amount:body.amount,variants:JSON.stringify(variants)});
            res.redirect('/')
            
        }catch(error){
            console.log(error)
        }

    }catch(err){
        console.log(err)
    }
})

// GET API For Fetch All Data From Database...

router.get('/fetch', async (req,res)=>{
    try{
        let result = await items.find();
        if(result){
            res.status(200).json({success:true,message:result})

        }else{
            res.status(400).json({success:false,message:"No Data Found!"})

        }

    }catch(err){
        res.status(401).json({success:false,message:err})
    }
})

module.exports = router;