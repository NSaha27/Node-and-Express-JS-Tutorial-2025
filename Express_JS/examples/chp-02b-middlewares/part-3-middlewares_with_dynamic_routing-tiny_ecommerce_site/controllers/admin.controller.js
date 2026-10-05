
const loadAdminRegistrationPage = async(req, res) => {
  const fileName = "register.ejs";
  try{
    res.status(200).render(`admin/${fileName}`, {pagePath: "/admin/register"});
  }catch(err){
    console.error(err);
    res.status(404).render("404.ejs");
  }
};

const handleRegistration = async(req, res) => {
  const formData = req.body;

}