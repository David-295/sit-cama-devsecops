\# sit-cama: contexto del proyecto



Caso de estudio de Ingeniería de Software II: Sistema integrado de triaje y disponibilidad de camas para la Clínica San Rafael de Occidente (IPS Nivel II, Colombia). MVP en 2 semanas con RUP/UP + Scrum.



\## Alcance

\- Módulo A: triaje digital (signos vitales, clasificación I a V según Res. 5596 de 2015, alerta para I y II).

\- Módulo B: censo de camas (Urgencias Adultos 15, Pediátricas 8, Observación 12, Aislamiento 3), estados Disponible, Ocupada y Limpieza, asignación directa desde triaje I y II.

\- Roles: enfermero triador, médico de urgencias, camillero y auditor médico.



\## Stack (por confirmar con el equipo)

Ionic con Angular o React y Capacitor; backend NestJS o Go con arquitectura hexagonal; PostgreSQL; Docker.



\## Reglas importantes

\- Cumplir Ley 1581 de 2012 (Habeas Data) y Res. 3100 de 2019.

\- Datos sensibles cifrados con AES-256 y auditoría con registros inmutables.

\- El cálculo de triaje debe tener pruebas unitarias para cada umbral.



\## Convenciones

\- Documentación y comentarios en español.

\- Ramas: feature/nombre. Cambios por Pull Request.

\- Nunca subir claves ni archivos .env al repositorio.

\- Los documentos van en la carpeta docs/.

