
const Organization = require("../models/organization");
const jwt = require('jsonwebtoken')


// login functionality
//notify organization of incorrect credential
exports.login = async (req, res) => {
    let {email , password} = req.body
      email = req.body.username

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    email = email.toLowerCase()
 

    const exists = await Organization.findOne({email: email})
    if(!exists){
        return res.status(400).json({ message: "Organization does not exists" })
    }

    const isPassword = await exists.comparePassword(password)

    if(!isPassword){
        return res.status(400).json({ message: "Wrong password" })

    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "name": exists.name,
                "email": exists.email,
                "roles":[ "organization"]
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
      
    )

    res.cookie('jwt', {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
    })
console.log(accessToken)
    return res.json(accessToken)



};

exports.logOut =  async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

//sign up functionality
//notify organization of duplicate organizationname
exports.signUp = async (req, res) => {
    let organization = new Organization(req.body);
    organization.name = req.body.organization
    organization.ref.name = req.body.ref_name;
    organization.ref.phone = req.body.ref_phone;
    
    console.log(organization)

        // confirm personal data
    if (!organization.name  || !organization.email || !organization.password) {
        return res.status(400).json({ message: "All fields are required" })
    }
        organization.email = organization.email.toLowerCase()
     
        //confirm duplicate
     const isDuplicate = await Organization.findOne({ email: organization.email })
     if (isDuplicate) {
         return res.status(400).json({ message: "Organization with email already exists" })
 
     }

    const isSaved = await organization.save()
    if(isSaved){
        res.status(201).json({ message: `The organization  ${organization.name} has been created successfully` })
    }
    else{
        res.status(400).json({ message: 'Invalid data recived' })

    }

};
 
exports.getAllOrganizations = async(req, res) =>{
    // Get all orgs from DB
    const organizations = await Organization.find()
    
    // If no orgs
    if (!organizations.length) {
        return res.status(400).json({ message: "No orgs found" })
    }

    res.json(organizations)
}

exports.getOrganization = async (req, res) => {
    // Get a organization from DB
    const {email} = req.params
    const organization = await Organization.find({email})

    // If no organization
    if (!organization) {
        return res.status(400).json({ message: "Organization not found" })
    }

    res.json(organization)

}