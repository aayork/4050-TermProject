from django.urls import path
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.registration.views import (
    ResendEmailVerificationView,
    VerifyEmailView,    
)
from dj_rest_auth.views import (
    PasswordResetConfirmView,
    PasswordResetView,
)
from .views import (email_confirm_redirect, password_reset_confirm_redirect,
                    CustomRegisterView, CustomUserDetailsView, GetAllUsers,
                    UserUpdateView, UserDeleteView, validateAdmin, suspendAccount,
                    unSuspendAccount)


urlpatterns = [
    path("register/", CustomRegisterView.as_view(), name="custom_register"),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("user/", CustomUserDetailsView.as_view(), name="rest_user_details"),
    path('getAllUsers/', GetAllUsers.as_view(), name="user-details"),
    path('updateUser/<int:id>/', UserUpdateView.as_view(), name="user-update"),
    path('deleteUser/<int:id>/', UserDeleteView.as_view(), name="user-delete"),


    path("register/verify-email/", VerifyEmailView.as_view(), name="rest_verify_email"),
    path("register/resend-email/", ResendEmailVerificationView.as_view(), name="rest_resend_email"),
    path("account-confirm-email/<str:key>/", email_confirm_redirect, name="account_confirm_email"),
    path("account-confirm-email/", VerifyEmailView.as_view(), name="account_email_verification_sent"),
    path("password/reset/", PasswordResetView.as_view(), name="rest_password_reset"),
    path("password/reset/confirm/<str:uidb64>/<str:token>/",
         password_reset_confirm_redirect, name="password_reset_confirm"),
    path("password/reset/confirm/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path('user/validateAdmin/<str:auth_token>/', validateAdmin.as_view(), name='validate-admin'),
    path('user/suspend/<int:id>/', suspendAccount.as_view(), name='suspendAccount'),
    path('user/unSuspend/<int:id>/', unSuspendAccount.as_view(), name='unSuspendAccount')
]