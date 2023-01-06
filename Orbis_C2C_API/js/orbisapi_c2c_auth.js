import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import jws from "jws";
import axios from "axios";

const conf = dotenv.config().parsed;

const key = jws.sign({
  header: {
    alg: "HS256",
  },
  payload: {
    group: conf.GROUP,
    entity: conf.ENTITY,
    iss: "orbis_c2c_api",
    jti: uuidv4(),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor((Date.now() + 60 * 1000) / 1000),
  },
  secret: conf.SECRET,
});

(async () => {
  try {
    //// Get token
    const { data } = await axios.get(conf.HOSTNAME + "/c2c/jws.action?jws=" + key);
    console.log(data.token);

    //// Request
    // const res = await axios.get(conf.HOSTNAME + "/api/user/account?account=TRYK0001", {
    //   headers: {
    //     Authorization: "C2C " + Buffer.from(data.token).toString("base64"),
    //   },
    // });
    // console.log(res.data);
  } catch (err) {
    console.error(err);
  }
})();
