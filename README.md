# Galaxia de Flores Amarillas 🌻✨

## Corrección importante
Esta versión corrige el problema del botón inicial. Al pulsar:

**Abrir mi galaxia 🌻✨**

la portada desaparece, aparece la galaxia y se intenta iniciar
"Flores Amarillas" desde YouTube.

## Ejecutar en Mac

Abre la terminal dentro de esta carpeta y ejecuta:

```bash
python3 -m pip install -r requirements.txt
python3 app.py
```

Luego abre:

```text
http://127.0.0.1:5000
```

## Verlo desde otro dispositivo en la misma Wi-Fi

El servidor está configurado con `0.0.0.0`.

En la Mac, ejecuta:

```bash
ipconfig getifaddr en0
```

Si devuelve por ejemplo `192.168.1.25`, desde otro celular conectado
a la MISMA Wi-Fi se puede probar:

```text
http://192.168.1.25:5000
```

La terminal de la Mac debe seguir abierta.

## Compartirlo con cualquier persona por Internet

Para que funcione desde cualquier lugar necesitas publicarlo en un hosting.
Esta carpeta ya incluye:

- `requirements.txt`
- `Procfile`
- `render.yaml`
- `gunicorn`

por lo que está preparada para desplegarse como una aplicación Flask.

Al publicarla, el hosting te dará una URL HTTPS pública.
