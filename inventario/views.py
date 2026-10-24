from django.shortcuts import render
from django.contrib.auth.decorators import login_required


# Vistas para inventario

@login_required
def dashboard(request):
    return render(request, "dashboard/index.html")


@login_required
def productos_lista(request):
    return render(request, "inventario/productos_lista.html")


@login_required
def producto_form(request):
    return render(request, "inventario/producto_form.html")


@login_required
def stock_lista(request):
    return render(request, "inventario/stock_lista.html")


@login_required
def movimiento_form(request):
    return render(request, "inventario/movimiento_form.html")


@login_required
def ajustes_stock(request):
    return render(request, "inventario/ajustes_stock.html")


@login_required
def movimientos_historial(request):
    return render(request, "inventario/movimientos_historial.html")
