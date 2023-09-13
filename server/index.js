const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('./supp-11a69-firebase-adminsdk-dcgdv-492f0b38ac.json');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/supp', { useNewUrlParser: true });

const User = mongoose.model('User', { uid: String, fcmToken: String });

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { uid, fcmToken } = req.body;

    try {
        const user = new User({ uid, fcmToken });
        await user.save();
        res.status(200).send('Device registered successfully');
    } catch (error) {
        console.error('Error registering device:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/send-message', async (req, res) => {
    const { uid, messageContent, messageTitle } = req.body;
    try {
        console.log("uid: " + uid)
        const recipient = await User.findOne({ uid: uid });
        if (!recipient) {
            return res.status(404).send('Recipient not found');
        }
        const message = {
            data: {
                title: messageTitle,
                body: messageContent,
            },
            token: recipient.fcmToken,
        };

        await admin.messaging().send(message);
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});