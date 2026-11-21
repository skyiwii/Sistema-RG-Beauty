from django.core.management.base import BaseCommand
from django.db import transaction

from inventario.models import CategoriaProducto, Marca, Producto


class Command(BaseCommand):
    help = "Crea categorías, marcas y productos de ejemplo para una demostración."

    @transaction.atomic
    def handle(self, *args, **options):
        created_counts = {
            "categorias": 0,
            "marcas": 0,
            "productos": 0,
        }

        categories = {}
        for name, description in (
            ("Demo - Cuidado facial", "Productos de cuidado facial para demostración."),
            ("Demo - Cuidado capilar", "Productos de cuidado capilar para demostración."),
            ("Demo - Maquillaje", "Productos de maquillaje para demostración."),
        ):
            categories[name], created = CategoriaProducto.objects.get_or_create(
                nombre=name,
                defaults={"descripcion": description, "activo": True},
            )
            created_counts["categorias"] += created

        brands = {}
        for name, description in (
            ("Demo - Botánica", "Marca de ejemplo para productos naturales."),
            ("Demo - Esencia", "Marca de ejemplo para cuidado personal."),
            ("Demo - Color", "Marca de ejemplo para maquillaje."),
        ):
            brands[name], created = Marca.objects.get_or_create(
                nombre=name,
                defaults={"descripcion": description, "activo": True},
            )
            created_counts["marcas"] += created

        products = (
            (
                "DEMO-001",
                "Crema hidratante de aloe vera",
                "Demo - Cuidado facial",
                "Demo - Botánica",
                "Crema hidratante para uso diario.",
            ),
            (
                "DEMO-002",
                "Shampoo nutritivo",
                "Demo - Cuidado capilar",
                "Demo - Esencia",
                "Shampoo para cabello seco o dañado.",
            ),
            (
                "DEMO-003",
                "Labial rosa mate",
                "Demo - Maquillaje",
                "Demo - Color",
                "Labial de acabado mate para demostración.",
            ),
        )
        for sku, name, category_name, brand_name, description in products:
            _, created = Producto.objects.get_or_create(
                sku=sku,
                defaults={
                    "nombre": name,
                    "categoria": categories[category_name],
                    "marca": brands[brand_name],
                    "descripcion": description,
                    "activo": True,
                },
            )
            created_counts["productos"] += created

        self.stdout.write(
            self.style.SUCCESS(
                "Datos de ejemplo listos. Creados: "
                f"{created_counts['categorias']} categorías, "
                f"{created_counts['marcas']} marcas y "
                f"{created_counts['productos']} productos."
            )
        )
