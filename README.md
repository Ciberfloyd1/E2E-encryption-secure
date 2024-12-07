# E2E-encryption-secure

1. **Encriptación híbrida**: Utilizamos una combinación de encriptación asimétrica (RSA) y simétrica (AES). AES es más rápido para encriptar grandes cantidades de datos, mientras que RSA es ideal para intercambiar claves de forma segura.
2. **Verificación de integridad**: Al usar AES en modo CBC con un IV (Vector de Inicialización) aleatorio, nos aseguramos de que el mismo mensaje no produzca siempre el mismo texto cifrado, lo que dificulta los ataques.
3. **Autenticación de usuarios**: Implementamos firmas digitales. El remitente (Usuario A) firma el mensaje encriptado con su clave privada, y el receptor (Usuario B) verifica la firma con la clave pública del remitente.
4. **Protección contra ataques de repetición**: El uso de un IV aleatorio para cada mensaje evita que un atacante pueda reutilizar mensajes encriptados anteriores.
5. **Separación de claves**: Utilizamos diferentes claves para diferentes propósitos (encriptación y firma), lo que es una buena práctica de seguridad.
6. **Verificación antes de desencriptar**: El receptor verifica la firma antes de intentar desencriptar el mensaje, lo que previene ataques que podrían explotar vulnerabilidades en el proceso de desencriptación.


Pasos del proceso mejorado:

1. El Usuario A genera una clave AES única para el mensaje.
2. El mensaje se encripta con esta clave AES.
3. La clave AES se encripta con la clave pública del Usuario B.
4. El Usuario A firma el mensaje encriptado.
5. Se envían: el mensaje encriptado, la clave AES encriptada y la firma.
6. El Usuario B verifica la firma para autenticar el remitente y asegurar la integridad del mensaje.
7. Si la firma es válida, el Usuario B desencripta la clave AES con su clave privada.
8. Finalmente, el Usuario B usa la clave AES para desencriptar el mensaje original.


Este enfoque proporciona confidencialidad (nadie más puede leer el mensaje), integridad (el mensaje no ha sido alterado), autenticación (el mensaje proviene realmente del remitente esperado) y no repudio (el remitente no puede negar haber enviado el mensaje).

Para ejecutar este código, necesitarás tener Node.js instalado en tu computadora. Aquí te explico los pasos para ejecutar el código de encriptación de extremo a extremo:

1. **Instalar Node.js**:
Si aún no tienes Node.js instalado, descárgalo e instálalo desde [nodejs.org](https://nodejs.org/).
2. **Crear un nuevo archivo**:
Crea un nuevo archivo llamado `e2e-encryption-secure.js` y copia todo el código proporcionado.
3. **Abrir la terminal**:
Abre la terminal o línea de comandos en tu computadora.
4. **Navegar al directorio**:
Usa el comando `cd` para navegar al directorio donde guardaste el archivo. Por ejemplo:

```plaintext
cd ruta/al/directorio
```


5. **Ejecutar el script**:
Una vez en el directorio correcto, ejecuta el script con Node.js usando el siguiente comando:

```plaintext
node e2e-encryption-secure.js
```
