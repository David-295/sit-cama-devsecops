# Documento de Visión: sit-cama

Sistema integrado de triaje y disponibilidad de camas\
Clínica San Rafael de Occidente (IPS privada de Nivel II, Colombia)\
Ingeniería de Software II · Versión 1.0\
Fase RUP: Iniciación, hito LCO (Lifecycle Objective)

## 1. Introducción

### 1.1 Propósito

Este documento explica qué es sit-cama, qué problema le resuelve a la clínica y hasta dónde llega la solución. Lo escribimos al comienzo del proyecto para que el equipo y la clínica tengan claro qué se va a construir antes de pasar a los casos de uso, la especificación suplementaria y la arquitectura. También es el documento que permite cerrar la fase de Iniciación.

### 1.2 Alcance

sit-cama es una aplicación híbrida (web PWA y app móvil con Capacitor para Android e iOS) que reemplaza las planillas de papel y el aplicativo de escritorio en dos tareas de urgencias:

- **Módulo A, triaje digital rápido.** Registro de los datos del paciente y de sus signos vitales, clasificación automática del triaje de I a V según la Resolución 5596 de 2015, y una alerta médica inmediata cuando el caso es grave.
- **Módulo B, censo dinámico de camas.** Vista en tiempo real de las camas de cada servicio, control de sus estados (disponible, ocupada, en limpieza) y asignación directa de la cama desde el triaje.

Todo esto debe quedar funcionando en dos semanas (10 días hábiles). Por eso lo que se entrega es un MVP y no el sistema completo de la clínica.

### 1.3 Definiciones y abreviaturas

| Término | Qué significa |
| --- | --- |
| IPS | Institución Prestadora de Servicios de Salud |
| Triaje | Clasificación de los pacientes de urgencias según su gravedad, de I (el más grave) a V |
| SpO₂ | Saturación de oxígeno en la sangre |
| Glasgow | Escala que mide el nivel de conciencia del paciente |
| MVP | Producto mínimo viable |
| PWA | Aplicación web progresiva |
| RBAC | Control de acceso según el rol de cada usuario |
| FURPS+ | Forma de clasificar requisitos: funcionalidad, usabilidad, confiabilidad, rendimiento y soporte, más restricciones |
| LCO | Hito con el que termina la fase de Iniciación |
| ALM | Plataforma para gestionar el ciclo de vida del software (GitLab o GitHub) |
| DoD | Definition of Done, los criterios para dar una tarea por terminada |

### 1.4 Referencias

- Caso de estudio "Sistema integrado de triaje y disponibilidad de camas (sit-cama)", Ingeniería de Software II, versión 1.0.
- Resolución 5596 de 2015 del Ministerio de Salud (clasificación de triaje).
- Resolución 3100 de 2019 del Ministerio de Salud (habilitación de servicios de salud).
- Ley Estatutaria 1581 de 2012 (Habeas Data).

## 2. Posicionamiento

### 2.1 Oportunidad de negocio

La clínica atiende urgencias de mediana complejidad: pediatría, medicina interna, cirugía general, gineco-obstetricia y trauma básico. Hoy el triaje y la asignación de camas se llevan en planillas físicas o en un aplicativo de escritorio que no se puede usar en las salas ni en las ambulancias. Pasar esos procesos a una herramienta móvil y en tiempo real ayuda a atender más rápido a los pacientes graves, a aprovechar mejor las camas y a cumplir con la normativa sin tanto esfuerzo manual.

### 2.2 Planteamiento del problema

| Elemento | Descripción |
| --- | --- |
| El problema de | llevar el triaje y la asignación de camas en papel o en un aplicativo de escritorio |
| afecta a | los pacientes de urgencias, enfermería, médicos, camilleros, admisiones y auditoría médica |
| y su impacto es | demoras al clasificar a los pacientes, camas libres que tardan hasta 3 horas en aparecer como disponibles y dificultad para proteger los datos sensibles y dejar trazabilidad |
| Una buena solución sería | una aplicación que calcule el triaje sola, avise de inmediato los casos críticos, muestre las camas en tiempo real y guarde un registro que nadie pueda alterar, todo dentro de la normativa colombiana |

### 2.3 Posición del producto

