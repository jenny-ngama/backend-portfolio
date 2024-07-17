const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const uuid = require("uuid");
const requestId = uuid.v4();

// GENERATEUR TOKEN

function generateAuthToken(user) {
  const payload = {
    userId: user.requestId,
    email: user.email,
    nom: user.nom,
  };
  const secretKey = process.env.RANDOM_TOKEN_SECRET;
  const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });

  return token;
}

// CONTROLLERS SERVER

exports.serverSignup = async (req, res) => {
  try {
    const { nom, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    const newAdm = await prisma.user.create({
      data: {
        requestId: requestId,
        nom,
        email,
        password: passwordHash,
        date_inscription: new Date(),
      },
    });
    res.status(201).json({ message: "Administrateur créé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
};

exports.serverLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adm = await prisma.user.findUnique({ where: { email } });
    if (!adm || !bcrypt.compareSync(password, adm.password)) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }
    const name = adm.nom
      .match(/^[a-z]+/i)[0]
      .split("")
      .reverse()
      .join("")
      .toUpperCase();
    const descendRemonte = `EDNICMPSSR${name}`;

    const token = generateAuthToken(adm);
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .json(descendRemonte);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.serverLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).render("auth", { message: "Vous vous etes déconnecté" });
  } catch (error) {
    console.error(error);
  }
};

exports.serverUsersGet = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).render("users", { users });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.serverUsersJson = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({users: users });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.serverUserGet = async (req, res) => {
  try {
    const { requestId } = req.params;

    const user = await prisma.user.findUnique();

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).render("user", { user });
  } catch (error) {
    res.status(500).json({ message: "Erreur server" });
  }
};

exports.serverUserGetJson = async (req, res) => {
  try {
    const { requestId } = req.params;

    const user = await prisma.user.findUnique();

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur server" });
  }
};

exports.serverUserPut = async (req, res) => {
  try {
    const { requestId } = req.params;

    const { nom, email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { requestId: requestId },
    });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const userUpdate = await prisma.user.update({
      where: { requestId: requestId },
      data: {
        email: email || user.email,
        password:
          password === user.password
            ? user.password
            : bcrypt.hashSync(password, 10),
      },
    });

    res.status(200).json({ message: "Profil mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.serverUserCreate = async(req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).render("parametres", {users});
  } catch (error) {
    res.status(500).json({message: error})
  }
}

exports.serverUsersEmpty = async(req, res) => {
  res.json("not implement")
}