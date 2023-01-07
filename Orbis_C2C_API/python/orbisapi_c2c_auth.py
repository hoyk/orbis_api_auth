import requests
import os
import json
import base64
from jose import jws
from uuid import uuid4
from datetime import datetime
from dotenv import dotenv_values

if __name__ == '__main__':
    config = dotenv_values(".env")

    payload = {
        'group': config['GROUP'],
        'entity': config['ENTITY'],
        'iss': 'C2C_API_TEST',
        'jti': str(uuid4()),
        'iat': int(datetime.now().timestamp()),
        'exp': int(datetime.now().timestamp()) + 60,
    }

    jws_token = jws.sign(payload, config['SECRET'], algorithm='HS256')

    ## Get token
    r = requests.get(f'{config["HOSTNAME"]}/api/auth/c2c/token?jws={jws_token}')
    token = json.loads(r.text)['token']
    token_bs64 = base64.b64encode(token.encode()).decode()
    print(json.loads(r.text))

    ## Request
    # r = requests.get(
    #     f'{config["HOSTNAME"]}/api/user/account?account=TRYK0001',
    #     headers={'Authorization': f'C2C {token_bs64}'},
    # )
    # print(json.loads(r.text))
