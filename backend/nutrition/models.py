from django.db import models
from django.conf import settings


class FoodGeneric(models.Model):
    fdc_id = models.BigIntegerField(primary_key=True)
    description = models.TextField()
    food_category = models.TextField(null=True)
    kcal = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    protein_g = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    carbs_g = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    fat_g = models.DecimalField(max_digits=8, decimal_places=2, null=True)

    class Meta:
        managed = False
        db_table = "food_generic"

class FoodLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    food = models.ForeignKey(
        FoodGeneric,
        to_field="fdc_id",
        on_delete=models.PROTECT
    )
    meal = models.TextField()
    quantity_g = models.DecimalField(max_digits=6, decimal_places=1)
    eaten_at = models.DateField()