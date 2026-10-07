import bcrypt from "bcrypt";
import fs from "node:fs/promises";
import path from "node:path/posix";

const loadAdminRegistrationPage = async(req, res) => {
  const fileName = "register.ejs";
  try{
    res.status(200).render(`admin/${fileName}`, {pageURL: "/admin/register"});
  }catch(err){
    console.error(err);
    res.status(404).redirect("/404");
  }
};

const handleRegistration = async(req, res) => {
  const formData = req.body;
  if(formData.id.length === 0 || formData.name.length === 0 || formData.govnDocType.length === 0 || formData.govnDocID.length === 0 || formData.address.length === 0 || formData.phone.length === 0 || formData.email.length === 0 || formData.password.length === 0 || formData.confirmpassword.length === 0){
    return res.status(400).redirect("/admin/register", {pageURL: "/admin/register", message: "All fields are required!"});
  }
  if(formData.password !== formData.confirmpassword){
    return res.status(400).redirect("/admin/register", {pageURL: "/admin/register", message: "Confirm password must be same as Password!"});
  }
  const fileNameToSaveData = "admin.json";
  const filePath = path.resolve("config", fileNameToSaveData);
  let admins;
  try{
    const content = await fs.readFile(filePath, "utf8");
    admins = content.length > 0 ? JSON.parse(content) : [];
  }catch(err){
    return res.status(404).redirect("/admin/register", {pageURL: "/admin/register",message: "File not found!"});
  }
  const adminFound = admins.find(adm => adm.id === formData.id && adm.govnDocID === formData.govnDocID);
  if(adminFound){
    return res.status(400).redirect("/admin/register", {pageURL: "/admin/register",message: "Admin already registered!"});
  }
  const saltRound = 10;
  const encryptedPsw = await bcrypt.hash(formData.password, saltRound);
  admins.push({id: formData.id, name: formData.name, govnDocType: formData.govnDocType, govnDocID: formData.govnDocID, address: formData.address, phone: formData.phone, email: formData.email, password: encryptedPsw});
  try{
    await fs.writeFile(filePath, JSON.stringify(admins), "utf8");
    res.status(200).redirect("/admin/login", {pageURL: "/admin/login",message: "Success! admin was registered"});
  }catch(err){
    res.status(500).redirect("/admin/register", {pageURL: "/admin/register",message: "Failed! unable to register the admin"});
  }
}

const loadAdminLoginPage = async(req, res) => {
  const fileName = "login.ejs";
  try{
    res.status(200).render(`admin/${fileName}`, {pageURL: "/admin/login"});
  }catch(err){
    console.error(err);
    res.status(404).redirect("/404");
  }
};

const handleLogin = async()