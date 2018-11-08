import * as crypto from "crypto";
import { Request, Response } from "express";
import Mailchimp = require("mailchimp-api-v3");
import * as EmailValidator from "email-validator";
import AppConfig from "../config/app";

export default class Subscription {
  mailChimp: Mailchimp;
  constructor(apiKey) {
    this.mailChimp = new Mailchimp(apiKey);
  }

  async subscribe(req: Request, res: Response) {
    const origin = req.headers["origin"];
    const email = req.body.email;

    if (!origin) {
      return res.status(400).send(`Header missing 'origin'`);
    }
    // Check email id exist within body params
    if (!email) {
      return res.status(400).send(`Bad parameter 'email'`);
    }

    if (!EmailValidator.validate(email)) {
      return res.status(400).send(`Bad parameter 'email' : Invalid`);
    }
    const listId = AppConfig.getListId(origin);
    const memberId = crypto.createHash("md5").update(email).digest("hex");
    try {
      const userInfo = await this.mailChimp.get(`/lists/${listId}/members/${memberId}`);
      if (userInfo.status === "subscribed") {
        return res.status(400).send("Email is already subscribed.");
      }
      try {
        await this.mailChimp.patch(`/lists/${listId}/members/${memberId}`, {
          status: "subscribed"
        });
      } catch(e) {
        console.error('PATCH error', e);
        return res.send(e.status || 400).send(e.detail || e);
      }
      res.status(200).send("OK");
    } catch(e) {
      try {
        const subscribeUrl = `/lists/${listId}/members`;
        await this.mailChimp.request({
          method: "post",
          path: subscribeUrl,
          body: {
            email_address: email,
            status: "subscribed"
          }
        });
        res.status(200).send("OK");
      } catch(e) {
        console.error('POST error', e);
        return res.status(e.status || 400).send(e.detail || e);
      }
    }
  }
}
