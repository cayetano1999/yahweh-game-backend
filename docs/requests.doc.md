# documentacion de peticiones para el microservicio **{{typescript-micro-nestjs-backend-template}}
## **Peticiones existentes**
Los eventos existentes en el MICROSERVICIO y/o peticiones HTTP en el microservicio se describen en esta documentacion

Aquí presentamos todos los eventos definidos por el micro-servicio, con una breve descripción:
***PETICIONES: ***

<!-- 1. `[TEST_EVENT] [AMQP]` -  es donde el microservicio emite el evento para evaluar el request enviado desde [Mircoservicio-receptor]
    * Información esperada en la propiedad data del payload `data`:
        ```javascript
        {
            FechaNacimiento: String,
            montoSolicitado: Date,
            plazoSolicitado:Date,
            nivelRiesgo : String
        }
        ```
2. `/[ruta-de-ejemplo] [HTTP-POST]` -  es donde el microservicio a traves de consulta HTTP realiza la evaluacion del payload enviado desde donde sea solicitado.
    * Información esperada en la propiedad data del payload `data`:
        ```javascript
        {
            FechaNacimiento: String,
            montoSolicitado: Date,
            plazoSolicitado:Date,
            nivelRiesgo : String
        }
        ``` -->
***RESPUESTAS***
<!-- 1. `[RESPUESTA-DE-EVENTO]` - - es donde el microservicio emite la respuesta de las evaluaciones realizadas.
    * `ERROR`: Las informaciones en caso de no poder para consultar la informacion de manera satisfactoria
    Información enviada en la propiedad data del payload `data`:
    ```javascript
        {
                "response": {
                    "header": {
                        "code": "0",
                        "type": "Success",
                        "message": "La evaluacion fue realizada satisfactoriamente"
                    },
                    "data": {
                    }
                }
        }
    ```
     -->

