from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import FoodGeneric
from django.http import JsonResponse


#@api_view(["POST"])
#def AddFood(request):

@api_view(["GET"])
@permission_classes([AllowAny])
def SearchFood(request):
    query = request.GET.get("q")
    if not query:
        return Response([])

    food_list = FoodGeneric.objects.filter(description__icontains=query).values("fcd_id", "description", "kcal", "protein_g", "carbs_g", "fat_g").order_by("description")[:10]

    return Response(list(food_list))



