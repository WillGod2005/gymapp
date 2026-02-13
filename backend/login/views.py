from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login

from .forms import RegisterForm

from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


#"""Simple Registration view using slight sutom template expanding off a django base model.
# Look at forms.py for the fields included in this registration form.
# is_valid() will test the form so it has no tests in tests.py """
User = get_user_model()

@api_view(["POST"])
@permission_classes([AllowAny])
def Register(request):
    email = request.data.get("email")
    password = request.data.get("password")
    username = request.data.get("username") or email

    if not email or not password:
        return Response({"detail": "email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email__iexact=email).exists():
        return Response({"email": ["Email already in use"]}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)

    return Response({"id": user.id, "email": user.email, "username": user.username}, status=status.HTTP_201_CREATED)



#"""Simple login view."""

@api_view(["POST"])
@permission_classes([AllowAny])
def Login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"detail": "username and password required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(request, username=username, password=password)

    if user is None:
        return Response(
            {"detail": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    login(request, user)

    return Response(
        {
            "id": user.id,
            "username": user.get_username(),
        },
        status=status.HTTP_200_OK,
    )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": getattr(user, "email", ""),
    }, status=status.HTTP_200_OK)
