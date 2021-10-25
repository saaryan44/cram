const x=require('express');
const y=x(); y.use(x.json());
const z=require('mongoose');
const h=require('dotenv'); h.config({path:'./config.env'});
const dbs=process.env.Mongo;
const bcryptjs=require('bcryptjs');


z.connect(dbs,{useNewUrlParser:true, useUnifiedTopology:true}).then(d=>console.log("dbs connected")).catch(d=>console.log("failed to connect dbs"));

const port=process.env.PORT || 4000;
y.use(x.static('./build'));

const schema=new z.Schema({something:String,hashed:{type:String,required:true}}); schema.pre('save',async function(r){if(this.isModified('hashed')){this.hashed=await bcryptjs.hash(this.hashed,13);}r();}); const collection=z.model("these",schema);


y.post('/store',async (a,b)=>{const doc=collection({something:a.body.something,hashed:a.body.hashed}); await doc.save(); b.json({ok:true});});


y.listen(port,()=>console.log(`port ${port}`));
