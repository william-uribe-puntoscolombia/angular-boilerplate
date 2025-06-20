# Boilerplate

Utilizamos Angular como framework principal.

Comandos:

```sh
# Se recomienda usar el administrador de versiones de paquetes Mise, la version esta en .mise.toml
# Documentación de instalacion de Mise: https://mise.jdx.dev/installing-mise.html#https-mise-run

# Instala la versión de bun
mise install

# Instalar dependencias NOTA: El package.json/engines esta la versión de node a utilizar.
$ bun i

# Servidor de desarrollo
$ bun dev

# Build en modo producción
$ bun build

# Build en modo staging
$ bun build:staging

# Build en modo desarrollo
$ bun build:development

# Lint del código
$ bun lint

# Lint del código con autofix
$ bun lint:fix

# Ejecutar pruebas en modo headless
$ bun test

# Ejecutar pruebas con UI
$ bun test:ui

# Ejecutar pruebas sin watch ni progreso
$ bun test:nowatch

# Ejecutar pruebas con cobertura
$ bun test:cov

# Ejecutar pruebas con cobertura sin watch
$ bun test:cov:nowatch

# Ejecutar pruebas con cobertura incluyendo archivos específicos
$ bun test:cov:include [RUTA_A_CARPETA_O_ARCHIVO]
```

## Tests unitarios

Se utiliza Vitest para las pruebas.

- Se preconfigura Vitest, pero el coverage no funciona bien, por lo que se recomienda usar Karma para el coverage, hasta que este se genere correctamente con Vitest.
- Cuando esto funcione, retirar todas las librerías de Karma y Jasmine.

## ¿Cómo funciona el estado? (NgRx)

Utilizamos NgRx Signals. En `src/app/core/store/global.ts` se maneja el estado global, tiene implementada la persistencia y activas las herramientas de debug. Necesitas más información de cómo funciona [Signals store](https://ngrx.io/guide/signals/signal-store).

Puedes tomar como referente `src/app/core/store/global.ts` para crear un estado de componente (si es necesario).
NgRx

### ¿Cómo funciona el debug?

- [Documentación.](https://ngrx-toolkit.angulararchitects.io/docs/with-devtools#disabling-devtools-in-production)
- [Extensión de Chrome.](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### ¿Cómo persistir datos?

La persistencia de datos en el browser debe contener el prefijo "pco-[NOMBRE_MICRO]-[STORE]", ejemplo: `pco-shell-global`, hay un ejemplo de como persistir el estado en el store global `src/app/core/store/global.store.ts` ver: `withStorageSync()`.

# Stack tecnologico.

- Linter, Format (ESLint)
- Vitest, Coverage
- TailwindCSS
- Ngx-permissions
- NgRx Signals

# Pendientes

- Vitest: validar funcionamiento coverage
- Eliminar Peer dependencies requeridas, requeridas por NgRx. Package.json

```sh
# Eliminar esta parte:
"overrides": {
  "@angular/core": "20.0.4",
  "@angular/common": "20.0.4"
},
```

- ..

# Check list nuevo micro

- Instalar extensiones
- Iniciar husky `bun husky`
- Cambiar los selectores dependiendo del micro, eje: `prefix: 'shell',` -> `prefix: 'users',` en el `eslint.config.js`
