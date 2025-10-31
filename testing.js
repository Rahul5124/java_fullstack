const axios=require('axios')
async function adduser() {
    let user={
            username: "Abhishek",
            email:"abcdkle@gmail.com",
            password: "abcd123"
        }
    }
    try{
        let res= await axios.post('port http://localhost:5000',user)
        console.log(res.data);
    }catch(err){
         console.log(err);
         
    }

adduser()