| Elemento | Descripción |
| --- | --- |
| Para | el personal asistencial y administrativo de urgencias de la clínica |
| que necesita | clasificar pacientes rápido y saber en el momento qué camas están libres |
| sit-cama es | una aplicación híbrida de triaje digital y censo de camas |
| que | calcula el nivel de triaje según la Res. 5596, dispara alertas de reanimación y actualiza el estado de las camas en menos de 1 segundo |
| A diferencia de | las planillas físicas y el aplicativo de escritorio que se usan hoy |
| nuestro producto | se puede usar en tablets y estaciones de enfermería, sigue funcionando si se cae el WiFi, cifra los datos sensibles y deja auditoría de cada cambio |

## 3. Interesados y usuarios

### 3.1 Resumen

| Interesado | Qué hace con el sistema | Qué le importa |
| --- | --- | --- |
| Enfermero triador | Crea el triaje | Registrar los signos vitales en menos de 90 segundos y recibir la clasificación sin calcularla a mano |
| Médico de urgencias | Atiende al paciente y ordena la cama | Enterarse al instante de los casos I y II y asignar cama con un toque |
| Camillero o servicios generales | Cambia la cama a limpieza y luego a disponible | Que el cambio de estado sea simple y rápido |
| Admisiones y hospitalización | Consulta el censo de camas | Ver la ocupación por servicio en tiempo real |
| Auditor médico | Solo lee reportes | Consultar la trazabilidad de lo que se hizo |
| Paciente | No usa el sistema, pero depende de él | Que lo atiendan a tiempo y que sus datos estén protegidos |
| Dirección de la clínica | Patrocina el proyecto | Eficiencia, ocupación de camas y cumplimiento normativo |
| Responsable de TI | Despliega y mantiene | Seguridad, disponibilidad y facilidad de mantenimiento |
| Calidad y habilitación | Revisa el cumplimiento | Que se cumpla la Resolución 3100 de 2019 |
| Equipo de desarrollo | Construye el sistema | Un alcance claro que se pueda lograr en 10 días hábiles |

### 3.2 Entorno de los usuarios

El sistema se va a usar en lugares y condiciones distintas, y eso condiciona el diseño:

- En las estaciones de enfermería se usa la versión web responsive.
- En las tablets y en los dispositivos de los médicos en ronda se usa la app móvil. Como el personal trabaja con guantes quirúrgicos, los botones táctiles deben medir mínimo 48 × 48 px.
- Las alertas de reanimación se muestran, con sonido y de forma visual, en el panel general de la estación de médicos.
- El WiFi de las salas puede fallar, así que la app debe guardar los borradores en el dispositivo y sincronizarlos cuando vuelva la conexión.

### 3.3 Necesidades principales

| Necesidad | Prioridad | Cómo la atiende sit-cama |
| --- | --- | --- |
| Clasificar el triaje rápido y sin errores | Alta | Cálculo automático según la Res. 5596 (RF-01 y RF-02) |
| Avisar de inmediato los casos críticos | Alta | Alerta sonora y visual para triaje I y II (RF-03) |
| Saber qué camas están libres sin esperar horas | Alta | Censo dinámico con actualización en menos de 1 s (RF-04 y RF-05) |
| Asignar cama a un paciente crítico sin pasos extra | Alta | Asignación con un solo toque (RF-06) |
| Que cada persona haga solo lo que le corresponde | Alta | Control de acceso por roles (RF-07) |
| Proteger los datos y dejar trazabilidad | Alta | Cifrado AES-256 en reposo y registros inmutables |
| Poder trabajar aunque se caiga la red | Media | Almacenamiento local seguro y sincronización posterior |

## 4. Visión general del producto

### 4.1 Perspectiva

sit-cama es un sistema nuevo e independiente. Reemplaza las planillas y el aplicativo de escritorio en el triaje y la asignación de camas. Se construye con estas piezas:

- Frontend: Ionic con Angular o React, empaquetado con Capacitor (web responsive más APK para Android e iOS).
- Backend: Node.js (NestJS) o Go (Fiber), con arquitectura limpia o hexagonal, en contenedores Docker.
- Base de datos: PostgreSQL con esquemas aislados y cifrado en reposo para los datos sensibles.
- Ciclo de vida: GitLab o GitHub como ALM, con un pipeline CI/CD que incluye análisis SAST/SCA y DAST.

### 4.2 Resumen de capacidades

