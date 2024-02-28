## **Contribución**

A continuación, se presenta la guía a seguir para los colaboradores que deseen realizar contribuciones a este repository.

### **Elige un Ticket**

Lo primero que debes hacer es seleccionar un [ticket abierto](https://apap-software.atlassian.net/jira/software/projects/IB/issues/?jql=project%20%3D%20%22IB%22%20AND%20status%20%3D%20%22To%20Do%22%20ORDER%20BY%20created%20DESC) de los que se encuentran registrados en jira. 

En caso de que el aporte que quieras realizar no se encuentra documento en un ticket del backlog, puedes ponerte de acuerdo con el administrador del proyecto en jira y proceder con la creación y documentación del mismo.

### **Clonar el Repo Correctamente**

Existen varias formas de clonar el repositorio, pero en esta ocasión vamos a utilizar el comando `git clone`:

```powershell
git clone https://APAPDigital@dev.azure.com/APAPDigital/APAP%20-%20Templates/_git/typescript-micro-nestjs-backend-template
```

Para ver otras formas de clonar el repositorio puedes ver el tutorial [Clone an existing Git repo](https://docs.microsoft.com/en-us/azure/devops/repos/git/clone?view=azure-devops&tabs=command-line).

Como resultado obtenemos la carpeta `📂typescript-micro-nestjs-backend-template` y dentro de la misma se encuentran los fuentes, pruebas, documentos, tools, entre otros elementos. 

#### **Instalar GitHooks**

Los githooks nos ayudan a realizar validaciones al momento de ejecutar algún comando de `git` y así cumplir con ciertos estándares que se encuentran definidos en [Control de Versions - Confluence](https://apap-software.atlassian.net/wiki/spaces/AO/pages/1912143873/Control+de+Versiones).

Para instalar los git-hooks necesitamos ejecutar un script desarrollado en powershell. A continuación, se muestran los pasos a seguir para una correcta instalación:

1. Luego de clonar el repo
```powershell
repos> sl ./typescript-micro-nestjs-backend-template
```
2. Ubicarse dentro de la carpeta donde está el script de instalación:
```powershell
repos/typescript-micro-nestjs-backend-template> sl ./tools/.git-hooks
```
3. Ejecutar script de instalación (ejecutar desde powershell):
```powershell
repos/typescript-micro-nestjs-backend-template/tools/.git-hooks>.\install-hooks.ps1
```

Si los hooks se instalaron correctamente verás un mensaje como el siguiente: <code style="color:#06d6a0">Hooks successfully installed!</code>

### **Lineamientos de Programación**

Se deben seguir los [estilos de programación](https://apap-software.atlassian.net/wiki/spaces/AO/pages/1912176652/Estilos+de+Programaci+n) que se encuentran definimos y establecidos como estándares para todo desarrollo a realizarse.

### **Unit Testing**

Las pruebas unitarias están implementadas utilizando [Jest](https://github.com/facebook/jest). Todo desarrollo realizado debe estar cubierto en un gran porcentaje por pruebas unitarias.

Las pruebas unitarias son fundamentales, por lo que las mismas deben desarrollarse con rigurosidad y teniendo en cuenta que la cobertura de estas se valida desde [sonarqube](https://www.sonarqube.org/) por lo que se espera un nivel optimo en la cobertura de las pruebas.

Para más información puede navegar al siguient [enlace](https://docs.microsoft.com/en-us/visualstudio/test/walkthrough-creating-and-running-unit-tests-for-managed-code?view=vs-2019).

### **Build**

Para compilar la solución puedes auxiliarte de los siguientes tutoriales: 

* [Visual Studio](https://docs.microsoft.com/en-us/visualstudio/ide/building-and-cleaning-projects-and-solutions-in-visual-studio?view=vs-2019)

### **Control de Versiones**

Se deben acatar todas las [convenciones](https://apap-software.atlassian.net/wiki/spaces/AO/pages/1912143873/Control+de+Versiones) definidas respecto a la forma de llevar el control de versiones de los fuentes:

* [Versionado](https://apap-software.atlassian.net/wiki/spaces/AO/pages/1912143873/Control+de+Versiones#Versionado)
* [Estrategia de Branches](https://apap-software.atlassian.net/wiki/spaces/AO/pages/1912143873/Control+de+Versiones#Estrategia-de-Branches)
* [Nombre de los Branches](https://apap-software.atlassian.net/wiki/spaces/AO/pages/1912143873/Control+de+Versiones#Est%C3%A1ndar-de-nombre-de-Branches)
* [Mensajes del Commit](https://apap-software.atlassian.net/wiki/spaces/AO/pages/1912143873/Control+de+Versiones#Mensajes-de-Commit)

### **Pull Request**

El pull request es el medio mediante el cual las contribuciones son incorporadas al repositorio. 

Actualmente no hay forma de incorporar tu contribución a la línea base sin realizar un pull request y que el mismo cumpla con lo estipulado en confluence, favor ver [Pull Request - Confluence](https://apap-software.atlassian.net/wiki/spaces/AO/pages/1912143873/Control+de+Versiones#Pull-Request).

Al pull request se le hará code review y el desarrollo no será incorporado hasta tanto el mismo sea completado y cualquier observación sea resuelta.

Ten presente que el pull request debe estar bien documentado.

#### **Documentación**

Un pull request bien documentado debe contar con los siguientes factores:

* Describir de manera precisa su finalidad.
* Cuenta con la(s) tarea(s) que dieron paso a su creación.
* Explica el desarrollo realizado.
