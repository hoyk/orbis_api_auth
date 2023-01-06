import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import jose from "node-jose";
import axios from "axios";
import fs from "fs";

const conf = dotenv.config().parsed;
const { JWE, JWK } = jose;
const keystore = JWK.createKeyStore();
const keyfile = `${conf.ACCESSKEY}.pem`;

const payload = JSON.stringify({
  iss: "watchman API",
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor((Date.now() + 60 * 1000) / 1000),
  nbf: Math.floor(Date.now() / 1000),
  jti: uuidv4(),
});

(async () => {
  // Read public key file
  const public_key = fs.readFileSync(keyfile);
  const key = await keystore.add(public_key, "pem", { kid: conf.ACCESSKEY });

  try {
    //// Create JWE token
    var jwetoken = await JWE.createEncrypt(
      {
        format: "compact",
        fields: {
          alg: "RSA-OAEP-256",
          kid: conf.ACCESSKEY,
          enc: "A128GCM",
        },
      },
      key
    )
      .update(payload)
      .final();

    //// Get token
    const res = await axios({
      method: "post",
      url: `${conf.HOSTNAME}/v1/oms/token`,
      data: {
        jwe: jwetoken,
      },
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(res.data);

    //// Query
    // const querydata = await axios.get(conf.HOSTNAME + "/v1/users/search/accounts?criteria=YIKANG&lookup=true", {
    //   headers: {
    //     Authorization: "Bearer " + res.data.content,
    //   },
    // });
    // console.log(querydata.data);
  } catch (err) {
    console.log(err);
  }
})();
