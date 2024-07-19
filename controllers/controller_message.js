require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uuid = require("uuid");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.messageReceive = async (req, res) => {
  const { nom, email, message } = req.body;
  const requestId = uuid.v4();

  try {
    const nouveauMessage = await prisma.message.create({
      data: {
        requestId,
        nom,
        email,
        message,
        confirmed: false
      }
    });

    res.status(200).send('Votre message a été envoyé avec succès.');

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail de contact :', error);
    res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail de contact.');
  }
};

exports.messagesGet = async (req, res) => {
  try {
    const messages = await prisma.message.findMany();
    res.status(200).render('messages', { messages });
  } catch (error) {
    console.error(error);
    res.status(500).send('Une erreur s\'est produite lors de la récupération des messages.');
  }
};

exports.messagesData = async (req, res) => {
  try {
    const messages = await prisma.message.findMany();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Une erreur s\'est produite lors de la récupération des messages.');
  }
};

exports.messagesPut = async (req, res) => {
  try {
    const { email } = req.body;

    const updatedMessages = await prisma.message.updateMany({
      where: { email },
      data: {
        read: true,
      },
    });

    return res.status(200).json({ count: updatedMessages.count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour des messages' });
  }
};



exports.messageGet = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await prisma.message.findUnique({
      where: { requestId: id },
      include: {
        message_reponse: true
      }
    });

    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }

    res.status(200).render('message', { message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du message' });
  }
};
