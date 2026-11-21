from io import BytesIO
from math import ceil, floor

from django.core.files.base import ContentFile
from PIL import Image, ImageOps

CROP_WIDTH = 1200
CROP_HEIGHT = 900
SUPPORTED_IMAGE_FORMATS = {"JPEG", "PNG", "WEBP"}


def ajustar_imagen_producto(
    imagen,
    *,
    zoom: int,
    posicion_x: int,
    posicion_y: int,
) -> ContentFile:
    if not 50 <= zoom <= 300:
        raise ValueError("El zoom debe estar entre 50 y 300.")
    if not 0 <= posicion_x <= 100 or not 0 <= posicion_y <= 100:
        raise ValueError("La posición debe estar entre 0 y 100.")

    imagen.seek(0)
    try:
        with Image.open(imagen) as original:
            image_format = original.format
            if image_format not in SUPPORTED_IMAGE_FORMATS:
                raise ValueError("El formato de imagen no es compatible.")
            source = ImageOps.exif_transpose(original).copy()
    finally:
        imagen.seek(0)

    has_alpha = "A" in source.getbands() or "transparency" in source.info
    if has_alpha and image_format != "JPEG":
        source = source.convert("RGBA")
        background_color = (0, 0, 0, 0)
    else:
        source = source.convert("RGB")
        background_color = (255, 255, 255)

    scale = max(
        CROP_WIDTH / source.width,
        CROP_HEIGHT / source.height,
    ) * (zoom / 100)
    drawn_width = source.width * scale
    drawn_height = source.height * scale
    offset_x = (CROP_WIDTH - drawn_width) * (posicion_x / 100)
    offset_y = (CROP_HEIGHT - drawn_height) * (posicion_y / 100)

    visible_left = max(0, -offset_x / scale)
    visible_top = max(0, -offset_y / scale)
    visible_right = min(source.width, (CROP_WIDTH - offset_x) / scale)
    visible_bottom = min(source.height, (CROP_HEIGHT - offset_y) / scale)

    output = Image.new(
        source.mode,
        (CROP_WIDTH, CROP_HEIGHT),
        background_color,
    )
    if visible_right > visible_left and visible_bottom > visible_top:
        crop = source.crop((
            floor(visible_left),
            floor(visible_top),
            ceil(visible_right),
            ceil(visible_bottom),
        ))
        destination_left = max(0, round(visible_left * scale + offset_x))
        destination_top = max(0, round(visible_top * scale + offset_y))
        destination_right = min(
            CROP_WIDTH,
            round(visible_right * scale + offset_x),
        )
        destination_bottom = min(
            CROP_HEIGHT,
            round(visible_bottom * scale + offset_y),
        )
        crop = crop.resize(
            (
                max(1, destination_right - destination_left),
                max(1, destination_bottom - destination_top),
            ),
            Image.Resampling.LANCZOS,
        )
        if source.mode == "RGBA":
            output.alpha_composite(crop, dest=(destination_left, destination_top))
        else:
            output.paste(crop, (destination_left, destination_top))

    image_buffer = BytesIO()
    save_options = {}
    if image_format in {"JPEG", "WEBP"}:
        save_options["quality"] = 90
    if image_format == "PNG":
        save_options["optimize"] = True
    output.save(image_buffer, format=image_format, **save_options)
    return ContentFile(image_buffer.getvalue(), name=imagen.name)