| Lo que gana la clínica | Con qué característica |
| --- | --- |
| Menos tiempo para clasificar a los pacientes | Formulario móvil con cálculo automático del triaje I a V |
| Atención inmediata a los casos críticos | Alerta sonora y visual para triaje I y II |
| Visibilidad real de las camas | Censo de 38 camas por servicio con estados en tiempo real |
| Menos pasos entre el triaje y la cama | Asignación directa con un toque |
| Cumplimiento legal y confianza | Cifrado, roles y auditoría alineados con Habeas Data y la Res. 3100 |
| Continuidad si falla la red | Modo sin conexión con sincronización automática |

### 4.3 Supuestos y dependencias

- La clínica cuenta con tablets o dispositivos móviles y con estaciones de enfermería con un navegador actualizado.
- Hay cobertura WiFi en urgencias, aunque a veces se interrumpa.
- La clínica entrega a tiempo los datos base: las camas de cada servicio, los usuarios y sus roles.
- Habrá personal médico disponible para validar el sistema (UAT) en la fase de Transición.
- Se dispone de un repositorio en GitLab o GitHub y de un ambiente de Staging y Producción.
- El algoritmo de triaje sigue los criterios que da el caso (RF-02), y un profesional de la salud debe validar su contenido clínico.

## 5. Características del producto

| ID | Característica | Módulo | Requisito |
| --- | --- | --- | --- |
| CAR-01 | Admisión y registro de signos vitales: presión arterial, frecuencia cardíaca, frecuencia respiratoria, SpO₂, Glasgow y dolor de 1 a 10 | A | RF-01 |
| CAR-02 | Cálculo automático del triaje I a V según la Res. 5596 | A | RF-02 |
| CAR-03 | Alerta de reanimación, sonora y visual, para triaje I y II | A | RF-03 |
| CAR-04 | Censo de camas por servicio: Urgencias Adultos (15), Urgencias Pediátricas (8), Observación (12) y Aislamiento (3) | B | RF-04 |
| CAR-05 | Ciclo de estados de la cama: Disponible, Ocupada, En Limpieza/Desinfección y de nuevo Disponible | B | RF-05 |
| CAR-06 | Asignación directa a una cama disponible, con un toque, para pacientes de triaje I y II | A y B | RF-06 |
| CAR-07 | Control de acceso por roles: enfermero triador, médico de urgencias, camillero o servicios generales y auditor médico | Transversal | RF-07 |
| CAR-08 | Trabajo sin conexión con almacenamiento local seguro y sincronización al reconectar | Transversal | Confiabilidad |
| CAR-09 | Cifrado AES-256 en reposo de los datos sensibles (nombre, cédula y diagnóstico) | Transversal | Restricciones legales |
| CAR-10 | Auditoría con registros inmutables: fecha y hora, usuario, IP, acción previa y posterior | Transversal | Restricciones legales |

## 6. Límites de la solución

### 6.1 Lo que sí incluye el MVP

- Módulo A completo: triaje digital con clasificación I a V y alerta médica inmediata.
- Módulo B completo: censo de camas con sus tres estados y asignación directa desde el triaje I y II.
- Roles de acceso, cifrado en reposo y auditoría inmutable.
- Versión web responsive y app móvil con Capacitor, con modo sin conexión.
- Pipeline CI/CD, pruebas automáticas, análisis SAST/SCA y DAST, y despliegue a Staging y Producción.

### 6.2 Lo que no incluye

- Historia clínica electrónica completa, órdenes médicas, facturación o inventarios.
- Servicios distintos a los cuatro del censo (Urgencias Adultos, Urgencias Pediátricas, Observación y Aislamiento).
- Asignación automática de camas con reglas o inteligencia artificial. En el MVP la asignación es manual, con un toque.
- Integración con sistemas externos como EPS, ambulancias o estándares de interoperabilidad (HL7/FHIR).
- Reportes analíticos avanzados. El auditor solo tiene acceso de lectura a reportes básicos.
- Migración del histórico del aplicativo de escritorio.

## 7. Objetivos y criterios de éxito

