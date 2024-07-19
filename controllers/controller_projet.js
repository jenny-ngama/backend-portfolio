exports.projetsGet = async (req, res) => {
  try {
    res.status(200).render('projets');
  } catch (error) {
    console.error(error);
    res.status(500).send('Une erreur s\'est produite lors de la récupération des projets');
  }
};