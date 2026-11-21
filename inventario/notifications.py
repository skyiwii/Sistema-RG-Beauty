from django.conf import settings
from django.core.mail import send_mail

from .services import LOW_STOCK_THRESHOLD


def enviar_alerta_stock_bajo(*, producto, inventario, stock_anterior, stock_nuevo):
    if stock_anterior <= LOW_STOCK_THRESHOLD or stock_nuevo > LOW_STOCK_THRESHOLD:
        return None

    destinatario = settings.LOW_STOCK_NOTIFICATION_EMAIL
    if not destinatario:
        return None

    mensaje = (
        f"El producto {producto.nombre} (SKU: {producto.sku}) en el inventario "
        f"{inventario.nombre} acaba de entrar en stock bajo.\n\n"
        f"Stock anterior: {stock_anterior} unidades\n"
        f"Stock actual: {stock_nuevo} unidades\n"
        f"Umbral de stock bajo: {LOW_STOCK_THRESHOLD} unidades"
    )
    return send_mail(
        subject="Alerta de stock bajo - RG Beauty",
        message=mensaje,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[destinatario],
        fail_silently=False,
    ) == 1
