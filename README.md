# dys-cf-api-ml-auth

Esta es una Cloud Function en **Node.js** que sigue la **Arquitectura Clean** para autenticación y obtención de tokens desde la API de **Mercado Libre**. La función se conecta a **MongoDB** para obtener un parámetro, valida una API Key y expone un servicio HTTP para obtener un `access_token`.

## Estructura del Proyecto
```bash
    /src
      /application
        /use-cases
          getTokenUseCase.js
      /domain
        /entities
      /infrastructure
        /controllers
          meliController.js
        /database
          mongo.js
        /repositories
          paramRepository.js
        /services
          mercadoLibreService.js
        /validators
          apiKeyValidator.js
      /main
        app.js          # Configuración de Express
    index.js            # Exportación para Google Cloud Functions (en la raíz)

```

## Requisitos

- **Node.js 18**
- **MongoDB**
- **Google Cloud SDK** para el despliegue

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
API_KEY=tu-api-key
MONGO_URI=tu-mongo-uri
API_ML_CLIENT_ID=tu-client-id
API_ML_CLIENT_SECRET=tu-client-secret
```

## Deploy

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
    gcloud functions deploy dys-cf-api-ml-auth \
      --runtime nodejs18 \
      --trigger-http \
      --allow-unauthenticated \
      --region=us-central1 \
      --env-vars-file=.env.yaml \
      --entry-point=app
```


