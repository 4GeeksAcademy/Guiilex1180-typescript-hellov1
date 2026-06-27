Cinema Seat Manager en TypeScript
Construye un programa en TypeScript que gestione las reservas de asientos de un cine usando arreglos y funciones.
Funcionalidad principal
☐ Crea una función que inicialice una matriz de asientos (un arreglo bidimensional) que represente 8 filas y 10 columnas.
☐ Representa los asientos ocupados con 1 y los disponibles con 0.
☐ Crea una función que muestre el estado actual de la sala imprimiendo la matriz en la consola, usando:
X para los asientos ocupados
L para los asientos libres
Incluye números de fila y columna para que sea fácil identificar cada posición.
☐ Implementa una función para reservar un asiento dado un número de fila y un número de columna (márcalo como ocupado cambiando su valor de 0 a 1).
☐ Añade validación: la función debe comprobar si el asiento ya está ocupado antes de reservarlo y devolver un mensaje indicando si la operación tuvo éxito o falló.
☐ Crea una función que cuente y devuelva cuántos asientos están ocupados y cuántos están disponibles en toda la sala.
Funcionalidad avanzada
☐ Implementa una función que busque dos asientos libres contiguos (horizontalmente, en la misma fila) y devuelva sus posiciones.
☐ Si se encuentran varios pares de asientos contiguos, devuelve el primero.
☐ Si no hay asientos contiguos disponibles, la función debe indicarlo claramente.
Pruebas y salida por consola
☐ Prueba tu programa con distintos escenarios:
Sala vacía (todos los asientos disponibles)
Sala parcialmente ocupada
Sala casi llena con solo asientos sueltos disponibles
Sala completamente llena (sin asientos disponibles)
☐ Asegúrate de que tu código muestre mensajes claros para cada operación (reserva confirmada, asiento ya ocupado, asientos contiguos encontrados, etc.).
☐ Agrega comentarios que expliquen qué hace cada función.
🎁 Reto extra (opcional)
Si terminas la funcionalidad principal y quieres ir un paso más allá:
☐ Pídele a tu asistente de IA que genere una interfaz web sencilla para tu gestor de asientos usando HTML y Tailwind, incluyendo tu archivo. Proporciónale tu código TypeScript como contexto y pídele que cree un mapa visual de asientos donde las personas usuarias puedan hacer clic para reservar un lugar en lugar de usar la consola.
⚠️ IMPORTANTE
No uses objetos ni clases en este proyecto. Representa los datos de los asientos usando solo un arreglo bidimensional. Usa formato JSON si necesitas estructurar datos adicionales (como metadatos de las reservas).