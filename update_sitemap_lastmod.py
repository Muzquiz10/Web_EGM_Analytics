# %%
import os
import datetime
import xml.etree.ElementTree as ET

SITEMAP_PATH = "sitemap.xml"
BASE_DIR = "."  # raíz del proyecto local
DOMAIN = "https://egmanalytics.com/"

def file_lastmod(path):
    if not os.path.exists(path):
        return None
    ts = os.path.getmtime(path)
    return datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%d")

def main():
    tree = ET.parse(SITEMAP_PATH)
    root = tree.getroot()

    updated = 0

    for url in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url"):
        loc = url.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc").text

        # Convertir URL → ruta local
        if loc.endswith("/"):
            filename = "index.html"
        else:
            filename = loc.replace(DOMAIN, "")

        local_path = os.path.join(BASE_DIR, filename)

        lastmod_tag = url.find("{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod")

        new_date = file_lastmod(local_path)
        print(f"Fecha actualizada para {loc}: {new_date}")

        if new_date:
            lastmod_tag.text = new_date
            updated += 1
        else:
            print(f"[Aviso] No se encontró archivo local para: {loc}")

    tree.write(SITEMAP_PATH, encoding="utf-8", xml_declaration=True)
    print(f"✔ Lastmod actualizado en {updated} URLs.")

if __name__ == "__main__":
    main()