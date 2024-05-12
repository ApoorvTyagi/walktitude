const config = require('config');
const axios = require('axios');
const { google } = require('googleapis');
const logger = require("../logger/index");
const notificationKey = require("../../../config/notification.key.json");

function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const jwtClient = new google.auth.JWT(
      notificationKey.client_email,
      null,
      notificationKey.private_key,
      ["https://www.googleapis.com/auth/firebase.messaging"],
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

async function pushNotification(user, invitee) {
  const bearerToken = getAccessToken();
  try {
    await axios.post(
      `${config.EXTERNAL_API_ENDPOINTS.PUSH_NOTIFICATION_URI}`,
      {
        message: {
          notification: {
            title: "Let's Take a Stroll Together 🧑‍🤝‍🧑",
            body: `Hey ${invitee.firstName}, fancy a walk together with ${user.firstName} to catch up and enjoy the outdoors?`,
            image: "",
            webpush: {
              fcm_options: {
                link: "https://walktitude.web.app/",
              },
            },
          },
          token: `${invitee.web_device_token}`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
  } catch (error) {
    logger.error(`Error while sending push notification: ${user._id} : ${invitee._id} => ${error} : ${error.config.data}`);
  }
}

module.exports = {
  pushNotification,
}