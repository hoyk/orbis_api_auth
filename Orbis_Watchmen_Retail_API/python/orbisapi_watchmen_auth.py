import requests
import os
import json
import base64
from jwcrypto import jwk, jwe
from uuid import uuid4
from datetime import datetime
from dotenv import dotenv_values

if __name__ == '__main__':
    config = dotenv_values(".env")

    with open(f'{config["ACCESSKEY"]}.pem', 'rb') as f:
        public_key = jwk.JWK.from_pem(f.read())

    protected_header = {
        "alg": "RSA-OAEP-256",
        "enc": "A128GCM",
        "kid": config["ACCESSKEY"],
    }

    payload = {
        'iss': 'watchman API',
        'iat': int(datetime.now().timestamp()),
        'exp': int(datetime.now().timestamp()) + 60,
        'nbf': int(datetime.now().timestamp()),
        'jti': str(uuid4()),
    }

    # Create jwe token
    jwetoken = jwe.JWE(
        json.dumps(payload), recipient=public_key, protected=protected_header
    )
    enc = jwetoken.serialize(compact=True)

    ## Get token
    r = requests.post(
        f'{config["HOSTNAME"]}/v1/oms/token',
        headers={
            'Content-type': 'application/json',
        },
        data=json.dumps({'jwe': enc}),
    )
    token = json.loads(r.text)['content']
    print(json.loads(r.text))

    ## Request
    # r = requests.get(
    #     f'{config["HOSTNAME"]}/v1/users/search/accounts?criteria=YIKANG&lookup=true',
    #     headers={
    #         'Content-type': 'application/json',
    #         'Authorization': f'Bearer {token}',
    #     },
    # )
    # print(json.loads(r.text))
