# **ORBIS API Auth**

---

## **Description**

Orbis API JWT authentication.

`./Orbis_C2C_API` : Quote API, ( [document](https://viewtrade.dev/articles/5/orbis-api-authorization-scheme-computer-to-computer-c2c) )

`./Orbis_Watchmen_Retail_API` : Watchmen API, ( [document](https://viewtrade.dev/articles/11/watchmen-retail-api-authorization) )

<br>

## **Installation**

- Postman https://www.postman.com/downloads/
- Studio Code https://code.visualstudio.com/download
- NodeJS https://nodejs.org/en/
- Python https://www.python.org/downloads/

<br>

## **Create .env file**

create .env file in corresponding folder with following parameters

- **C2C API**

```
HOSTNAME = (api domain address)
SECRET = (secret key of api)
ENTITY = (entity)
GROUP = (group)
```

- **Watchmen API**

```
HOSTNAME = (api domain address)
ACCESSKEY = (public access key )
```

<br>

## **JS**

- **Install package**

  In project root folder, run `npm install`

- **Run script**

  In JS folder, run `node orbisapi_c2c_auth.js`

<br>

## **Python**

- **Install package**

  In project root folder, run `pip install -r requirements.txt`

- **Run script**

  In Python folder, run `python orbisapi_c2c_auth.py`
