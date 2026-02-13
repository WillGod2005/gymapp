from django.test import TestCase
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class LoginTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="TestCase",
            password="Password"
        )

    def test_right_password(self):
        authenticated_user = authenticate(
            username="TestCase",
            password="Password"
        )

        self.assertIsNotNone(authenticated_user)
        self.assertEqual(authenticated_user.username, "TestCase")

    def test_wrong_password(self):
        authenticated_user = authenticate(
            username="TestCase",
            password="Passwooord"
        )

        self.assertIsNone(authenticated_user)

    def test_no_username(self):
        authenticated_user = authenticate(
            username="",
            password="Passwooord"
        )

        self.assertIsNone(authenticated_user)

    def test_no_password(self):
        authenticated_user = authenticate(
            username="TestCase",
            password=""
        )

        self.assertIsNone(authenticated_user)
    
    def test_nothing(self):
        authenticated_user = authenticate(
            username="",
            password=""
        )

        self.assertIsNone(authenticated_user)
    