| Objetivo | Cómo lo medimos |
| --- | --- |
| Registrar el triaje más rápido | Formulario completo en menos de 90 segundos en tablet |
| Clasificar sin demoras | Respuesta de la API de cálculo de triaje en menos de 300 ms |
| Acabar con el desfase del censo de camas | Cambio de estado visible en todos los clientes en menos de 1 s (hoy puede tardar hasta 3 horas) |
| Estar disponibles siempre | Servicio 24/7 con al menos 99,5 % de disponibilidad |
| Proteger los datos del paciente | 100 % de los datos sensibles cifrados con AES-256 en reposo |
| Tener trazabilidad completa | 100 % de los cambios de triaje o cama con registro inmutable |
| Entregar a tiempo | MVP en Producción al día 10, en el hito PR |

## 8. Restricciones

- Tiempo: dos semanas exactas, 10 días hábiles.
- Normativa: Resolución 5596 de 2015, Ley Estatutaria 1581 de 2012 y Resolución 3100 de 2019.
- Tecnología: aplicación híbrida (Ionic con Angular o React y Capacitor), backend en NestJS o Go con arquitectura hexagonal en Docker, y PostgreSQL.
- Metodología: gobernanza por fases e hitos de RUP/UP, ejecución con Scrum y trabajo dentro de GitLab o GitHub.
- Usabilidad: botones táctiles de mínimo 48 × 48 px por el uso de guantes quirúrgicos.

## 9. Atributos de calidad (FURPS+)

| Atributo | Meta |
| --- | --- |
| Funcionalidad | Siete requisitos funcionales (RF-01 a RF-07), triaje conforme a la Res. 5596 y acceso por roles |
| Usabilidad | Formulario en menos de 90 s e interfaz pensada para usar con guantes |
| Confiabilidad | Disponibilidad de al menos 99,5 % y funcionamiento sin conexión con sincronización posterior |
| Rendimiento | Triaje en menos de 300 ms y propagación de camas en menos de 1 s |
| Soporte y restricciones | Cifrado AES-256, registros inmutables, contenedores Docker y firma de contenedores |

## 10. Prioridades

| Prioridad | Características |
| --- | --- |
| Crítica, imprescindible para el MVP | CAR-01, CAR-02, CAR-03, CAR-04, CAR-05, CAR-06 y CAR-07 |
| Alta, por requisito legal | CAR-09 y CAR-10 |
| Media | CAR-08 (modo sin conexión), que se ajusta durante la construcción si el tiempo aprieta |

## 11. Riesgos iniciales

| ID | Riesgo | Probabilidad | Impacto | Qué haremos |
| --- | --- | --- | --- | --- |
| R-01 | Dos semanas no alcanzan para todo el alcance | Alta | Alto | Limitar el alcance a dos módulos, priorizar el backlog y usar un DoD claro en cada sprint |
| R-02 | El algoritmo de triaje clasifica mal a un paciente | Media | Muy alto | Pruebas unitarias sobre cada umbral y validación UAT con personal médico |
| R-03 | No cumplir Habeas Data o la Res. 3100 | Media | Alto | Cifrado AES-256, roles, auditoría inmutable y revisión normativa desde el inicio |
| R-04 | Se pierde la conexión en las salas | Alta | Medio | Guardar los datos en el dispositivo y sincronizar al reconectar |
| R-05 | El estado de las camas tarda en actualizarse | Media | Alto | Comunicación en tiempo real (por ejemplo WebSockets) y pruebas de carga |
| R-06 | El personal asistencial no adopta la herramienta | Media | Medio | Interfaz sencilla, botones grandes y una capacitación corta durante la UAT |
| R-07 | Vulnerabilidades de seguridad al desplegar | Media | Alto | SAST/SCA y DAST dentro del pipeline, y firma de contenedores |

## 12. Hitos RUP

| Fase | Duración | Hito | Qué se entrega |
| --- | --- | --- | --- |
| Iniciación | Días 1 y 2 | LCO | Documento de visión, épicas, backlog en el ALM, arquitectura de referencia, criterios de aceptación y DoD |
| Elaboración | Días 3 y 4 | LCA | Línea base arquitectónica ejecutable, pipeline CI/CD y autenticación con roles funcionando |
| Construcción | Días 5 al 8 | IOC | Módulos de triaje y camas, pruebas unitarias y análisis SAST/SCA |
| Transición | Días 9 y 10 | PR | Pruebas de carga, DAST, UAT médica, firma de contenedores y despliegue |
