# Update-Version
Está herramienta es un script que permite automatizar las versiones de los proyectos mediante la creación de etiquetas y entradas al archivo de _changelog_. De forma que los proyectos sigan el [versionado semántico](https://semver.org/lang/es/) y se [mantenga un changelog](https://keepachangelog.com/es-ES/1.0.0/) con buenas practicas de documentación.



## Instalación
El script `Update-Version.ps1` debe de ser incluido dentro de los fuentes del repositorio y una vez ahí, realizar las siguientes configuraciones:

Para el correcto funcionamiento de esta herramienta, se debe de configurar el repositorio para permitir la [ejecución de comandos Git desde un script](https://docs.microsoft.com/es-es/azure/devops/pipelines/scripts/git-commands?view=azure-devops&tabs=yaml#grant-version-control-permissions-to-the-build-service).

Los pasos a seguir son los siguientes:

1. Vaya a la página de configuración del proyecto de su organización en Organization Configuración > General > Projects.

2. Seleccione el proyecto que desea editar.

3. En Project Configuración, seleccione Repositorios. Seleccione el repositorio en el que desea ejecutar comandos de Git.

4. Seleccione Permisos para editar los permisos del repositorio.


5. Busque el Project de compilación de colección. Elija la identidad Project servicio de compilación de recopilación ({su organización}). De forma predeterminada, esta identidad puede leerse desde el repositorio, pero no puede volver a insertar ningún cambio en él. Conceda los permisos necesarios para los comandos de Git que desea ejecutar. Normalmente, querrá conceder:

    * Crear rama: Conceder
    * Contribuir: Conceder
    * Lea: Conceder
    * Crear etiqueta: Conceder


Para mas información, lea la [documentación de Azure Pipelines](https://docs.microsoft.com/es-es/azure/devops/pipelines/scripts/git-commands?view=azure-devops&tabs=yaml#grant-version-control-permissions-to-the-build-service) para este tema.

Una vez preparado el pipeline, se debe agregar la ejecución del script en un [Task de powershell](https://docs.microsoft.com/es-es/azure/devops/pipelines/tasks/utility/powershell?view=azure-devops) para Azure Devops. A continuación, un ejemplo de la configuración:

```yml
- task: PowerShell@2
  displayName: 'Update version'
  inputs:
    filePath: 'Update-Version.ps1'
    pwsh: true
    arguments:
      -Changelog ./CHANGELOG.md
      -Url $Env:BUILD_REPOSITORY_URI
      -AuthorName $Env:BUILD_REQUESTEDFOR
      -AuthorEmail $Env:BUILD_REQUESTEDFOREMAIL
      -Branch $Env:BUILD_SOURCEBRANCHNAME
      -Type dotnet
```

Finalmente, se debe de crear un archivo changelog en caso de no existir. En cualquier caso, este archivo debe contener la palabra clave `<!--[NEXT_ENTRY]-->` de forma que el script pueda usar este comentario como un marcador de posición donde debe de agregar las entradas generadas automaticamente.

A continuación un ejemplo de archivo CHANGELOG.md:
```markdown
# Changelog

<!--[NEXT_ENTRY]-->
```

## Uso

Una vez configurado, en el momento en que esté corriendo el pipeline, el script se encargará de leer el mensaje de commit utilizado para buscar [palabras clave](#palabras-clave).
en los archivos.



### Actualización del Changelog
Dentro de los mensajes de commit se pueden usar las siguientes palabras clave para generar entradas al archivo Changelog de manera automatica:

* `[added]`: Esta palabra clave se usa para generar una entrada en el archivo Changelog con detalles de funcionalidades nuevas.

* `[changed]`: Esta palabra clave se usa para generar una entrada en el archivo Changelog con detalles de los cambios en las funcionalidades existentes.


* `[deprecated]`: Esta palabra clave se usa para generar una entrada en el archivo Changelog indicando que una característica o funcionalidad está obsoleta y que se eliminará en las próximas versiones.


* `[removed]`: Esta palabra clave se usa para generar una entrada en el archivo Changelog para indicar las características en desuso que se eliminaron en esta versión.


* `[fixed]`: Esta palabra clave se usa para generar una entrada en el archivo Changelog para indicar una corrección de errores.


* `[security]`: Esta palabra clave se usa para generar una entrada en el archivo Changelog con cambios relacionados a vulnerabilidades.



### Actualización de la version
Dentro de los mensajes de commit se pueden usar las siguientes palabras clave para actualizar la versión acorde con la especificación de [versionado semántico](https://semver.org/lang/es/) que indica que las versiones deben tener un formato `MAJOR.MINOR.PATCH`:

* `[major_version]`: Esta palabra clave se usa para aumentar la version `MAJOR` en caso de que el cambio introducido sea incompatible en el API o las funcionalidades existentes.

* `[minor_version]`: Esta palabra clave se usa para aumentar la version `MINOR` en caso de que el cambio introducido agregue funcionalidades manteniendo la compatibilidad con versiones anteriores.

* `[patch_version]`: Esta palabra clave se usa para aumentar la version `PATCH` en caso de que el cambio sea una correccion o cambio que no introduce una nueva funcionalidad.



### Script


* `Changelog`: Es la ruta donde se encuentra el archivo Changelog.
* `Branch`: Es el nombre de la rama de Git donde se esta ejecutando el pipeline.
* `URL`: Es la dirección URL del repositorio. Esta se usa para crear enlaces en el Changelog.
* `Changelog`: Es la ruta donde se encuentra el archivo Changelog.
* `AuthorName`: Es el nombre del autor que se utilizará para generar el commit con el cambio de versión.
* `AuthorEmail`: Es el correo del autor que se utilizará para generar el commit con el cambio de versión.
* `Type`: Es el tipo del repositorio. Esto determinara cuales archivos serán actualizados con la información de la nueva versión. Este valor debe ser uno `dotnet` Para proyectos .NET, o `npm` Para proyectos de NPM.


## Consideraciones especiales
El nombre de la rama de Git determina el sufijo que se usará para la nueva versión generada:

* **`release/*`**: genera el sufijo `-beta`. Haciendo referencia a que en esta rama se está preparando una versión para ser enviada al ambiente productivo.

* **`develop`**: genera el sufijo `-alpha`. Haciendo referencia a que esta rama contiene funcionalidad que todavia se esta desarrollando.

* **`main`** o **`master`**: no genera sufijo, pues se considera una versión productiva.


## Estructura de los mensajes de commit
